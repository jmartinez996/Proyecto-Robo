import React from "react";
import Typography from '@material-ui/core/Typography'
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Tablausuarios from "../components/Configuracion/TablaUsuarios";
import Tablaareas from "../components/Configuracion/TablaAreas";
import Tablatribunales from "../components/Configuracion/TablaTribunales";
import TablaRobot from "../components/Configuracion/TablaRobot";
function Configuracion() {
    return (

      <>
        <Box 
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100%',
                py: 3
            }}
        >
            <Container  maxWidth={false}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    >
                        <Tablausuarios/>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        sm={6}
                        xl={6}
                        xs={12}
                    >
                        <Tablatribunales/>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        sm={6}
                        xl={6}
                        xs={12}
                    >
                        <Tablaareas/>
                    </Grid>
                    <Grid
                        item
                        lg={12}
                        sm={12}
                        xl={12}
                        xs={12}
                    >
                        <TablaRobot/>
                    </Grid>
                </Grid>
            </Container>
            
        </Box>
      </>  
  );
}

export default Configuracion;