import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Grid, IconButton
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'





 export default function Tablaareas(){

    const MySwal = withReactContent(Swal)
    const token = window.localStorage.getItem('robo-jwt-token')
    const [data, setData] = useState([{id_area:'',nombre_usuario:''}]);

    const getAreas = async() => {
        const areas = await axios(`http://127.0.0.1:5000/getAreas`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+token
            }
          })
          .then((res) => {
            //console.log(res.data.message)
            setData(res.data.message)
          })
          .catch((error) => {
            //console.log(error.message)
          })
    }
    
    useEffect(() => {
       getAreas();
    }, []);
    
    const showAlert =() =>{
        const token = window.localStorage.getItem('robo-jwt-token')
        const f = new FormData();
        MySwal.fire({
            title: 'Ingresa Nombre Area',
            input: 'text',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Agregar',
            showLoaderOnConfirm: true,
            preConfirm: (nombre) => {

              f.append("nombre_area", nombre);
              return axios.post(`http://127.0.0.1:5000/agregaarea/`, f, {headers: {'Content-Type': 'application/json','Authorization': `Bearer `+token}})
                .then(response => {
                    // console.log(response.data.message)
                    var aux = data;
                    aux.push({
                        'id_area':response.data.message.id_area,
                        'nombre_area':response.data.message.nombre_area
                    })
                    setData(aux)
                    console.log(aux)
                    
                    MySwal.fire({
                        icon: 'success',
                        title: 'Completado',
                        text: 'Agregado con exito',
                      })
                    
                })
                .catch(error => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'No se pudo agregar.',
                      })
                })
            },
            allowOutsideClick: () => !Swal.isLoading()
          })
          
    }
    const change_Area=($id,$name)=>{
      const id = $id;
      const name = $name;
      const token = window.localStorage.getItem('robo-jwt-token');
      const f = new FormData();
      Swal.fire({
        title: 'Cambiar el',
            input: 'text',
            inputValue:name,
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Modificar',
            showLoaderOnConfirm: true,
            preConfirm:()=>{
              f.append("nombre_area","nombre")
              console.log("se modifico");
              console.log(name);
            }
      })
      console.log("Cambiar area con id"+id);

    };
    const delete_Area=(id)=>{
      const token = window.localStorage.getItem('robo-jwt-token');
      const f = new FormData();
      console.log("Eliminar area con id"+id);
    };
  return(

      <Card>
        <Grid container align-content-center justify="space-between">
          <Grid item>
            <CardHeader title="Areas"  />
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              style={{
                marginRight:"10px",
                marginTop:"15px"
              }}
              onClick= {() => showAlert()}
            >
              Agregar Area
            </Button>
          </Grid>
          
        </Grid>
        <Divider />
        <PerfectScrollbar>
          <Box >
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    Nombre
                  </TableCell>
                  <TableCell>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((area) => (
                  <TableRow
                    hover
                    key={area && area.id_area}
                  >
                    <TableCell>
                      {area && area.nombre_area}
                    </TableCell>
                    <TableCell>
                    <IconButton  aria-label="Eliminar"
                      onClick= {() => delete_Area(area.id_area)}
                    >
                    
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Editar"
                      onClick= {() => change_Area(area.id_area,area.nombre_area)}
                    >
                      <EditIcon />
                    </IconButton>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>

      </Card>

  )
}


