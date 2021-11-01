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
import ReactDOM from "react-dom";




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
              return axios.post(`http://127.0.0.1:5000/createArea/`, f, {headers: {'Content-Type': 'application/json','Authorization': `Bearer `+token}})
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
                        text: 'Se agrego con exito '+nombre +'.',
                      })
                    getAreas();
                })
                .catch(error => {
                    MySwal.fire({
                        icon: 'error',
                        title: 'Error...',
                        text: 'No se pudo agregar' + nombre+'.',
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
      f.append("id_area", id);
      f.append("nombre_area", name);
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
        preConfirm:(nombre)=>{
          f.append("nombre_area_nuevo",nombre)
          console.log("se modifico");
          console.log(name);
          return axios.post(`http://127.0.0.1:5000/updateArea/`, f, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+token
            }}).then(response=>{
              getAreas();
              Swal.fire({
                title: 'confirmación',
                text: "Se ha modificado el registro "+name+" por "+nombre,
                icon: 'sucess'
              });    
            }).catch(error => {
              MySwal.fire({
                  icon: 'error',
                  title: 'Error...',
                  text: 'No se pudo cambiar' + name+'.',
                })
          })
        }
      })
      console.log("Cambiar area con id"+id);

    };
    
    const delete_Area=($id,$name)=>{
      const id = $id;
      const name = $name;
      console.log(name);
      const token = window.localStorage.getItem('robo-jwt-token');
      const f = new FormData();
      console.log("aca");
      f.append("id_area", id);
      f.append("nombre_area", name);

      MySwal.fire({
        title: 'Eliminar',
        text: "¿Desea Eliminar el registro "+name+" ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`http://127.0.0.1:5000/deleteArea/`, f, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+token
            }}).then(response=>{
              getAreas();    
            })
          MySwal.fire(
            'Eliminado',
            'El registro '+name+' se ha eliminado',
            'success'
          )
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          MySwal.fire(
            'Cancelado',
            'El registro no se ha eliminado',
            'error'
          )
        }
      }).catch(error => {
        MySwal.fire({
            icon: 'error',
            title: 'Error...',
            text: 'No se pudo Eliminar.',
          })
    })
      /*
      return axios.post(`http://127.0.0.1:5000/deleteArea/`, f, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token
        }}).then(response=>{
          getAreas();    
        });*/
        return "";
      
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
                      onClick= {() => delete_Area(area.id_area,area.nombre_area)}
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


