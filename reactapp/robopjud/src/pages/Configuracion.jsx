import React, { useEffect, useState, useContext } from "react";

import { Box, Container, Grid, Select, MenuItem, InputLabel } from "@material-ui/core";
import Tablausuarios from "../components/Configuracion/TablaUsuarios";
import Tablaareas from "../components/Configuracion/TablaAreas";
import Tablatribunales from "../components/Configuracion/TablaTribunales";
import TablaRobot from "../components/Configuracion/TablaRobot";
import Context from "../context/Context";
import AppbarMenu from "../components/AppbarMenu";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
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
function Configuracion(props) {
	const classes = useStyles();
	const { handleSubmit, control } = useForm();
	const [context, setContext] = useContext(Context);
	const [data, setData] = useState([]);
	const [change, setChage] = useState([]);
	const token = window.localStorage.getItem("R-61757468-x");
	const name = window.localStorage.getItem("R-6E616D65-x");
	const role = window.localStorage.getItem("R-726F6C65-x");
	const getTribunal = async () => {
		const tribunal = await axios(`http://10.13.18.84:5000/getTribunal`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ` + token,
			},
		})
			.then((res) => {
				//console.log(res.data.message)
				setData(res.data.message);
			})
			.catch((error) => {
				//console.log(error.message)
			});
	};
	const getData = () => {
		setContext({
			name: name,
			token: token,
			role: role,
		});
	};
	useEffect(() => {
		getData();
		getTribunal();
	}, []);
	const cambio = (tribu) => {
		console.log(tribu.target.value);
		setChage(tribu.target.value);
		
	};
	return (
		<>
			<AppbarMenu />
			<Box
				sx={{
					backgroundColor: "background.default",
					minHeight: "100%",
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<Controller
						name='Tribunal'
						control={control}
						defaultValue=''
						render={({ field: { onChange, value }, fieldState: { error } }) => (
							<>
								<FormControl variant='outlined' className={classes.formControl} fullWidth>
									<InputLabel id='demo-simple-select-outlined-label'>Seleccione tipo de Usuario</InputLabel>
									<Select
										className='form-select'
										name='options'
										onChange={(e) => {
											cambio(e);
										}}
									>
										{data.map((tribunal) => (
												<MenuItem value={tribunal.id_tribunal}>{tribunal.nombre}</MenuItem>
											))}
									</Select>
								</FormControl>
							</>
						)}
						rules={{
							required: "El campo Repite Contrasena esta vacío",
						}}
					/>

					<Grid container spacing={2}>
						<Grid item lg={12} sm={12} xl={12} xs={12}>
							<Tablausuarios />
						</Grid>
						<Grid item lg={8} sm={8} xl={8} xs={12}>
							<Tablatribunales name={"asd"}/>
						</Grid>
						<Grid item lg={4} sm={4} xl={4} xs={12}>
							<Tablaareas />
						</Grid>
						<Grid item lg={12} sm={12} xl={12} xs={12}>
							<TablaRobot />
						</Grid>
					</Grid>
				</Container>
			</Box>
		</>
	);
}

export default Configuracion;
