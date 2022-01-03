import { useEffect, useState, useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import { Box, Button, Card, CardHeader, Divider, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip, Grid, IconButton } from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Context from "../../context/Context";

export default function Tablausuarios() {
	const [context, setContext] = useContext(Context);
	const token = window.localStorage.getItem("R-61757468-x");
	const name = window.localStorage.getItem("R-6E616D65-x");
	const role = window.localStorage.getItem("R-726F6C65-x");
	const getData = () => {
		setContext({
			name: name,
			token: token,
			role: role,
		});
	};
	const [data, setData] = useState([]);
	const { handleSubmit, control } = useForm();
	const getUser = async () => {
		const users = await axios
			.get(`http://10.13.18.84:5000/getUsers`, {
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

	useEffect(() => {
		getUser();
		getData();
	}, []);
	const delete_Tribunal = ($id, $name) => {
		const token = window.localStorage.getItem("R-61757468-x");
		const form = new FormData();
		form.append("id_usuario", $id);
		Swal.fire({
			title: "Eliminar",
			text: "Desea eliminar el Usuario: " + $name,
			icon: "warning",
			showCancelButton: true,
			confirmButtonText: "Eliminar",
			cancelButtonText: "Cancelar",
			reverseButtons: true,
		}).then((result) => {
			if (result.isConfirmed) {
				axios
					.post(`http://10.13.18.84:5000/deleteUser/`, form, {
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ` + token,
						},
					})
					.then((response) => {
						Swal.fire("Elminado", "El Usuario ha sido eliminado", "success");
						getUser();
					});
			} else if (
				/* Read more about handling dismissals below */
				result.dismiss === Swal.DismissReason.cancel
			) {
				Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
			}
		});
	};
	const update_usuario = ($id) => {
		const token = window.localStorage.getItem("R-61757468-x");
	};

	const hasrole = (arr, val) => {
		if (!arr) {
			return false;
		} else {
			const valida = val.some((arrVal) => arr === arrVal);
			return valida;
		}
	};
	// si se quiere dar atributo a otro tipo de usuario solo se agrega al array el tipo user ["type","type"]
	return (
		<Card>
			<Grid container align-content-center justify='space-between'>
				<Grid item>
					<CardHeader title='Usuarios' />
				</Grid>
				{hasrole(context.role,["V-7375646F-r"]) && (
					<Grid item>
						<Link to='/configuracion/agregarusuario' style={{ textDecoration: "none" }}>
							<Button
								variant='contained'
								color='primary'
								style={{
									marginRight: "10px",
									marginTop: "15px",
								}}
							>
								Agregar Usuario
							</Button>
						</Link>
					</Grid>
				)}
			</Grid>
			<Divider />
			<PerfectScrollbar>
				<Box>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>Nombre</TableCell>
								<TableCell>Apellido</TableCell>
								<TableCell>Rut</TableCell>
								<TableCell>Correo</TableCell>
								<TableCell>Tribunal</TableCell>
								{hasrole(context.role,["V-7375646F-r"]) && <TableCell>Acciones</TableCell>}
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map((user) => (
								<TableRow hover key={user.id_usuario}>
									<TableCell>{user.nombre}</TableCell>
									<TableCell>{user.apellido}</TableCell>
									<TableCell>{user.rut}</TableCell>
									<TableCell>{user.correo}</TableCell>
									<TableCell>{user.tribunal}</TableCell>
									{hasrole(context.role,["V-7375646F-r"]) && (
										<TableCell>
											<IconButton aria-label='Eliminar' onClick={() => delete_Tribunal(user.id_usuario, user.nombre)}>
												<DeleteIcon />
											</IconButton>
											<IconButton aria-label='Editar' onClick={() => update_usuario(user.id_usuario)}>
												<EditIcon />
											</IconButton>
										</TableCell>
									)}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
			<Box
				sx={{
					display: "flex",
					justifyContent: "flex-end",
					p: 2,
				}}
			></Box>
		</Card>
	);
}
