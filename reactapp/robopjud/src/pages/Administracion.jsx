import React from "react";
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import ProductCard from "../components/Robots";
import RoboAdm1 from "../components/RoboAdm1";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import {Link} from 'react-router-dom'

const MySwal = withReactContent(Swal)
const alert = () => {
    MySwal.fire({
        title: <strong>Good job!</strong>,
        html: <i>You clicked the button!</i>,
        icon: 'success'
      })
}

function Administracion() {
    return (
    <div>
      <Grid 
          container 
          spacing={10}
          direction="row"
          alignItems='center'
          justifyContent='center'
        >
        <Grid 
        
          item 
          xs={12}
          
        >
          <Typography variant="h3" color="initial" align='center'>Aqui es Administracion</Typography>
        </Grid>
        <Grid
          container
          direction="row"
          spacing={10}
          alignItems='center'
          justifyContent='center'
          xs = {12}
        >   
            <Link to='/administracion/resumen_mensual' style={{textDecoration:'none'}}>
              <Grid
                item
                lg={4}
                md={6}
                xs={12}
                // onClick= {() => console.log('hola')}
              >
                  <RoboAdm1 titulo="Resumen mensual." />
              </Grid>
            </Link>
            {/* <Grid
              item
              lg={4}
              md={6}
              xs={12}

            >
                <ProductCard titulo="Gestion SII."/>
            </Grid> */}
            

        </Grid>
    
        
      </Grid>
      
      </div>
    

    
  );
}

export default Administracion;