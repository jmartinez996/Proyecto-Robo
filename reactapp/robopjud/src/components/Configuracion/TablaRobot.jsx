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





 export default function TablaRobot(){
    const MySwal = withReactContent(Swal)
    const token = window.localStorage.getItem('robo-jwt-token')
    const [data, setData] = useState([]);
    const getrobot = async() => {
      const robots = await axios(`http://127.0.0.1:5000/getRobot`,{
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
    getrobot();
  }, []);
<<<<<<< Updated upstream
    
    const showAlert =() =>{
      
    }
    const delete_Robot= ($id,$name)=>{
      console.log("delete id: "+$id)
      const token = window.localStorage.getItem('robo-jwt-token');
      const f = new FormData();
      f.append("id_robot", $id);
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
          axios.post(`http://127.0.0.1:5000/deleteRobot/`, f, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer `+token
          }}).then(response=>{
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            getrobot();    
=======
  //   const [state, setState] = useState({});

  function showAlert() {}
  const delete_Robot = ($id, $name) => {
    console.log("delete id: " + $id);
    const token = window.localStorage.getItem("robo-jwt-token");
    const f = new FormData();
    f.append("id_robot", $id);
    Swal.fire({
      title: "Eliminar",
      text: "Desea eliminar el Tribunal " + $name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://10.13.18.84:5005/deleteRobot/`, f, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
>>>>>>> Stashed changes
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
    const update_Robot=($name,$id)=>{
      console.log("Update")
    }
  return(

      <Card>
        <Grid container align-content-center justify="space-between">
          <Grid item>
            <CardHeader title="Tribunales"  />
          </Grid>
          <Grid item>
            <Link to='/configuracion/agregarobot' style={{textDecoration:'none'}}>
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginRight:"10px",
                  marginTop:"15px"
                }}
                >
                Agregar robot
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
                    Descripci??n
                  </TableCell>
                  <TableCell>
                    Tribunal
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
                {data.map((robot) => (
                  <TableRow
                    hover
                    //key={.id_usuario}
                  >
                    <TableCell>
                      {robot.nombre_robot}
                    </TableCell>
                    <TableCell>
                      {robot.desc_robot}
                    </TableCell>
                    <TableCell>
                      {robot.nombre_tribunal}
                    </TableCell>
                    <TableCell>
                      {robot.nombre_area}
                    </TableCell>
                    <TableCell>
                    <IconButton  aria-label="Eliminar"
                    onClick= {() => delete_Robot(robot.id_robot,robot.nombre_robot)}
                    >
                    <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="Editar"
                    onClick= {() => update_Robot()}
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


