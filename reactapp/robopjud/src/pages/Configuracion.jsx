import React, { useEffect,useContext } from "react";

import { Box, Container, Grid } from "@material-ui/core";
import Tablausuarios from "../components/Configuracion/TablaUsuarios";
import Tablaareas from "../components/Configuracion/TablaAreas";
import Tablatribunales from "../components/Configuracion/TablaTribunales";
import TablaRobot from "../components/Configuracion/TablaRobot";
import Context from "../context/Context";

export const name = {
	name: "asd",
};
function Configuracion(props) {
	// const vari = useContext(Context);
	// console.log(vari)
	const [context, setContext] = useContext(Context);
	const token = window.localStorage.getItem("robo-jwt-token");
	const name = window.localStorage.getItem("robo-jwt-name");
	const role = window.localStorage.getItem("robo-jwt-role");

	const funsion = () => {
		console.log(context);
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
	}, []);
	return (
		<>
			<Box
				sx={{
					backgroundColor: "background.default",
					minHeight: "100%",
					py: 3,
				}}
			>
				<Container maxWidth={false}>
					<button onClick={() => funsion()}>Change Context Value</button>
					<Grid container spacing={2}>
						<Grid item lg={12} sm={12} xl={12} xs={12}>
							<Tablausuarios />
						</Grid>
						<Grid item lg={8} sm={8} xl={8} xs={12}>
							<Tablatribunales />
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
