import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Link from "@material-ui/core/Link";
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
import { useParams } from "react-router-dom";

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

function UpdateRobot() {
  const token = window.localStorage.getItem("robo-jwt-token");
  const MySwal = withReactContent(Swal);
  const classes = useStyles();
  const [areas, setAreas] = useState([]);
  const { handleSubmit, control } = useForm();

  const {id} = useParams();


  const [descripcionRobot, setDescripcionRobot] = useState("");
  const [nombreRobot, setNombreRobot] = useState("");
  const [areaRobot, setAreaRobot] = useState("");

  const seteaNombre = (e) => {
    setNombreRobot(e);
  }
  const seteaDescripcion = (e) => {
      setDescripcionRobot(e)
  }
  const seteaArea = (e) => {
      setAreaRobot(e)
  }
   

  const onSubmit = async (data) => {
    console.log(data);
    const f = new FormData();
    f.append("id", id);
    f.append("nombre", nombreRobot);
    f.append("descripcion", descripcionRobot);
    f.append("id_area", areaRobot);
    await axios.post(`http://10.13.18.84:5000/updateRobot/`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((response) => {
        MySwal.fire({
          icon: "success",
          title: "Completado",
          text: "Robot actualizado con éxito!",
        });
      })
      
  };

const getAreas = async () => {
    await axios
      .get(`http://10.13.18.84:5000/getAreas`, {
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
}

const getRobotId = async () => {
    axios
    .get(`http://10.13.18.84:5000/getRobotbyId/` + id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
    .then((res) => {
        console.log(res)
        setNombreRobot(res.data.message[0].nombre_robot)
        setDescripcionRobot(res.data.message[0].descripcion_robot)
        setAreaRobot(res.data.message[0].id_area)
    })
    .catch((error) => {
      console.log(error.message);
    });
}


  useEffect(() => {
      getAreas()
      getRobotId()
  }, []);

  return (
    <React.Fragment>
      <AppbarMenu />
      <Container component="main" maxWidth="xs">
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
              label="Ingresa Nombre del Robot"
              autoComplete="Nombre de Robot"
              autoFocus
              value = {nombreRobot}
              onChange = {(e) => seteaNombre(e.target.value)}
            />

            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              id="descripción"
              label="Ingresa Descripción del robot"
              autoComplete="Descripción de Robot"
              value = {descripcionRobot}
              onChange = {(e) => seteaDescripcion(e.target.value)}
            />

            <FormControl
              variant="outlined"
              className={classes.formControl}
              fullWidth
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Seleccione Area
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Age"
                margin="dense"
                name="area"
                value = {areaRobot}
                onChange = {(e) => seteaArea(e)}
              >
                {areas.map((area) => (
                  <MenuItem value={area.id_area}>{area.nombre_area}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <div>
              <Button type="submit" variant="contained" color="primary">
                Actualizar Robot
              </Button>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default UpdateRobot;
