import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Link from '@material-ui/core/Link';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(1),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      marginTop:theme.spacing(1)
    },
    formControl: {
        paddingTop:theme.spacing(2),
        marginBottom:theme.spacing(1)
      },
  }));

function AgregaRobot() {
    const token = window.localStorage.getItem('robo-jwt-token')
    const MySwal = withReactContent(Swal)
    const classes = useStyles();
    const [errMssg, setErrMssg] = useState('');
    const [tribunales, setTribunales] = useState([]);
    const [areas, setAreas] = useState([]);
    const { handleSubmit, control} = useForm();

    const onSubmit = async (data) => {
       
        console.log(data);
        const f = new FormData();
        f.append("nombre",data.nombre);
        f.append("descripcion",data.apellido);
        f.append("ruta",data.exe);
        f.append("id_tribunal",data.tribunal);
        f.append("id_area",data.area);
        axios.post(`http://10.13.18.84:5000/createRobot/`, f, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+token
            }})
    };

    const seteaError = err => {
        setErrMssg(err);
    };

    useEffect(async () => {
        await axios.get(`http://10.13.18.84:5000/getTribunal`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token
        }
      })
      .then((res) => {
        setTribunales(res.data.message)
      })
      .catch((error) => {
        console.log(error.message)
      })
    }, []);

    useEffect(async() => {
        await axios.get(`http://10.13.18.84:5000/getAreas`,{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer `+token
        }
      })
      .then((res) => {
        setAreas(res.data.message)
      })
      .catch((error) => {
        console.log(error.message)
      })
    }, []);


    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <AccountCircleIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Registro
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)} encType='application/json'>
                <Controller
                name="nombre"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="nombre"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa Nombre del Robot"
                    autoComplete="Nombre de Robot"
                    autoFocus
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo Nombre de usuario esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="apellido"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="descripción"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa Descripción del robot"
                    autoComplete="Descripción de Robot"
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo Apellido de usuario esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="exe"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="rut"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa ruta de Robot"
                    autoComplete="ruta robot"
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo Rut de usuario esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="tribunal"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (

                    <>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">Seleccione Tribunal</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Age"
                            margin="dense"
                            error={!!error}
                            helperText={error ? error.message : null}
                            onChange={onChange}
                            name = "tribunal"
                            >
                           
                           {tribunales.map((tribunal)=> (
                                <MenuItem value={tribunal.id_tribunal}>{tribunal.nombre}</MenuItem>
                            ))}

                            </Select>
                        </FormControl>
                    </>

                )}
                rules={{ required: 'El campo Repite Contrasena esta vacío' }}
                />
                <Controller
                name="area"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (

                    <>
                        <FormControl variant="outlined" className={classes.formControl} fullWidth>
                            <InputLabel id="demo-simple-select-outlined-label">Seleccione Area</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            label="Age"
                            margin="dense"
                            error={!!error}
                            helperText={error ? error.message : null}
                            onChange={onChange}
                            name = "area"
                            >
                            {areas.map((area)=> (
                                <MenuItem value={area.id_area}>{area.nombre_area}</MenuItem>
                            ))}

                            </Select>
                        </FormControl>
                    </>

                )}
                rules={{ required: 'El campo Repite Contrasena esta vacío' }}
                />
                
                <Typography variant="inherit" color="error">{errMssg}</Typography>
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Agregar Robot
                    </Button>
                </div>
               
            </form>
            </div>
    
            
        </Container>
  );
}

export default AgregaRobot;