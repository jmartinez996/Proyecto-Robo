import React, {useEffect, useState} from "react";
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography'
import axios from "axios";
import NoLogged from './NoLogged'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SignIn from './Login'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import HomeIcon from '@material-ui/icons/Home';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import Civil from './Civil'
import Familia from './Familia'
import Administracion from './Administracion'
import Configuracion from './Configuracion'
import AgregarUsuario from "./AgregarUsuario";
import AgregarTribunal from "./AgregarTribunal";
import AppbarMenu from '../components/AppbarMenu'
import ResumenMensual from "./landingrobots/administracion/Resumen_mensual";
import AgregaRobot from "./AgregaRobot";
import UpdateTribunal from "./UpdateTribunal";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 3,
    padding: theme.spacing(1),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
    minWidth: '100vw'
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 1,
  },
}));

const renderHome = (nombre) => {
  return (
    <Container>
      <Typography variant="h3" color="initial">Bienvenido {nombre}</Typography>
    </Container>
  )
}

function Home() {
  const [nombre, setNombre] = useState(null)
  const token= window.localStorage.getItem('robo-jwt-token');

  const getUserState = () => {
    axios.get(`http://127.0.0.1:5000/userState`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token
        }
      })
      .then((res) => {
        console.log(res.data)
        setNombre(res.data.nombre)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  useEffect(()=> {
    getUserState()
  }
  ,[])

  const [estado, setEstado] = useState({});

  const pasaDato = async () => {
    
    const res = await axios.post(`http://127.0.0.1:5000/ejerobot`)
    // .then(res => {
    //   console.log(res.data);
    // }).catch(error => {
    //   console.log(error);
    // })
    console.log(res.data)
    
    if(res.data.mensaje === "Ejecutado"){
      const act = 1;
      console.log(act)
      setEstado(res.data)
    }
    
  }

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
    window.location.href = "/"
    window.localStorage.removeItem('robo-jwt-token')
  }

  return (
    
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon/>
            </IconButton>
            <Link to="/home" style={{ textDecoration: 'none', color:'white', flexGrow:1 }}>
              <Typography  variant="h6"  noWrap>
                Robo Pjud
              </Typography>
            </Link>
            <AppbarMenu />
          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
          >
          
          <div className={classes.drawerHeader}>
            <Typography style={{paddingRight:"120px"}} variant="subtitle1" color="initial">Menu</Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          <Divider />

          <List>

            <ListItem component={Link} to="/home" button key={'home'}>
              <ListItemIcon><HomeIcon/></ListItemIcon>
              <ListItemText primary='Home' />
            </ListItem> 
            <Divider />

            <ListItem component={Link} to="/civil" button key={'civil'}>
              <ListItemIcon><LocationCityIcon/></ListItemIcon>
              <ListItemText primary='Civil' />
            </ListItem> 
            <Divider />

            <ListItem component={Link} to="/familia" button key={'Familia'}>
              <ListItemIcon><SupervisorAccountIcon/></ListItemIcon>
              <ListItemText primary='Familia' />
            </ListItem> 
            <Divider />

            <ListItem component={Link} to="/administracion" button key={'Administracion'}>
              <ListItemIcon><AccountTreeIcon/></ListItemIcon>
              <ListItemText primary='Administracion'/>
            </ListItem> 
            <Divider />

            <ListItem button onClick={cerrarSesion} key={'Cerrar sesion'}>
              <ListItemIcon><ExitToAppIcon/></ListItemIcon>
              <ListItemText primary='Cerrar sesion' />
            </ListItem> 
            <Divider />
          </List>
          
        </Drawer>


        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
            
          })}
        >
          <div className={classes.drawerHeader} />
          
          <Switch>
            
            <Route path="/home">
              {nombre !== null && renderHome(nombre)}
              {nombre === null && <NoLogged/>}
            </Route>

            <Route path="/civil" exact>
              <Civil/>
            </Route>

            <Route path="/familia" exact>
              <Familia/>
            </Route>

            <Route path="/administracion" exact>
              <Administracion/>
            </Route>

            <Route path="/administracion/resumen_mensual" exact>
              <ResumenMensual/>
            </Route>

            <Route path="/configuracion" exact>
              <Configuracion/>
            </Route>

            <Route path="/configuracion/agregarusuario" exact>
              <AgregarUsuario/>
            </Route>

            <Route path="/configuracion/agregartribunal" exact>
              <AgregarTribunal/>
            </Route>

            <Route path="/configuracion/editartribunal" exact>
              <AgregarTribunal/>
            </Route>

            <Route path="/configuracion/agregarobot" exact>
              <AgregaRobot/>
            </Route>

            <Route path="/configuracion/updatetribunal/:id" children={<UpdateTribunal/>} exact>
              <UpdateTribunal/>
            </Route>
            
            <Route path="/" >
              <SignIn/>
            </Route>



          </Switch>    
          
        </main> 

      </div>
    </Router>
  );
}

export default Home;