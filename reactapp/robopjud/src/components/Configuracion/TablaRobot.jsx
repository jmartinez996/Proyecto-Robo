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
  const [switched, setSwitched] = useState(null);
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
    const robots = await axios(`http://10.13.18.84:5000/getRobot`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ` + token,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        setData(res.data.message);
        data.map(
          (robot) =>
            setState((state["sw" + robot.id_robot] = robot.disponibilidad))
          //   setState({ ...state, ["sw" + robot.id_robot]: robot.disponibilidad })
        );
        console.log(state);
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
          .post(`http://10.13.18.84:5000/deleteRobot/`, f, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ` + token,
            },
          })
          .then((response) => {
            Swal.fire("Eliminado!", "El registro ha sido eliminado con éxito.", "success");
            getrobot();
          });
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire("Cancelado", "No se ha eliminado el registro", "error");
      }
    });
  };
  const update_Robot = ($name, $id) => {
    console.log("Update");
  };

  const handleSwitched = (e, id_switch) => {
    // console.log(e)
    const miSwitch = document.querySelector("#switch" + id_switch);
    console.log(miSwitch.parentElement.parentElement.className.length)
    const classChecked = miSwitch.parentElement.parentElement.className
    console.log(classChecked)
    if (
      miSwitch.parentElement.parentElement.className.length ===
      152 || miSwitch.parentElement.parentElement.className.length ===
      150
    ) {
      miSwitch.parentElement.parentElement.setAttribute(
        "class",
        "MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-70 MuiSwitch-switchBase MuiSwitch-colorSecondary"
      );
      const f = new FormData();
      f.append("id_robot", id_switch);
      f.append("disponibilidad", false);
      axios.post(`http://10.13.18.84:5000/setDisponibilidad/`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      });
    } else {
      miSwitch.parentElement.parentElement.setAttribute(
        "class",
        "MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-70 MuiSwitch-switchBase MuiSwitch-colorSecondary PrivateSwitchBase-checked-71 Mui-checked"
      );
      const f = new FormData();
      f.append("id_robot", id_switch);
      f.append("disponibilidad", true);
      axios.post(`http://10.13.18.84:5000/setDisponibilidad/`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      });
      // console.log(miSwitch.parentElement.parentElement.className)
    }
    // if(e === true){
    //   miSwitch.checked = false
    //   miSwitch.parentElement.parentElement.setAttribute("class", "MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-70 MuiSwitch-switchBase MuiSwitch-colorSecondary ")
    //   console.log(miSwitch.checked)

    // }
    // else{
    //   miSwitch.checked = true
    //   miSwitch.parentElement.parentElement.setAttribute("class", "MuiButtonBase-root MuiIconButton-root PrivateSwitchBase-root-70 MuiSwitch-switchBase MuiSwitch-colorSecondary PrivateSwitchBase-checked-71 Mui-checked")
    //   console.log(miSwitch.checked)
    // }
  };

  return (
    <Card>
      <Grid container align-content-center justify="space-between">
        <Grid item>
          <CardHeader title="Robots" />
        </Grid>
        {context.role === "sudo" && (
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
                {/* <TableCell>Tribunal</TableCell> */}
                <TableCell>Area</TableCell>
                {context.role === "sudo" && <TableCell>Acciones</TableCell>}
                <TableCell>Disp.</TableCell>
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
                  {/* <TableCell>{robot.nombre_tribunal}</TableCell> */}
                  <TableCell>{robot.nombre_area} </TableCell>

                  {context.role === "sudo" && (
                    
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
                        component={Link}
                        to={"/configuracion/updaterobots/" + robot.id_robot}
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                  )}
                  {/* {context.role === "sudo" && ( */}
                    <FormControlLabel
                      control={
                        <Switch
                          id={"switch" + robot.id_robot}
                          checked={robot.disponibilidad}
                          onChange={(e) =>
                            handleSwitched(e.target, robot.id_robot)
                          }
                        />
                      }
                      key={robot.id_robot}
                    />
                  {/* )} */}
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
}
