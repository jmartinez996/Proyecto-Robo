import { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Box, Button, Card, CardHeader, Chip, Divider, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, Tooltip, Grid, IconButton } from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ReactDOM from "react-dom";
import Context from "../context/Context";
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';

const useStyles = makeStyles((theme) => ({
	iconRight:{
	  margin:8,
	  color:"green"
	},
	iconWrong:{
		margin:8,
		color:"red"
	  }
  }));

export default function Tablahistorial() {
	const classes = useStyles();
	const [context, setContext] = useContext(Context);
	const MySwal = withReactContent(Swal);
	// const token = window.localStorage.getItem('robo-jwt-token');
	const token = window.localStorage.getItem("robo-jwt-token");
	const name = window.localStorage.getItem("robo-jwt-name");
	const role = window.localStorage.getItem("robo-jwt-role");
	const getData = () => {
		setContext({
			name: name,
			token: token,
			role: role,
		});
	};
	const [data, setData] = useState([{ id_area: "", nombre_usuario: "" }]);
	const getHistorial = async () => {
		const historial = await axios(`http://127.0.0.1:5000/getHistorial`, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ` + token,
			},
		})
			.then((res) => {
				console.log(res.data.message)
				setData(res.data.message);
			})
			.catch((error) => {
				//console.log(error.message)
			});
	};

	useEffect(() => {
		getHistorial();
		getData();
	}, []);
	
	return (
		<Card>
			<Grid container align-content-center justify='space-between'>
				<Grid item>
					<CardHeader title='Robots Ejecutados.' />
				</Grid>
			</Grid>
			<Divider />
			<PerfectScrollbar>
				<Box>
					<Table size='small'>
						<TableHead>
							<TableRow>
								<TableCell>Nombre Robot</TableCell>
                                <TableCell>Tribunal</TableCell>
                                <TableCell>Usuario</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Estado Final</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{data.map( (dat) => (
								<TableRow hover key={dat && dat.id_historial}>
									<TableCell>{dat && dat.nombre_robot}</TableCell>
                                    <TableCell>{dat && dat.tribunal}</TableCell>
                                    <TableCell>{dat && dat.nombre_usuario + ' '+ dat.apellido_usuario}</TableCell>
                                    <TableCell>{dat && dat.correo}</TableCell>
                                    <TableCell>{dat && dat.fecha}</TableCell>
									<TableCell>{ dat.estado_final === 'true' ? <CheckCircleRoundedIcon className={`${classes.iconRight}`}/> : <CancelRoundedIcon className={`${classes.iconWrong}`}/> }</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</Box>
			</PerfectScrollbar>
		</Card>
	);
}