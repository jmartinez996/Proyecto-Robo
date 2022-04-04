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
import { useParams } from "react-router";
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

function FormUpdateTribunal(props) {
  console.log(props);
  const token = window.localStorage.getItem("robo-jwt-token");
  const idT = window.localStorage.getItem("robo-jwt-idT");
  console.log(idT);
  const MySwal = withReactContent(Swal);
  const classes = useStyles();
  const [errMssg, setErrMssg] = useState("");
  const { handleSubmit, control, getValues, errors } = useForm({});
  const [userSitci, setUserSitci] = useState("asdasd");
  const [passSitci, setPassSitci] = useState("asdasd");

  const getUserSitci = () => {
    const exhortos = axios(`http://10.13.18.84:5000/getUserSitci/` + idT, {
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
    getUserSitci();
  }, []);

  const seteaUserSitci = (e) => {
    setUserSitci(e);
  };

  const seteaPassSitci = (e) => {
    setPassSitci(e);
  };

  const onSubmit = async (data) => {
    const token = window.localStorage.getItem("robo-jwt-token");
    const f = new FormData();
    f.append("id_tribunal", idT)
    f.append("user_sitci", userSitci);
    f.append("pass_sitci", passSitci);
    MySwal.fire({
      title: "Actualizar cuenta Sitci",
      text: "¿Seguro que desea actualizar? Debe asegurarse de que la cuenta en la plataforma de RPA coincida con la de la plataforma SITCI.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Actualizar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          axios.post(`http://10.13.18.84:5000/updateSitciTribunal/`, f, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
          });
          MySwal.fire(
            "Actualizado",
            "El registro se ha actualizado con éxito",
            "success"
          );
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

  return (
    <React.Fragment>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <GavelIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Modificar Cuenta Sitci
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
              value={userSitci}
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
              onChange={(e) => seteaPassSitci(e.target.value)}
            />

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

export default FormUpdateTribunal;
