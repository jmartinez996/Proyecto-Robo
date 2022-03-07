import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { usuario } from "./Login";
import AppbarMenu from "../components/AppbarMenu";
import { Button } from "@material-ui/core";
import { Box, Container, Grid, Card, Typography } from "@material-ui/core";
import TablaHistorial from "../components/TablaHistorial";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import RemoveCircleRoundedIcon from "@material-ui/icons/RemoveCircleRounded";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const drawerWidth = 240;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 3,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    minWidth: "100vw",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 1,
  },
  box: {
    height: 100,
    width: "100%",
    display: "flex",
    padding: 8,
  },
  centerBox: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  card: {
    width: 230,
    height: 75,
  },
  insideCard: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  iconRight: {
    margin: 8,
    color: "green",
  },
  iconWrong: {
    margin: 8,
    color: "red",
  },
  normalIcon: {
    margin: 8,
    color: "grey",
  },
}));

function getrole() {
  const datauser = usuario;
  return datauser.role;
}
getrole();
const hasrole1 = (user, roles) => {
  if (!user) {
    return false;
  } else {
    const valida = user.includes(roles);
    return valida;
  }
};
function Home() {
  let query = useQuery();
  const MySwal = withReactContent(Swal);
  const [nombre, setNombre] = useState(null);
  const [idTribunal, setIdTribunal] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const token = window.localStorage.getItem("robo-jwt-token");
  const [areas, setAreas] = useState([]);
  const [r, setR] = useState(1);
  const [checkTribunal, setCheckTribunal] = useState(null);
  const [nombreTribunal, setNombreTribunal] = useState("");

  const getUserState = () => {
    axios
      .get(`http://10.13.18.84:5005/userState`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNombre(res.data.nombre);
        setIdTribunal(res.data.id_tribunal);
        setIdUser(res.data.id_usuario);
        const f = new FormData();
        f.append("id", res.data.id_tribunal);
        axios.post(`http://10.13.18.84:5005/getTribunalId`, f, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
          })
          .then((res) => {
            console.log("asdasdasdasd");
            setNombreTribunal(res.data.message.nombre);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAreas = async () => {
    await axios(`http://10.13.18.84:5005/getAreas`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        setAreas(res.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getTribunal = async () => {
    const f = new FormData();
    f.append("id", idTribunal);
    const req = axios
    .post(`http://10.13.18.84:5005/getTribunalId`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        console.log(res.data.message.nombre);
        setNombreTribunal(res.data.message.nombre);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const checkeaTribunal = async () => {
    const f = new FormData();
    f.append("idTribunal", idTribunal);
    await axios
      .post(`http://10.13.18.84:5005/checkConnect`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        // console.log(res.data);
        if (res.data === "True") {
          setCheckTribunal(res.data);
          MySwal.fire({
            icon: "success",
            title: "La conexión es exitosa.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        if (res.data === "False") {
          setCheckTribunal(res.data);
          MySwal.fire({
            icon: "error",
            title: "No se pudo establecer conexión.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        setCheckTribunal(false);
        console.log(error.message);
      });
  };

  useEffect(() => {
    getUserState();
    getAreas();
    // getTribunal();
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cerrarSesion = () => {
    window.location.href = "/";
    window.localStorage.removeItem("robo-jwt-token");
  };

  return (
    <>
      <AppbarMenu />
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100%",
          py: 3,
        }}
      >
        <Container maxWidth={false}>
          <Grid container spacing={2}>
            <Box
              component="div"
              m={1}
              className={`${classes.box} ${classes.centerBox}`}
            >
              <Typography variant="h4" color="initial">
                {nombreTribunal}
              </Typography>
              <Card className={`${classes.card}`}>
                <Box className={`${classes.insideCard}`}>
                  {checkTribunal === "True" ? (
                    <CheckCircleRoundedIcon
                      className={`${classes.iconRight}`}
                    />
                  ) : checkTribunal === "False" ? (
                    <CancelRoundedIcon className={`${classes.iconWrong}`} />
                  ) : (
                    <RemoveCircleRoundedIcon
                      className={`${classes.normalIcon}`}
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ height: 40, margin: 8 }}
                    onClick={checkeaTribunal}
                  >
                    Probar Conexión
                  </Button>
                </Box>
              </Card>
            </Box>
            <Grid item lg={12} sm={12} xl={12} xs={12}>
              <TablaHistorial />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Home;
