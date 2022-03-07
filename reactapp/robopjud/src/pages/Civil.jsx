import React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ProductCard from "../components/Robots";
<<<<<<< Updated upstream
=======
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import axios from "axios";
import JsxParser from "react-jsx-parser";
import AppbarMenu from "../components/AppbarMenu";
>>>>>>> Stashed changes

const useStyles = makeStyles({
  root: {
    width: '100%',
  }
});

<<<<<<< Updated upstream
=======
function Civil(props) {
	const [robots, setRobots] = useState([]);
	const token = window.localStorage.getItem("robo-jwt-token");
	const getRobots = async () => {
>>>>>>> Stashed changes


function Civil() {
    const classes = useStyles();
    return (
    <div className={classes.root}>
      <Grid 
          container 
          spacing={10}
          direction="row"
          alignItems='center'
          justifyContent='center'
        >
        <Grid item xs={12}>
          <Typography variant="h3" color="initial" align='center'>Aqui es Civil</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={10}
          alignItems='center'
          justifyContent='center'
          xs = {12}
        >
            <Grid
              item
              lg={4}
              md={6}
              xs={12}

            >
                <ProductCard titulo="Ingreso de exhortos."/>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}

            >
                <ProductCard titulo="Causas para archivo."/>
            </Grid>
            <Grid
              item
              lg={4}
              md={6}
              xs={12}

            >
                <ProductCard titulo="Devolucion de exhortos."/>
            </Grid>
            

        </Grid>
    
        
      </Grid>
      
      </div>
    

    
  );
}

export default Civil;