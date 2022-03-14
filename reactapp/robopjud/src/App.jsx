import SignIn from "./pages/Login";
import Home from "./pages/Home";
import Configuracion from "./pages/Configuracion";
import Civil from "./pages/Civil";
import Familia from "./pages/Familia";
import ResumenMensual from "./pages/landingrobots/administracion/Resumen_mensual";
import GestionSii from "./pages/landingrobots/administracion/Gestion_sii";
import Administracion from "./pages/Administracion";
import AgregarUsuario from "./pages/AgregarUsuario";
import AgregarTribunal from "./pages/AgregarTribunal";
import AgregaRobot from "./pages/AgregaRobot";
import UpdateTribunal from "./pages/UpdateTribunal";
import UpdateUsuario from "./pages/UpdateUsuarios";
import UpdateRobot from "./pages/UpdateRobots";
import { usuario } from "./pages/Login";
import IngresoExhorto from "./pages/landingrobots/civil/Ingreso_exhortos";
import DevolucionExhorto from "./pages/landingrobots/civil/devolucion_exhortos";
import ArchivoCausas from "./pages/landingrobots/civil/archivoCausas";

import React, { useEffect, useState } from "react";
// import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import NoLogged from "./pages/NoLogged";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { name } from "./pages/Configuracion";

import Context from "./context/Context";

const drawerWidth = 240;

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
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const hasrole1 = (arr, val) => {
  if (!arr) {
    return false;
  } else {
    const valida = val.some((arrVal) => arr === arrVal);
    return valida;
  }
};

function App() {
  const [nombre, setNombre] = useState(null);
  const [idTribunal, setIdTribunal] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const token = window.localStorage.getItem("robo-jwt-token");
  const name = window.localStorage.getItem("robo-jwt-name");
  const role = window.localStorage.getItem("robo-jwt-role");
  const idT = window.localStorage.getItem("robo-jwt-idT");
  const [areas, setAreas] = useState([]);
  const [context, setContext] = useState({
    name: null,
    role: null,
    token: null,
  });
  const getData = () => {
    setContext({
      name: name,
      token: token,
      role: role,
    });
  };
  const getUserState = () => {
    axios
      .get(`http://10.13.18.84:5000/userState`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        setNombre(res.data.nombre);
        setIdTribunal(res.data.id_tribunal);
        setIdUser(res.data.id_usuario);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getData();
    getUserState();
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

  return (
    <Router>
      <div>
        <Switch>
          <Context.Provider value={[context, setContext]}>
            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/civil/ingreso_de_exhortos/:idT/:idR/:ip" exact>
                {token !== null && <IngresoExhorto />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/civil/devolucion_de_exhortos/:idT/:idR/:ip" exact>
                {token !== null && <DevolucionExhorto />}
              </Route>
            )}

            {/* {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/civil/causas_para_archivo/:idT/:idR/:ip" exact>
                {token !== null && <ArchivoCausas />}
              </Route>
            )} */}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/civil" exact>
                {token !== null && (
                  <Civil props={{ nombre: "Civil", id_tribunal: idT }} />
                )}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/familia" exact>
                {token !== null && <Familia />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/administracion/resumen_mensual/:idT/:idR/:ip" exact>
                {token !== null && <ResumenMensual />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/administracion/gestion_de_sii/:idT/:idR/:ip" exact>
                {token !== null && <GestionSii />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/administracion" exact>
                {token !== null && (
                  <Administracion
                    props={{ nombre: "Administracion", id_tribunal: idT }}
                  />
                )}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/home">{token !== null && <Home />}</Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/configuracion/agregarusuario" exact>
                {token !== null && <AgregarUsuario />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/configuracion/agregartribunal" exact>
                {token !== null && <AgregarTribunal />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/configuracion/editartribunal" exact>
                {token !== null && <AgregarTribunal />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/configuracion/agregarobot" exact>
                {token !== null && <AgregaRobot />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/configuracion/updateusuarios/:id" exact>
                {token !== null && <UpdateUsuario />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/configuracion/updaterobots/:id" exact>
                {token !== null && <UpdateRobot />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route
                path="/configuracion/updatetribunal/:id"
                children={<UpdateTribunal />}
                exact
              >
                {token !== null && <UpdateTribunal />}
              </Route>
            )}

            {hasrole1(context.role, ["user", "admin", "sudo"]) && (
              <Route path="/configuracion" exact>
                {token !== null && <Configuracion />}
              </Route>
            )}
            <Route path="/" exact>
              {context.token === null ? <SignIn /> : <Redirect to="/home" />}
            </Route>
            {context.token !== null ? (
              <Redirect to="/home" />
            ) : (
              <Redirect to="/" />
            )}
          </Context.Provider>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
