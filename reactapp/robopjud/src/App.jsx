import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
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



function App() {
  const classes = useStyles();
  const [nombre, setNombre] = useState('hola');


  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Typography variant="h6" noWrap>
                Robo Pjud
              </Typography>
            </Link>
          </Toolbar>
        </AppBar>

        <Switch>

          

          <Route path="/home" exact>
            <Home />
          </Route>

          <Route path="/">
            <SignIn />
          </Route>
          <Redirect to="/home"/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
