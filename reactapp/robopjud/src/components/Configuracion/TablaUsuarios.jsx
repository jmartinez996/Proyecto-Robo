import { useEffect, useState, useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  IconButton,
} from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import { useForm, Controller } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Context from "../../context/Context";
import { gridColumnsTotalWidthSelector } from "@material-ui/data-grid";

export default function Tablausuarios(props) {
  const [context, setContext] = useContext(Context);
  const token = window.localStorage.getItem("robo-jwt-token");
  const name = window.localStorage.getItem("robo-jwt-name");
  const role = window.localStorage.getItem("robo-jwt-role");
  const [users, setUsers] = useState(props.usuarios)
  
//   console.log(users)
  const getData = () => {
    setContext({
      name: name,
      token: token,
      role: role,
    });
  };
  const [data, setData] = useState([]);
  const { handleSubmit, control } = useForm();

  const getUser = (id) => {
    if (id !== null) {
      const users = axios
        .get(`http://10.13.18.84:5000/getUsers/` + id, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ` + token,
          },
        })
        .then((res) => {
        //   setData(res.data.message);
		   setUsers(res.data.message);
        })
        .catch((error) => {
          //console.log(error.message)
        });
    }
  };


  useEffect(() => {
    // getUser();
    getData();
  }, []);
  const delete_Tribunal = ($id, $name) => {
    const token = window.localStorage.getItem("robo-jwt-token");
    const form = new FormData();
    form.append("id_usuario", $id);
    Swal.fire({
      title: "Eliminar",
      text: "Desea eliminar el Usuario: " + $name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://10.13.18.84:5000/deleteUser/`, form, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
          })
          .then((response) => {
            Swal.fire("Elminado", "El Usuario ha sido eliminado", "success");
            getUser(props.idT);
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  const update_usuario = ($id) => {
    const token = window.localStorage.getItem("robo-jwt-token");
    // console.log($id);
  };
  return (
    <Card>
      <Grid container align-content-center justify="space-between">
        <Grid item>
          <CardHeader title="Usuarios" />
        </Grid>
        {context.role === "sudo" && (
          <Grid item>
            <Link
              to="/configuracion/agregarusuario"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginRight: "10px",
                  marginTop: "15px",
                }}
              >
                Agregar Usuario
              </Button>
            </Link>
          </Grid>
        )}
        {context.role === "admin" && (
          <Grid item>
            <Link
              to="/configuracion/agregarusuario"
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                style={{
                  marginRight: "10px",
                  marginTop: "15px",
                }}
              >
                Agregar Usuario
              </Button>
            </Link>
          </Grid>
        )}
      </Grid>
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Rut</TableCell>
                <TableCell>Correo</TableCell>
                {/* <TableCell>Tribunal</TableCell> */}
                {context.role === "sudo" && <TableCell>Acciones</TableCell>}
                {context.role === "admin" && <TableCell>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.usuarios.map((user) => (
                <TableRow hover key={user.id_usuario}>
                  <TableCell>{user.nombre}</TableCell>
                  <TableCell>{user.apellido}</TableCell>
                  <TableCell>{user.rut}</TableCell>
                  <TableCell>{user.correo}</TableCell>
                  {/* <TableCell>{user.tribunal}</TableCell> */}
                  {context.role === "sudo" && (
                    <TableCell>
                      <IconButton
                        aria-label="Eliminar"
                        onClick={() =>
                          delete_Tribunal(user.id_usuario, user.nombre)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Editar"
                        onClick={() => update_usuario(user.id_usuario)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {context.role === "admin" && (
                    <TableCell>
                      <IconButton
                        aria-label="Eliminar"
                        onClick={() =>
                          delete_Tribunal(user.id_usuario, user.nombre)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Editar"
                        onClick={() => update_usuario(user.id_usuario)}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      ></Box>
    </Card>
  );
}
