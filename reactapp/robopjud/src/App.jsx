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
import { usuario } from "./pages/Login";
import IngresoExhorto from "./pages/landingrobots/civil/Ingreso_exhortos";

import React, { useEffect, useState } from "react";
// import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import NoLogged from "./pages/NoLogged";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
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
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import AppbarMenu from "./components/AppbarMenu";
import RemoveIcon from "@material-ui/icons/Remove";

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



const hasrole1 = (user, roles) => {
	if (!user) {
		return false;
	} else {
		const valida = user.includes(roles);
		return valida;
	}
};
// const renderHome = (nombre) => {
// 	return (
// 		<Container>
// 			<Typography variant='h3' color='initial'>
// 				Bienvenido {nombre}
// 			</Typography>
// 		</Container>
// 	);
// };
function App() {
	const [nombre, setNombre] = useState(null);
	const [idTribunal, setIdTribunal] = useState(null);
	const [idUser, setIdUser] = useState(null);
	const token = window.localStorage.getItem("robo-jwt-token");
	const name = window.localStorage.getItem("robo-jwt-name");
	const role = window.localStorage.getItem("robo-jwt-role");
	const [areas, setAreas] = useState([]);
	const [context, setContext] = useState({
		name: "",
		role: "",
		token: "",
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
				console.log(res.data);
				setNombre(res.data.nombre);
				setIdTribunal(res.data.id_tribunal);
				setIdUser(res.data.id_usuario);
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
				console.log(areas);
			})
			.catch((error) => {
				//console.log(error.message)
			});
	};

	useEffect(() => {
		getData();
		getUserState();
		getAreas();
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

	const cerrarSesion = () => {
		setContext({
			name: null,
			token: null,
			role: null,
		});
		window.location.href = "/";
		window.localStorage.removeItem("robo-jwt-token");
	};

	return (
		<Router>
			<div className={classes.root}>
				<CssBaseline />
				<AppBar
					position='fixed'
					className={clsx(classes.appBar, {
						[classes.appBarShift]: open,
					})}
				>
					<Toolbar>
						<IconButton color='inherit' aria-label='open drawer' onClick={handleDrawerOpen} edge='start' className={clsx(classes.menuButton, open && classes.hide)}>
							<MenuIcon />
						</IconButton>
						<Link to='/home' style={{ textDecoration: "none", color: "white", flexGrow: 1 }}>
							<Typography variant='h6' noWrap>
								Robo Pjud
							</Typography>
						</Link>
						<AppbarMenu />
					</Toolbar>
				</AppBar>

				<Drawer
					className={classes.drawer}
					variant='persistent'
					anchor='left'
					open={open}
					classes={{
						paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
						<Typography style={{ paddingRight: "120px" }} variant='subtitle1' color='initial'>
							Menu
						</Typography>
						<IconButton onClick={handleDrawerClose}>{theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
					</div>

					<Divider />

					<List>
						<ListItem component={Link} to='/home' button key={"home"}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary='Home' />
						</ListItem>

						{areas.map((area) => (
							<ListItem component={Link} to={"/" + area.nombre_area.toLowerCase()} button key={area.nombre_area.toLowerCase()}>
								<ListItemIcon>
									<RemoveIcon />
								</ListItemIcon>
								<ListItemText primary={area.nombre_area} />
							</ListItem>
						))}

						<ListItem button onClick={cerrarSesion} key={"Cerrar sesion"}>
							<ListItemIcon>
								<ExitToAppIcon />
							</ListItemIcon>
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
						<Context.Provider value={[context, setContext]}>
							<Route path='/' exact>
								{token === null ? <SignIn /> : <Redirect to='/home' />}
							</Route>
							{hasrole1(context.role, "algo") && (
								<Route path='/civil/ingreso_de_exhortos/:idT/:idR/:ip' exact>
									{token !== null && <IngresoExhorto />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/civil' exact>
									{token !== null && <Civil props={{ nombre: "Civil", id_tribunal: idTribunal }} />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/familia' exact>
									{token !== null && <Familia />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/administracion/resumen_mensual/:idT/:idR/:ip' exact>
									{token !== null && <ResumenMensual />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/administracion/gestion_de_sii/:idT/:idR/:ip' exact>
									{token !== null && <GestionSii />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/administracion' exact>
									{token !== null && <Administracion props={{ nombre: "Administracion", id_tribunal: idTribunal }} />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/home'>
									{token !== null && <Home />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/configuracion/agregarusuario' exact>
									{token !== null && <AgregarUsuario />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/configuracion/agregartribunal' exact>
									{token !== null && <AgregarTribunal />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/configuracion/editartribunal' exact>
									{token !== null && <AgregarTribunal />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/configuracion/agregarobot' exact>
									{token !== null && <AgregaRobot />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/configuracion/updatetribunal/:id' children={<UpdateTribunal />} exact>
									{token !== null && <UpdateTribunal />}
									{token === null && <NoLogged />}
								</Route>
							)}

							{hasrole1(context.role, "user") && (
								<Route path='/configuracion' exact>
									{token !== null && <Configuracion />}
									{token === null && <NoLogged />}
								</Route>
							)}
						</Context.Provider>
					</Switch>
				</main>
			</div>
		</Router>
	);
}

export default App;
