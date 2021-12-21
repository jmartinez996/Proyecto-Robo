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
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { FormControl } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
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

export default function IngresoExhorto(props) {
  const MySwal = withReactContent(Swal);
  const { idT } = useParams();
  const { idR } = useParams();
  const { ip } = useParams();
  const classes = useStyles();
  const [errMssg, setErrMssg] = useState("");
  const { handleSubmit, control } = useForm();
  const { formState, setFormState } = useState(true);

  const onSubmit = (data) => {
    const token = window.localStorage.getItem("robo-jwt-token");
    const f = new FormData();
    f.append("user_sitci", data.user_sitci);
    f.append("pass_sitci", data.pass_sitci);
    f.append("id_juez", data.juez);
    f.append("id_tribunal", idT);
    f.append("id_robot", idR);
    f.append("ip", ip);
    f.append("correo", data.correo);

    Swal.fire({
      title: "Estas seguro que los datos son correctos?",
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
          .post(`http://127.0.0.1:5000/ejecutaIngresoExhorto/`, f, {
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
    <div>
      <Grid container justify="center">
        <Typography variant="h2" color="initial">
          Ingreso de Exhortos
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
                        autoFocus
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
                        value={value}
                        error={!!error}
                        helperText={error ? error.message : null}
                        label="Usuario de la plataforma civil.pjud"
                        autoComplete="usuario mixtos"
                        onChange={onChange}
                        disabled={formState}
                      />
                    )}
                    rules={{
                      required: "El campo usuario civil esta vacío",
                      //  validate: (value) => validation(value)
                    }}
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
                        value={value}
                        error={!!error}
                        helperText={error ? error.message : null}
                        label="Contraseña plataforma civil.pjud"
                        autoComplete="contrasena"
                        type="password"
                        onChange={onChange}
                        disabled={formState}
                      />
                    )}
                    rules={{
                      required: "El campo Contrasena civil esta vacío",
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
                          >
                            <MenuItem value={2}>
                              Maureira Gonzalez, Jose Luis
                            </MenuItem>
                            <MenuItem value={1}>
                              Madrid Alarcon, Francisco Ignacio
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </>
                    )}
                    rules={{
                      required: "El campo Repite Contrasena esta vacío",
                    }}
                  />

                  <Typography variant="inherit" color="error">
                    {errMssg}
                  </Typography>
                  <Grid
                    container
                    justify="center"
                    style={{ marginTop: "10px" }}
                  >
                    <Button type="submit" variant="contained" color="primary">
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
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Nihil, asperiores quam illo consequatur repudiandae rem
                      velit atque hic voluptatem cupiditate totam, deserunt
                      rerum quod autem quae eaque earum id nulla.
                    </Typography>
                  </li>
                  <li>
                    <Typography variant="body1" color="initial">
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Omnis labore, facilis aut laudantium animi excepturi
                      maxime distinctio non officiis nam eligendi accusantium
                      autem voluptates architecto ullam sit quo debitis esse?
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
  );
}
