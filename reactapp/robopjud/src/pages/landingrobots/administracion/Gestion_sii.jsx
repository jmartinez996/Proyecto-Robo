import React from "react";
import { useState } from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
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
import AppbarMenu from "../../../components/AppbarMenu";

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

export default function GestionSii(props) {
  const MySwal = withReactContent(Swal);
  const { idT } = useParams();
  const { idR } = useParams();
  const { ip } = useParams();
  const classes = useStyles();
  const { handleSubmit, control } = useForm();
  const [archivo, setArchivo] = useState(null);
  const [formState, setFormState] = useState(false);

  const subirArchivo = (e) => {
    setArchivo(e);
    console.log(e.size);
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

  const onSubmit = (data) => {
    const token = window.localStorage.getItem("robo-jwt-token");
    const f = new FormData();
    //console.log(data.archivo[9])
    f.append("correo", data.correo);
    f.append("archivo", archivo);
    f.append("user_sii", data.user_sii);
    f.append("pass_sii", data.pass_sii);
    f.append("id_tribunal", idT);
    f.append("id_robot", idR);
    f.append("ip", ip);

    Swal.fire({
      title: "Est??s seguro que los datos son correctos?",
      text: "Se recomienda probar las credenciales para evitar errores.",
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
          .post(`http://10.13.18.84:5005/ejecutaRobotGestSii/`, f, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ` + token,
            },
          })
          .then((response) => {
            MySwal.fire({
              icon: "success",
              title: "Completado",
              text: "Robot ejecutado con ??xito!",
            });
            setFormState(true);
          })
          .catch((error) => {
            // seteaError(error.response.data.message);
          });
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    });
    //console.log('enviando');
  };

  return (
    <React.Fragment>
      <AppbarMenu />
      <div>
        <Grid container justify="center">
          <Typography variant="h2" color="initial">
            Gestion de Sii
          </Typography>
        </Grid>

        <Box
          sx={{
            backgroundColor: "background.default",
            minHeight: "100%",
            py: 3,
          }}
        >
          <Container>
            <Grid container spacing={8}>
              <Grid item xs={6}>
                <CssBaseline />
                <div className={classes.paper}>
                  <Avatar className={classes.avatar}>
                    <PlayCircleFilledWhiteIcon />
                  </Avatar>
                  <Typography component="h1" variant="h5">
                    Iniciar Robot
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
                          autoFocus
                          onChange={onChange}
                          disabled={formState}
                        />
                      )}
                      rules={{
                        required: "El campo Correo Electronico esta vac??o",
                        pattern: /^\S+@\S+$/i,
                        //  validate: (value) => validation(value)
                      }}
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
                    {/* <input type="file" name="pic" id="pic" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /> */}
                    <Controller
                      name="user_sii"
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
                          id="user_sii"
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Usuario de la plataforma SII"
                          autoComplete="usuario SII"
                          onChange={onChange}
                          disabled={formState}
                        />
                      )}
                      rules={{
                        required: "El campo usuario SII esta vac??o",
                        //  validate: (value) => validation(value)
                      }}
                    />
                    <Controller
                      name="pass_sii"
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
                          id="pass_sii"
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          label="Contrasena plataforma SII"
                          autoComplete="contrasena SII"
                          type="password"
                          onChange={onChange}
                          disabled={formState}
                        />
                      )}
                      rules={{ required: "El campo Contrasena SII esta vac??o" }}
                    />
                    <Grid
                      container
                      justify="center"
                      style={{ marginTop: "10px" }}
                    >
                      <Button
                        type="submit"
                        disabled={formState}
                        variant="contained"
                        color="primary"
                      >
                        Iniciar Robot
                      </Button>
                    </Grid>
                  </form>
                </div>
              </Grid>

              <Grid item xs={6}>
                <Grid container justify="center">
                  <Typography
                    style={{ marginBottom: "15px" }}
                    variant="h4"
                    color="initial"
                  >
                    Instrucciones
                  </Typography>

                  <Typography
                    style={{ marginBottom: "15px" }}
                    variant="body1"
                    color="initial"
                  >
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Similique totam sit nisi dolore sunt rerum fugiat, commodi
                    fugit alias ipsam! Qui harum voluptates esse eos
                    necessitatibus atque blanditiis est? Consectetur?
                  </Typography>
                </Grid>
                <Grid container>
                  <ul>
                    <li>
                      <Typography variant="body1" color="initial">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Nihil, asperiores quam illo consequatur
                        repudiandae rem velit atque hic voluptatem cupiditate
                        totam, deserunt rerum quod autem quae eaque earum id
                        nulla.
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="initial">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Omnis labore, facilis aut laudantium animi
                        excepturi maxime distinctio non officiis nam eligendi
                        accusantium autem voluptates architecto ullam sit quo
                        debitis esse?
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="initial">
                        Numero 3
                      </Typography>
                    </li>
                    <li>
                      <Typography variant="body1" color="initial">
                        Numero 4
                      </Typography>
                    </li>
                  </ul>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </div>
    </React.Fragment>
  );
}
