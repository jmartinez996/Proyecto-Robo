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
  FormGroup,
} from "@material-ui/core";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import Context from "../../context/Context";
import FormControlLabel from "@material-ui/core/FormControlLabel";

export default function TablaRobot(props) {
  const MySwal = withReactContent(Swal);
  const [context, setContext] = useContext(Context);
  const token = window.localStorage.getItem("robo-jwt-token");
  const name = window.localStorage.getItem("robo-jwt-name");
  const role = window.localStorage.getItem("robo-jwt-role");
  const [estado, setEstado] = useState({});
  const getData = () => {
    setContext({
      name: name,
      token: token,
      role: role,
    });
  };
  const [data, setData] = useState([]);
  const [state, setState] = useState(estado);

  const handleChange = (event) => {
    console.log(event.target.checked);

    setState({ ...state, [event.target.name]: event.target.checked });
    // setState(state[event.target.name] = event.target.checked)
    console.log(state);
  };

//   const orderDisponibilidad = () => {
//     {
//       data.map((robot) =>
//         setState((state["sw" + robot.id_robot] = robot.disponibilidad))
//       );
//     }
//     return state;
//   };

  const getrobot = async () => {
    const robots = await axios(`http://127.0.0.1:5000/getRobot`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        setData(res.data.message);
        data.map((robot) =>
            setState((state["sw" + robot.id_robot] = robot.disponibilidad))
        //   setState({ ...state, ["sw" + robot.id_robot]: robot.disponibilidad })
        );
		console.log(state)
      })
      .catch((error) => {
        //console.log(error.message)
      });
  };

  useEffect(() => {
    // getrobot();
    getData();
  }, []);
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
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .post(`http://127.0.0.1:5000/deleteRobot/`, f, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
          })
          .then((response) => {
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
            getrobot();
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelled", "Your imaginary file is safe :)", "error");
      }
    });
  };
  const update_Robot = ($name, $id) => {
    console.log("Update");
  };

  return (
    <Card>
      <Grid container align-content-center justify="space-between">
        <Grid item>
          <CardHeader title="Robots" />
        </Grid>
        {context.role === "user" && (
          <Grid item>
            <Link
              to="/configuracion/agregarobot"
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
                Agregar robot
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
                {/* <TableCell>Descripción</TableCell> */}
                <TableCell>Tribunal</TableCell>
                <TableCell>Area</TableCell>
                {context.role === "user" && <TableCell>Acciones</TableCell>}
                {/* <TableCell>Disp.</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {props.robots.map((robot) => (
                <TableRow
                  hover
                  //key={.id_usuario}
                >
                  <TableCell>{robot.nombre_robot}</TableCell>
                  {/* <TableCell>{robot.desc_robot}</TableCell> */}
                  <TableCell>{robot.nombre_tribunal}</TableCell>
                  <TableCell>{robot.nombre_area} </TableCell>
                  {context.role === "user" && (
                    <TableCell>
                      <IconButton
                        aria-label="Eliminar"
                        onClick={() =>
                          delete_Robot(robot.id_robot, robot.nombre_robot)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Editar"
                        onClick={() => update_Robot()}
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {/* <TableCell name="hola">
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={handleChange}
                            name={"sw" + robot.id_robot}
                            checked={state["sw" + robot.id_robot]}
                            inputProps={{ "aria-label": "sw" + robot.id_robot }}
                          />
                        }
                      />
                    </FormGroup>

                    <Switch name={'sw'+robot.id_robot} default inputProps={{ 'aria-label': 'primary checkbox' }} />
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
