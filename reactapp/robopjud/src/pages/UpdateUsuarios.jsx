import React, { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import AppbarMenu from "../components/AppbarMenu";
import Context from "../context/Context";
import { useParams } from "react-router-dom";
import { CodeSharp } from "@material-ui/icons";

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

function UpdateUsuario() {
  const MySwal = withReactContent(Swal);
  const classes = useStyles();
  const { id } = useParams();
  const [errMssg, setErrMssg] = useState("");
  const [tribunales, setTribunales] = useState([]);
  const { handleSubmit, control } = useForm();
  const [context, setContext] = useContext(Context);
  const token = window.localStorage.getItem("robo-jwt-token");
  const name = window.localStorage.getItem("robo-jwt-name");
  const role = window.localStorage.getItem("robo-jwt-role");
  const idT = window.localStorage.getItem("robo-jwt-idT");

  const [nombreUsuario, setNombreUsuario] = useState("");
  const [apellidoUsuario, setApellidoUsuario] = useState("");
  const [rutUsuario, setRutUsuario] = useState("");
  const [correoUsuario, setCorreoUsuario] = useState("");
  const [tribunalUsuario, setTribunalUsuario] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  const seteaNombre = (e) => {
    setNombreUsuario(e);
  };
  const seteaApellido = (e) => {
    setApellidoUsuario(e);
  };
  const seteaRut = (e) => {
    setRutUsuario(e);
  };
  const seteaCorreo = (e) => {
    setCorreoUsuario(e);
  };
  const seteaTribunal = (e) => {
    setTribunalUsuario(e);
  };
  const seteaTipo = (e) => {
    setTipoUsuario(e);
  };

  const getData = () => {
    setContext({
      name: name,
      token: token,
      role: role,
    });
  };

  const onSubmit = async (data) => {
    const f = new FormData();
    f.append('id',id)
    f.append("nombre", nombreUsuario);
    f.append("apellido", apellidoUsuario);
    f.append("rut", rutUsuario);
    f.append("correo", correoUsuario);
    if (context.role === "sudo") {
      f.append("tribunal", tribunalUsuario);
    }
    if (context.role === "admin") {
      f.append("tribunal", idT);
    }
    f.append("tipo_usuario", tipoUsuario);
    await axios.post(`http://10.13.18.84:5000/updateUser/`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        seteaError("");
        MySwal.fire({
          icon: "success",
          title: "Completado",
          text: "Usuario actualizado con éxito!",
        });
      })
      .catch((error) => {
        seteaError(error.response.data.message);
      });
  };

  const seteaError = (err) => {
    setErrMssg(err);
  };

  const getUserId = () => {
    axios
      .get(`http://10.13.18.84:5000/getUserbyId/` + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        setNombreUsuario(res.data.message[0].nombre);
        setApellidoUsuario(res.data.message[0].apellido);
        setRutUsuario(res.data.message[0].rut);
        setCorreoUsuario(res.data.message[0].correo);
        setTribunalUsuario(res.data.message[0].id_tribunal);
        setTipoUsuario(res.data.message[0].role);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getTribunal = async () => {
    await axios
      .get(`http://10.13.18.84:5000/getTribunal`, {
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
  };

  useEffect(() => {
    getTribunal();
    getUserId();
  }, []);

  useEffect(() => {
    getData();
  }, []);

  return (
    <React.Fragment>
      <AppbarMenu />
      <Container maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registro
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
              label="Ingresa Nombre usuario"
              autoComplete="Nombre de usuario"
              value={nombreUsuario}
              onChange={(e) => seteaNombre(e.target.value)}
              autoFocus
            />

            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="apellido"
              label="Ingresa Apellido usuario"
              autoComplete="Apellido de usuario"
              value={apellidoUsuario}
              onChange={(e) => seteaApellido(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="rut"
              label="Ingresa Rut usuario"
              autoComplete="Rut de usuario"
              value={rutUsuario}
              onChange={(e) => seteaRut(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="correo"
              label="Ingresa Correo usuario"
              autoComplete="Correo de usuario"
              value={correoUsuario}
              onChange={(e) => seteaCorreo(e.target.value)}
            />

            {context.role === "sudo" && (
              <FormControl
                variant="outlined"
                className={classes.formControl}
                fullWidth
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Seleccione Tribunal
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  label="Age"
                  margin="dense"
                  name="tribunal"
                  value={tribunalUsuario}
                  onChange={(e) => seteaTribunal(e.target.value)}
                >
                  {tribunales.map((tribunal) => (
                    <MenuItem value={tribunal.id_tribunal}>
                      {tribunal.nombre}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Tipo de usuario
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
                margin="dense"
                name="tipo_usuario"
                value={tipoUsuario}
                onChange={(e) => seteaTipo(e.target.value)}
              >
                {context.role === "sudo" && (
                  <MenuItem value="sudo">sudo</MenuItem>
                )}
                <MenuItem value="admin">admin</MenuItem>
                <MenuItem value="user">user</MenuItem>
              </Select>
            </FormControl>
            <div>
              <Button type="submit" variant="contained" color="primary">
                Actualizar
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default UpdateUsuario;
