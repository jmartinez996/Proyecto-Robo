import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { Box, Container, Grid } from "@material-ui/core";
import Tablausuarios from "../components/Configuracion/TablaUsuarios";
import Tablaareas from "../components/Configuracion/TablaAreas";
import Tablatribunales from "../components/Configuracion/TablaTribunales";
import TablaRobot from "../components/Configuracion/TablaRobot";
import Context from "../context/Context";
import AppbarMenu from "../components/AppbarMenu";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

export const name = {
  name: "asd",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "100%",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Configuracion(props) {
  const classes = useStyles();
  const [context, setContext] = useContext(Context);
  const token = window.localStorage.getItem("robo-jwt-token");
  const name = window.localStorage.getItem("robo-jwt-name");
  const role = window.localStorage.getItem("robo-jwt-role");
  const id_tribunal = window.localStorage.getItem("robo-jwt-idT");
  const [tribunales, setTribunales] = useState([]);
  const [tribunal, setTribunal] = useState(null);
  const [usuarios, setUsuarios] = useState([{}]);
  const [robots, setRobots] = useState([{}]);

  const getData = () => {
    setContext({
      name: name,
      token: token,
      role: role,
    });
  };

  const getTribunales = () => {
    if (context.role === "sudo") {
      axios
        .get(`http://127.0.0.1:5000/getTribunal`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          setTribunales(res.data.message);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
	if (context.role === "admin") {
		seteaUsuarios(id_tribunal);
		seteaRobots(id_tribunal);
	  }
  };

  useEffect(() => {
    getTribunales();
    getData();
  }, []);

  const cargaTribunal = (e) => {
    setTribunal(e);
    seteaUsuarios(e);
    seteaRobots(e);
  };

  const seteaUsuarios = (trib) => {
    if (trib !== null) {
      const users = axios
        .get(`http://127.0.0.1:5000/getUsers/` + trib, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
          //console.log(res.data.message)
          setUsuarios(res.data.message);
        })
        .catch((error) => {
          //console.log(error.message)
        });
    }
  };

  const seteaRobots = (trib) => {
    if (trib !== null) {
      const robots = axios(`http://127.0.0.1:5000/getRobot/` + trib, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
        .then((res) => {
          //   console.log(res.data.message);
          setRobots(res.data.message);
          //   console.log(state);
        })
        .catch((error) => {
          //console.log(error.message)
        });
    }
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
            {context.role === "sudo" && (
              <Grid item lg={8} sm={8} xl={8} xs={12}>
                <Tablatribunales />
              </Grid>
            )}
            {context.role === "sudo" && (
              <Grid item lg={4} sm={4} xl={4} xs={12}>
                <Tablaareas />
              </Grid>
            )}
            {context.role === "sudo" && (
              <Grid item lg={12} sm={12} xl={12} xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Seleccione Tribunal
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    label="Age"
                    onChange={(e) => cargaTribunal(e.target.value)}
                  >
                    {tribunales.map((trib) => (
                      <MenuItem value={trib.id_tribunal}>
                        {trib.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            )}

            <Grid item lg={5} sm={12} xl={5} xs={12}>
              <Tablausuarios usuarios={usuarios} idT={tribunal} />
            </Grid>
            <Grid item lg={7} sm={12} xl={7} xs={12}>
              <TablaRobot robots={robots} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

export default Configuracion;
