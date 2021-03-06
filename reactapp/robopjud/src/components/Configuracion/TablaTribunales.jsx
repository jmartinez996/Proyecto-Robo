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
  Grid, IconButton,List,ListItem
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import axios from 'axios';
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {Link } from 'react-router-dom';





 export default function Tablatribunales(){
    const MySwal = withReactContent(Swal)
    const token = window.localStorage.getItem('robo-jwt-token')
    const [data, setData] = useState([]);
    const getTribunal = async() => {
    const tribunal = await axios(`http://127.0.0.1:5000/getTribunal`,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer `+token
      }
      }).then((res) => {
          //console.log(res.data.message)
          setData(res.data.message)
        }).catch((error) => {
          //console.log(error.message)
        })
    }
    useEffect(() => {
      getTribunal();
   }, []);
    
    const showAlert =() =>{
      
    }
    const delete_Tribunal= ($id,$name)=>{
      console.log("Delete id: "+$id);
      const token = window.localStorage.getItem('robo-jwt-token');
      const f = new FormData();
      f.append("id_tribunal", $id);
      Swal.fire({
        title: 'Eliminar',
        text: "Desea eliminar el Tribunal "+$name,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          axios.post(`http://127.0.0.1:5000/deleteTribunal/`, f, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token
          }}).then(response=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            getTribunal();    
          })
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          Swal.fire(
            'Cancelled',
            'Your imaginary file is safe :)',
            'error'
          )
        }
      })
      
    }
    const update_Tribunal=($name,$id)=>{
      console.log("Update")
    }
  return(

      <Card>
        <Grid container align-content-center justify="space-between">
          <Grid item>
            <CardHeader title="Tribunales"  />
          </Grid>
          <Grid item>
            <Link to='/configuracion/agregartribunal' style={{textDecoration:'none'}}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginRight:"10px",
                  marginTop:"15px"
                }}
                >
                Agregar Tribunal
              </Button>
            </Link>
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
                    Telefono
                  </TableCell>
                  <TableCell>
                    Area
                  </TableCell>
                  <TableCell>
                    Acciones
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((tribunal) => (
                  <TableRow
                    hover
                    //key={.id_usuario}
                  >
                    <TableCell>
                      {tribunal.nombre}
                    </TableCell>
                    <TableCell>
                      {tribunal.fono}
                    </TableCell>
                    <TableCell>
                    <List>
                      {tribunal.nombre_area.map((areas)=>(
                        <ListItem>{areas}</ListItem>
                      ))}
                      </List>
                      {/* {tribunal.nombre_area} */}
                    </TableCell>
                    <TableCell>
                    <IconButton  aria-label="Eliminar"
                    onClick= {() => delete_Tribunal(tribunal.id_tribunal,tribunal.nombre)}
                    >
                    <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Editar"
                    onClick= {() => update_Tribunal(tribunal.id_tribunal)}
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


