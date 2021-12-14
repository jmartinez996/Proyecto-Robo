import React, { useEffect, useState } from "react";
import {usuarios} from './pages/Login';
import Typography from "@material-ui/core/Typography";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
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
function settoken() {
	const user = localStorage.getItem("robo-jwt-token");
  return user;
}
function getrole(){
  const datauser = usuarios;
  return datauser.role;
}
getrole();

const hasrole1 = (user,roles)=>{
  if(!user){
    return false
  }else{
    const valida = user.includes(roles);
    return valida
  }
}



function App() {
  const classes = useStyles();
  const [nombre, setNombre] = useState('hola');
  settoken();

	if(!settoken()){
	  return <SignIn/>
	}

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
        {/* Para agregar una ruta nueva solo hay que llamar a la función hasrole que verifica
          si el usuario tiene el rol, y con el operador logico para ver si existe la rura
          dando true el route y si tiene el rol puede acceder a la vista de la pagina.

        */}
        
        {hasrole1(getrole(),"algo") && <Route path='/home' component={Home}/>}
        
        {hasrole1(getrole(),"algo") && <Route path='/civil' component={Civil}/>}
        {hasrole1(getrole(),"algo") && <Route path='/familia' component={Familia}/>}
        
        {hasrole1(getrole(),"algo") && <Route path='/administracion/resumen_mensual/:idT/:idR' component={ResumenMensual} exact/>}
        {hasrole1(getrole(),"algo") && <Route path='/administracion/gestion_de_sii/:idT/:idR' component={GestionSii} exact/>}
        {hasrole1(getrole(),"algo") && <Route path="/administracion" exact>
                                          <Administracion nombre="Administracion" />
                                        </Route>}

        {hasrole1(getrole(),"algo") && <Route path='/configuracion/agregarusuario' component={AgregarUsuario} exact/>}
        {hasrole1(getrole(),"algo") && <Route path='/configuracion/agregartribunal' component={AgregarTribunal} exact/>}
        {hasrole1(getrole(),"algo") &&  <Route
              path="/configuracion/updatetribunal/:id"
              children={<UpdateTribunal />}
              exact
            >
              <UpdateTribunal />
            </Route>}
        {hasrole1(getrole(),"algo") && <Route path='/configuracion/agregarobot' component={AgregaRobot} exact/>}
        {hasrole1(getrole(),"algo") && <Route path='/configuracion' component={Configuracion} exact />}
        
					{/* <Route path='/home' exact>
						<Home />
					</Route>
          
					<Route path='/' exact>
						<SignIn />
					</Route>
					<Route path='/configuracion' exact>
						<Configuracion />
					</Route>
          <Route path='/familia' exact>
						<Familia />
					</Route> */}
				</Switch>
      </div>
    </Router>
  );
}

export default App;
