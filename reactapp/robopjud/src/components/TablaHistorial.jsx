import { useEffect, useState, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
} from "@material-ui/core";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Context from "../context/Context";
import CheckCircleRoundedIcon from "@material-ui/icons/CheckCircleRounded";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";

const columns = [
  { id: "nombre", label: "Nombre Robot", minWidth: 170 },
  { id: "usuario", label: "Nombre Usuario", minWidth: 100 },
  {
    id: "correo",
    label: "Correo",
    minWidth: 170,
  },
  {
    id: "fecha",
    label: "Fecha",
    minWidth: 170,
  },
  {
    id: "estado",
    label: "Estado Final",
    minWidth: 170,
  },
];

const useStyles = makeStyles((theme) => ({
  iconRight: {
    margin: 8,
    color: "green",
  },
  iconWrong: {
    margin: 8,
    color: "red",
  },
}));

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

export default function Tablahistorial() {
  const classes = useStyles();
  const [context, setContext] = useContext(Context);
  const MySwal = withReactContent(Swal);
  // const token = window.localStorage.getItem('robo-jwt-token');
  const token = window.localStorage.getItem("robo-jwt-token");
  const name = window.localStorage.getItem("robo-jwt-name");
  const role = window.localStorage.getItem("robo-jwt-role");
  const idT = window.localStorage.getItem("robo-jwt-idT");
  const getData = () => {
    setContext({
      name: name,
      token: token,
      role: role,
    });
  };

  const [data, setData] = useState([{ id_area: "", nombre_usuario: "" }]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getHistorial = async () => {
    const f = new FormData();
    f.append("id_tribunal", idT);

    const historial = await axios
      .post(`http://10.13.18.84:5005/getHistorial`, f, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ` + token,
        },
      })
      .then((res) => {
        console.log(res.data.message);
        setData(res.data.message);
      })
      .catch((error) => {
        //console.log(error.message)
      });
  };

  useEffect(() => {
    getHistorial();
    getData();
  }, []);

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table" size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((dat) => {
                  return (
                    <TableRow hover key={dat && dat.id_historial}>
                    <TableCell>{dat && dat.nombre_robot}</TableCell>
                    {/* <TableCell>{dat && dat.tribunal}</TableCell> */}
                    <TableCell>
                      {dat && dat.nombre_usuario + " " + dat.apellido_usuario}
                    </TableCell>
                    <TableCell>{dat && dat.correo}</TableCell>
                    <TableCell>{dat && dat.fecha}</TableCell>
                    <TableCell>
                      {dat.estado_final === "true" ? (
                        <CheckCircleRoundedIcon
                          className={`${classes.iconRight}`}
                        />
                      ) : (
                        <CancelRoundedIcon className={`${classes.iconWrong}`} />
                      )}
                    </TableCell>
                  </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
}
