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

const MySwal = withReactContent(Swal);
const alert = () => {
  MySwal.fire({
    title: <strong>Good job!</strong>,
    html: <i>You clicked the button!</i>,
    icon: "success",
  });
};

function Administracion(nombre) {
  const [robots, setRobots] = useState([]);
  const token = window.localStorage.getItem("robo-jwt-token");
  const test = '<ProductCard titulo="Resumen mensual." />';
  const state = true;
  // console.log(nombre.nombre)
  const getRobots = async () => {
    const robots = await axios(
      `http://127.0.0.1:5000/getRobotArea/` + nombre.nombre,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      }
    )
      .then((res) => {
        // console.log(res.data.message);
        setRobots(res.data.message);
      })
      .catch((error) => {
        console.log(error.message)
      });
  };

  useEffect(() => {
    getRobots();
    console.log(robots);
  }, []);

  return (
    <div>
      <Grid
        container
        spacing={10}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="initial" align="center">
            Aqui es Administracion
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={10}
          alignItems="center"
          justifyContent="center"
          xs={12}
        >
          {robots.map((robo) => (
            <Grid item lg={4} md={6} xs={12}>
              <Link
                to={robo.disponibilidad ? "/administracion/"+robo.link+`/${robo.id_tribunal}/${robo.id_robot}` : "#"}
                style={{ textDecoration: "none", width: "100%" }}
              >
                <JsxParser
                  components={{ ProductCard }}
                  jsx={'<ProductCard titulo="'+ robo.nombre_robot + '" desc="'+robo.desc_robot+'" disp="'+robo.disponibilidad+'" />'}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
      <Typography variant="h1" color="initial"></Typography>
    </div>
  );
}

export default Administracion;
