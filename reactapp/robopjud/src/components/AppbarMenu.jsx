import React, { useEffect, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SettingsIcon from "@material-ui/icons/Settings";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import axios from "axios";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import RemoveIcon from "@material-ui/icons/Remove";

const drawerWidth = 240;
const ITEM_HEIGHT = 48;
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
export default function AppbarMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);

	const classes = useStyles();
	const theme = useTheme();
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
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

	const [areas, setAreas] = useState([]);
  const [nombre, setNombre] = useState(null);
  const [idTribunal, setIdTribunal] = useState(null);
  const [idUser, setIdUser] = useState(null);
	const token = window.localStorage.getItem("robo-jwt-token");
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
				window.localStorage.setItem("robo-jwt-idT", res.data.id_tribunal)
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
		getAreas();
    getUserState();
	}, []);
	return (
		<div>
			<AppBar
				position='flex'
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
					<IconButton component={Link} to='/configuracion' aria-label='more' aria-controls='long-menu' aria-haspopup='true' onClick={handleClick} style={{ color: "white" }}>
						<SettingsIcon />
					</IconButton>
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
		</div>
	);
}
