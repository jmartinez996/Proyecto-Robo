import React from "react";
import { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import ProductCard from "../components/Robots";
import RoboAdm1 from "../components/RoboAdm1";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import axios from "axios";
import { ContactSupportOutlined } from "@material-ui/icons";
import JsxParser from "react-jsx-parser";
import AppbarMenu from "../components/AppbarMenu";

const MySwal = withReactContent(Swal);
const alert = () => {
	MySwal.fire({
		title: <strong>Good job!</strong>,
		html: <i>You clicked the button!</i>,
		icon: "success",
	});
};

function Civil(props) {
	const [robots, setRobots] = useState([]);
	const token = window.localStorage.getItem("R-61757468-x");
	const test = '<ProductCard titulo="Resumen mensual." />';
	const state = true;
	const idT = window.localStorage.getItem("R-69645F74-x");
	console.log(props.props.id_tribunal);
	const getRobots = async () => {
		const robots = await axios(`http://10.13.18.84:5000/getRobotArea/` + props.props.nombre + "/" + idT, {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ` + token,
			},
		})
			.then((res) => {
				setRobots(res.data.message);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	useEffect(() => {
		getRobots();
	}, []);

	return (
		<React.Fragment>
			<AppbarMenu />
			<div>
				<Grid container spacing={10} direction='row' alignItems='center' justifyContent='center'>
					<Grid item xs={12}>
						<Typography variant='h3' color='initial' align='center'>
							Aqui es Civil
						</Typography>
					</Grid>
					<Grid container direction='row' spacing={10} alignItems='center' justifyContent='center' xs={12}>
						{robots.map((robo) => (
							<Grid item lg={4} md={6} xs={12}>
								<Link to={robo.disponibilidad ? "/civil/" + robo.link + `/${robo.id_tribunal}/${robo.id_robot}/${robo.ip}` : "#"} style={{ textDecoration: "none", width: "100%" }}>
									<JsxParser components={{ ProductCard }} jsx={'<ProductCard titulo="' + robo.nombre_robot + '" desc="' + robo.desc_robot + '" disp="' + robo.disponibilidad + '" />'} />
								</Link>
							</Grid>
						))}
					</Grid>
				</Grid>
				<Typography variant='h1' color='initial'></Typography>
			</div>
		</React.Fragment>
	);
}

export default Civil;
