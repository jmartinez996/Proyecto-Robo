import React, { useEffect, useState } from "react";

import Typography from "@material-ui/core/Typography";
import axios from "axios";
import NoLogged from "./NoLogged";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SignIn from "./Login";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import Civil from "./Civil";
import Familia from "./Familia";
import Administracion from "./Administracion";
import Configuracion from "./Configuracion";
import AgregarUsuario from "./AgregarUsuario";
import AgregarTribunal from "./AgregarTribunal";
import AppbarMenu from "../components/AppbarMenu";
import ResumenMensual from "./landingrobots/administracion/Resumen_mensual";
import GestionSii from "./landingrobots/administracion/Gestion_sii";
import AgregaRobot from "./AgregaRobot";
import UpdateTribunal from "./UpdateTribunal";
import RemoveIcon from "@material-ui/icons/Remove";
import IngresoExhorto from "./landingrobots/civil/Ingreso_exhortos";
import { usuario } from "./Login";

const drawerWidth = 240;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
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
    flexGrow: 3,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    minWidth: "100vw",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 1,
  },
}));


function getrole(){
  const datauser = usuario;
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
function Home() {
  
  let query = useQuery();
  const [nombre, setNombre] = useState(null);
  const [idTribunal, setIdTribunal] = useState(null);
  const [idUser, setIdUser] = useState(null);
  const token = window.localStorage.getItem("robo-jwt-token");
  const [areas, setAreas] = useState([]);

  const getUserState = () => {
    axios
      .get(`http://10.13.18.84:5000/userState`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        setNombre(res.data.nombre);
        setIdTribunal(res.data.id_tribunal)
        setIdUser(res.data.id_usuario)
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const getAreas = () => {
    axios(`http://10.13.18.84:5000/getAreas`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        //console.log(res.data.message)
        setAreas(res.data.message);
      })
      .catch((error) => {
        //console.log(error.message)
      });
  };

  useEffect(() => {
    getUserState();
    getAreas();
  }, []);

  // const [estado, setEstado] = useState({});

  // const pasaDato = async () => {
  //   const res = await axios.post(`http://10.13.18.84:5000/ejerobot`);
  //   // .then(res => {
  //   //   console.log(res.data);
  //   // }).catch(error => {
  //   //   console.log(error);
  //   // })
  //   console.log(res.data);

  //   if (res.data.mensaje === "Ejecutado") {
  //     const act = 1;
  //     console.log(act);
  //     setEstado(res.data);
  //   }
  // };

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const cerrarSesion = () => {
    window.location.href = "/";
    window.localStorage.removeItem("robo-jwt-token");
  };

  return (
    <div>
      <h1>Bienvenido n.</h1>
      <h3>Historial</h3>
      </div>
    
  );
}

export default Home;
