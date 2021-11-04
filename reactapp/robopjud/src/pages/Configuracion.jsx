import React from "react";
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

    // const token = window.localStorage.getItem('robo-jwt-token')
    // const [dataUsuarios, setDataUsuarios] = useState([]);
    // const [dataTribunales, setDataTribunales] = useState([]);
    // const [dataAreas, setDataAreas] = useState([]);

    // useEffect(async() => {
    //     const datos = await axios.get(`http://127.0.0.1:5000/getDataConf`,{
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'Authorization': `Bearer `+token
    //     }
    //   })
    //   .then((res) => {
    //     setDataUsuarios(res.data.data.data_usuarios)
    //     setDataTribunales(res.data.data.data_tribunal)
    //     setDataAreas(res.data.data.data_area)
    //     // console.log(res.data.data.data_area)
    //     // setNombre(res.data.nombre)
    //   })
    //   .catch((error) => {
    //     console.log(error.message)
    //   })
    // }, []);

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
                        <Tablausuarios />
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        sm={6}
                        xl={6}
                        xs={12}
                    >
                        <Tablatribunales />
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