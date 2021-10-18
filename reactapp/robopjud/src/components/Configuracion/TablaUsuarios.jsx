import { useEffect, useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {Link} from 'react-router-dom'
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





 export default function Tablausuarios(){
    const token = window.localStorage.getItem('robo-jwt-token')
    const [data, setData] = useState([]);
    useEffect(() => {
        const users = axios.get(`http://127.0.0.1:5000/getUsers`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token
        }
      })
      .then((res) => {
        setData(res.data.message)
        // setNombre(res.data.nombre)
      })
      .catch((error) => {
        console.log(error.message)
      })
    }, []);
  
  return(
  
  <Card >
    <Grid container align-content-center justify="space-between">
      <Grid item>
        <CardHeader title="Usuarios"  />
      </Grid>
      <Grid item>
      <Link to='/configuracion/agregarusuario'>
        <Button
          variant="contained"
          color="primary"
          style={{
            marginRight:"10px",
            marginTop:"15px"
          }}
          >
          Agregar Usuario 
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
                Apellido
              </TableCell>
              <TableCell>
                Rut
              </TableCell>
              <TableCell>
                Correo
              </TableCell>
              <TableCell>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((user) => (
              <TableRow
                hover
                key={user.id_usuario}
              >
                <TableCell>
                  {user.nombre}
                </TableCell>
                <TableCell>
                  {user.apellido}
                </TableCell>
                <TableCell>
                  {user.rut}
                </TableCell>
                <TableCell>
                {user.correo}
                </TableCell>
                <TableCell>
                <IconButton  aria-label="Eliminar">
                  <DeleteIcon />
                </IconButton>
                <IconButton aria-label="Editar">
                  <EditIcon />
                </IconButton>
                </TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </PerfectScrollbar>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        p: 2
      }}
    >
    </Box>
  </Card>
  
  )
}


