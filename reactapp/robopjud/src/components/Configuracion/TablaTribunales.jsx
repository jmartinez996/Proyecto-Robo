import { useEffect, useState, useContext } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
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
  List,
  ListItem,
} from "@material-ui/core";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Context from "../../context/Context";

export default function Tablatribunales() {
  const [context, setContext] = useContext(Context);
  const token = window.localStorage.getItem("robo-jwt-token");
	const name = window.localStorage.getItem("robo-jwt-name");
	const role = window.localStorage.getItem("robo-jwt-role");
  
  const getData = () => {
		setContext({
			name: name,
			token: token,
			role: role,
		});
	};
  const MySwal = withReactContent(Swal);
  const [data, setData] = useState([]);
  const getTribunal = async () => {
    const tribunal = await axios(`http://10.13.18.84:5000/getTribunal`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        //console.log(res.data.message)
        setData(res.data.message);
      })
      .catch((error) => {
        //console.log(error.message)
      });
  };
  useEffect(() => {
    getTribunal();
    getData();
  }, []);
  const prueba = ($id) => {
    var sendT = {
      id: 1,
      nombre: "Prueba Enviar",
      fono: 957606100,
      ciudad: "asd",
      areas: [81, 91, 3],
    };
    sendT = JSON.stringify(sendT);
    return sendT;
  };
  const showAlert = () => {};
  const delete_Tribunal = ($id, $name) => {
    console.log("Delete id: " + $id);
    const token = window.localStorage.getItem("robo-jwt-token");
    const f = new FormData();
    f.append("id_tribunal", $id);
    Swal.fire({
      title: "Eliminar",
      text: "Desea eliminar el Tribunal " + $name,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://10.13.18.84:5000/deleteTribunal/`, f, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
          })
          .then((response) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            getTribunal();
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  const update_Tribunal = ($name, $id) => {
    console.log("Update");
  };
  return (
    <Card>
      <Grid container align-content-center justify="space-between">
        <Grid item>
          <CardHeader title="Tribunales" />
        </Grid>
        {context.role === "sudo" && <Grid item>
          <Link
            to="/configuracion/agregartribunal"
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
              Agregar Tribunal
            </Button>
          </Link>
        </Grid>}
      </Grid>
      <Divider />
      <PerfectScrollbar>
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Telefono</TableCell>
                <TableCell>Area</TableCell>
                <TableCell>Código</TableCell>
                {context.role === "sudo" && <TableCell>Acciones</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((tribunal) => (
                <TableRow hover>
                  <TableCell>{tribunal.nombre}</TableCell>
                  <TableCell>{tribunal.fono}</TableCell>
                  <TableCell>
                    <List>
                      {tribunal.nombre_area.map((areas) => (
                        <ListItem>{areas}</ListItem>
                      ))}
                    </List>
                  </TableCell>
                  <TableCell>{tribunal.codigo_tribunal}</TableCell>
                  {context.role === "sudo" && <TableCell>
                    <IconButton
                      aria-label="Eliminar"
                      onClick={() =>
                        delete_Tribunal(tribunal.id_tribunal, tribunal.nombre)
                      }
                    >
                      <DeleteIcon />
                    </IconButton>
                    <Link
                      // to={"/configuracion/updatetribunal/".concat(tribunal.id_tribunal)}
                      to={`/configuracion/updatetribunal/${prueba(
                        tribunal.id
                      )}`}
                      style={{ textDecoration: "none" }}
                    >
                      <IconButton aria-label="Editar">
                        <EditIcon />
                      </IconButton>
                    </Link>
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
