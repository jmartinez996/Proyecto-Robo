import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import GavelIcon from "@material-ui/icons/Gavel";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { useParams } from "react-router";
import AppbarMenu from "../components/AppbarMenu";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    marginTop: theme.spacing(1),
  },
  formControl: {
    paddingTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    "&$checked": {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

function UpdateTribunal() {
  const token = window.localStorage.getItem("robo-jwt-token");
  const { id } = useParams();
  const MySwal = withReactContent(Swal);
  const classes = useStyles();
  const [errMssg, setErrMssg] = useState("");
  const { handleSubmit, control, getValues, errors } = useForm({});
  const [areas, setAreas] = useState([]);
  const [tribunal, setTribu] = useState({});
  const [sArea, setSArea] = useState([]);
  const [nombreTribunal, setNombreTribunal] = useState("");
  const [fonoTribunal, setFonoTribunal] = useState("");
  const [ciudadTribunal, setCiudadTribunal] = useState("");
  const [ipTribunal, setIpTribunal] = useState("");
  const [codigoTribunal, setCodigoTribunal] = useState("");
  const [areasTribunal, setAreasTribunal] = useState([]);
  const [checkeados, setCheckeados] = useState([{}]);
  const [userSitci, setUserSitci] = useState([{}]);
  const [passSitci, setPassSitci] = useState([{}]);
  const [bandera, setBandera] = useState(true);

  const getAreas = () => {
    const areas = axios(`http://10.13.18.84:5000/getAreas`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        setAreas(res.data.message);
        getTribunal(res.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getTribunal = (areas) => {
    const f = new FormData();
    f.append("id", id);
    const req = axios.post(`http://10.13.18.84:5000/getTribunalId`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        const arr = [];
        setTribu(res.data.message);
        seteaNombre(res.data.message.nombre);
        seteaFono(res.data.message.fono);
        seteaCiudad(res.data.message.ciudad);
        seteaIp(res.data.message.ip);
        seteaCodigo(res.data.message.codigo_tribunal);
        seteaAreasTribunal(res.data.message.nombre_area);
        seteaUserSitci(res.data.message.user_sitci);
        seteaPassSitci(res.data.message.pass_sitci);
        for (var i = 0; i < areas.length; i++) {
          if (res.data.message.nombre_area.includes(areas[i].nombre_area)) {
            arr.push({
              nombre_area: areas[i].nombre_area,
              id_area: areas[i].id_area,
              checked: true,
            });
          } else {
            arr.push({
              nombre_area: areas[i].nombre_area,
              id_area: areas[i].id_area,
              checked: false,
            });
          }
        }
        setearCheckeados(arr);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const seteaUserSitci = (e) => {
    setUserSitci(e);
  };

  const seteaPassSitci = (e) => {
    setPassSitci(e);
  };

  const seteaAreasTribunal = (e) => {
    setAreasTribunal(e);
  };

  const seteaNombre = (e) => {
    setNombreTribunal(e);
  };
  const seteaFono = (e) => {
    setFonoTribunal(e);
  };
  const seteaCiudad = (e) => {
    setCiudadTribunal(e);
  };
  const seteaIp = (e) => {
    setIpTribunal(e);
  };
  const seteaCodigo = (e) => {
    setCodigoTribunal(e);
  };

  useEffect(() => {
    getAreas();
  }, []);

  const [state, setState] = React.useState({
    checkedA: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const onSubmit = async (data) => {
    const token = window.localStorage.getItem("robo-jwt-token");
    var Narea = [];
    var Idarea = [];
    checkeados.map(function (row) {
      if (row.checked === true) {
        Narea.push(row.nombre_area);
        Idarea.push(row.id_area);
      }
    });
    const f = new FormData();
    f.append("id_tribunal", id)
    f.append("nombre", nombreTribunal);
    f.append("telefono", fonoTribunal);
    f.append("ciudad", ciudadTribunal);
    f.append("ip", ipTribunal);
    f.append("codigo", codigoTribunal);
    f.append("nombre_area", Narea);
    f.append("id_area", Idarea);
    f.append("user_sitci", userSitci);
    f.append("pass_sitci", passSitci);
    MySwal.fire({
      title: "Agregar",
      text: "¿Desea actualizar el tribunal " + data.nombre + "?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(`http://10.13.18.84:5000/updateTribunal/`, f, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
          });
          MySwal.fire("Actualizado", "El registro se ha actualizado con éxito", "success");
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire("Cancelado", "El registro no se ha actualizado", "error");
        }
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: "Error...",
          text: "No se pudo actualizar.",
        });
      });
  };

  const handleChecked = (e, nombre_area) => {
    const aux = [];
    checkeados.map(function (row) {
      if (row.nombre_area == nombre_area) {
        row.checked = e;
        aux.push(row);
      } else {
        aux.push(row);
      }
    });
    console.log(aux);
    setearCheckeados(aux);

  };
  const setearCheckeados = (e) => {
    setCheckeados(e);
  };

  return (
    <React.Fragment>
      <AppbarMenu />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <GavelIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Modificar Tribunal
          </Typography>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmit)}
            encType="application/json"
          >
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="nombre"
              label=""
              autoComplete="Nombre de Tribunal"
              value={nombreTribunal}
              autoFocus
              onChange={(e) => seteaNombre(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="fono"
              label=""
              autoComplete="Nombre de Tribunal"
              value={fonoTribunal}
              autoFocus
              onChange={(e) => seteaFono(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="nombre"
              label=""
              autoComplete="Nombre de Tribunal"
              value={ciudadTribunal}
              autoFocus
              onChange={(e) => seteaCiudad(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="nombre"
              label=""
              autoComplete="Nombre de Tribunal"
              value={ipTribunal}
              autoFocus
              onChange={(e) => seteaIp(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="nombre"
              label=""
              autoComplete="Nombre de Tribunal"
              value={codigoTribunal}
              autoFocus
              onChange={(e) => seteaCodigo(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="nombre"
              label=""
              autoComplete="Nombre de Tribunal"
              value={userSitci}
              autoFocus
              onChange={(e) => seteaUserSitci(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="nombre"
              label=""
              autoComplete="Nombre de Tribunal"
              value={passSitci}
              autoFocus
              onChange={(e) => seteaPassSitci(e.target.value)}
            />

            {checkeados.map((area) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={area.checked}
                    onChange={(e) =>
                      handleChecked(e.target.checked, area.nombre_area)
                    }
                  />
                }
                key={area.id_area}
                label={area.nombre_area}
              />
            ))}

            <Typography variant="inherit" color="error">
              {errMssg}
            </Typography>
            <div style={{ marginTop: "20px" }}>
              <Grid
                container
                spacing={1}
                direction="row"
                justify="center"
                alignItems="center"
                alignContent="center"
                wrap="nowrap"
              >
                <Button type="submit" variant="contained" color="primary">
                  Actualizar
                </Button>
              </Grid>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default UpdateTribunal;
