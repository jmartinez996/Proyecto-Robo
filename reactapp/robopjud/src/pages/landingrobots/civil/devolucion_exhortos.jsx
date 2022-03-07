import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Card,
  CardHeader,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import PlayCircleFilledWhiteIcon from "@material-ui/icons/PlayCircleFilledWhite";
import { useParams } from "react-router";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import AppbarMenu from "../../../components/AppbarMenu";
import CarouselDevolucionExhortos from "../../../components/Instructivos/CarouselDevolucionExhortos"
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

export default function DevolucionExhorto(props) {
  const MySwal = withReactContent(Swal);
  const { idT } = useParams();
  const { idR } = useParams();
  const { ip } = useParams();
  const [jueces, setJueces] = useState([]);
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const [ formState, setFormState ] = useState(false);
  const token = window.localStorage.getItem("robo-jwt-token");
  const [userSitci, setUserSitci] = useState("");
  const [passSitci, setPassSitci] = useState("");
  const [archivo, setArchivo] = useState(null);

  const getJueces = () => {
    const jueces = axios(`http://10.13.18.84:5005/getJueces/` + idT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setJueces(res.data.message);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const subirArchivo = (e) => {
    setArchivo(e);
  };

  function validationFile(archivo) {
    //console.log(archivo)
    if (archivo == null) {
      return "No se ha seleccionado ningun archivo";
    }
    if (archivo !== null) {
      var nombre = archivo.name.split(".");
      console.log(nombre[1]);
      if (nombre[1] !== "xlsb") {
        if (nombre[1] !== "xls") {
          if (nombre[1] !== "xlsx") {
            return "Tipo de archivo no compatible";
          }
        }
      }
    }
  }

  const getUserSitci = () => {
    const exhortos = axios(`http://10.13.18.84:5005/getUserSitci/` + idT, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        console.log(res.data);
        setUserSitci(res.data.user_sitci);
        setPassSitci(res.data.pass_sitci);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getJueces();
    getUserSitci();
  }, []);

  const onSubmit = (data) => {
    const token = window.localStorage.getItem("robo-jwt-token");
    const f = new FormData();
    f.append("user_sitci", userSitci);
    f.append("pass_sitci", passSitci);
    f.append("id_juez", data.juez);
    f.append("id_tribunal", idT);
    f.append("id_robot", idR);
    f.append("ip", ip);
    f.append("correo", data.correo);
    f.append("archivo", archivo);

    Swal.fire({
      title: "Estás seguro que los datos son correctos?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Iniciar Robot",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://10.13.18.84:5005/ejecutaDevolucionExhorto/`, f, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ` + token,
            },
          })
          .then((response) => {
            MySwal.fire({
              icon: "success",
              title: "Completado",
              text: "Robot ejecutado con exito!",
            });
            setFormState(true);
          })
          .catch((error) => {
            // seteaError(error.response.data.message);
          });
      }
    });
  };

  return (
    <React.Fragment>
      <AppbarMenu />
      <div>
        <Grid container justify="center">
          <Typography variant="h2" color="initial">
            Devolución de Exhortos
          </Typography>
        </Grid>

        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Grid container spacing={8} style={{paddingLeft:"50px"}}>
            <Grid item xs={12} lg={4}>
              <CssBaseline />
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <PlayCircleFilledWhiteIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Configurar Robot
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(onSubmit)}
                  encType="multipart/form-data"
                >
                  <Controller
                    name="correo"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        id="nombre"
                        value={value}
                        error={!!error}
                        helperText={error ? error.message : null}
                        label="Correo Electronico"
                        autoComplete="Correo Electronico"
                        onChange={onChange}
                        disabled={formState}
                      />
                    )}
                    rules={{
                      required: "El campo Correo Electronico esta vacío",
                      pattern: /^\S+@\S+$/i,
                      //  validate: (value) => validation(value)
                    }}
                  />
                  <Controller
                    name="user_sitci"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        id="user_sitci"
                        value={userSitci}
                        error={!!error}
                        helperText={error ? error.message : null}
                        label="Usuario de la plataforma civil.pjud"
                        autoComplete="usuario mixtos"
                        onChange={onChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Controller
                    name="pass_sitci"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        id="pass_sitci"
                        value={passSitci}
                        error={!!error}
                        helperText={error ? error.message : null}
                        label="Contraseña plataforma civil.pjud"
                        autoComplete="contrasena"
                        onChange={onChange}
                        disabled={true}
                      />
                    )}
                  />
                  <Controller
                    name="archivo"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <TextField
                        variant="outlined"
                        InputProps={{ readOnly: true }}
                        margin="dense"
                        type="file"
                        fullWidth
                        id="archivo"
                        // value={value}
                        error={!!error}
                        helperText={error ? error.message : null}
                        onChange={(e) => subirArchivo(e.target.files[0])}
                        disabled={formState}
                      />
                    )}
                    rules={{
                      validate: () => validationFile(archivo),
                    }}
                  />
                  <Controller
                    name="juez"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <>
                        <FormControl
                          variant="outlined"
                          className={classes.formControl}
                          fullWidth
                        >
                          <InputLabel id="demo-simple-select-outlined-label">
                            Seleccione Juez para firma
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Age"
                            margin="dense"
                            error={!!error}
                            helperText={error ? error.message : null}
                            onChange={onChange}
                            name="juez"
                            disabled={formState}
                          >
                            {jueces.map((juez) => (
                              <MenuItem
                                value={
                                  juez.apellido_paterno +
                                  " " +
                                  juez.apellido_materno +
                                  ", " +
                                  juez.primer_nombre +
                                  " " +
                                  juez.segundo_nombre
                                }
                              >
                                {juez.apellido_paterno +
                                  " " +
                                  juez.apellido_materno +
                                  ", " +
                                  juez.primer_nombre +
                                  " " +
                                  juez.segundo_nombre}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                    )}
                    rules={{
                      required: "El campo Repite Contrasena esta vacío",
                    }}
                  />

                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: "10px" }}
                  >
                    <Button type="submit" variant="contained" color="primary" disabled={formState}>
                      Iniciar Robot
                    </Button>
                  </Grid>
                </form>
              </div>
            </Grid>

            <Grid item xs={12} lg={8}>
              <Grid container justify="center">
                <Typography
                  style={{ marginBottom: "15px" }}
                  variant="h4"
                  color="initial"
                >
                  Instrucciones
                </Typography>
                <Grid style={{ width: "1100px", height: "600px" }}>
                  <CarouselDevolucionExhortos />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </React.Fragment>
  );
}
