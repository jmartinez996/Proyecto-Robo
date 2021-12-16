import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
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

function AgregarUsuario() {
    const MySwal = withReactContent(Swal);
    const classes = useStyles();
    const [errMssg, setErrMssg] = useState('');
    const [tribunales, setTribunales] = useState([]);
    const { handleSubmit, control} = useForm();
    const token = window.localStorage.getItem('robo-jwt-token')
    

    const onSubmit = async (data) => {
        const f = new FormData();
        f.append("nombre", data.nombre);
        f.append("apellido", data.apellido);
        f.append("rut", data.rut);
        f.append("correo", data.correo);
        f.append("contrasena", data.contrasena);
        f.append("repcontrasena", data.repcontrasena);
        f.append("tribunal", data.tribunal)
        await axios.post(`http://10.13.18.84:5000/agregauser/`, f, {headers: {'Content-Type': 'application/json','Authorization': `Bearer `+token}})
        .then(response=>{

            seteaError("");
            MySwal.fire({
                icon: 'success',
                title: 'Completado',
                text: 'Usuario Registrado con exito!',
            })

        }).catch(error=>{
            seteaError(error.response.data.message);

        })
        // console.log(data.rut);
    };

    const seteaError = err => {
        setErrMssg(err);
    };
    
    useEffect(async() => {
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
                    label="Ingresa Nombre usuario"
                    autoComplete="Nombre de usuario"
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
                    id="apellido"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa Apellido usuario"
                    autoComplete="Apellido de usuario"
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo Apellido de usuario esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="rut"
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
                    label="Ingresa Rut usuario"
                    autoComplete="Rut de usuario"
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo Rut de usuario esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="correo"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="correo"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa Correo usuario"
                    autoComplete="Correo de usuario"
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo Correo de usuario esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="contrasena"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="contrasena"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa Contrasena"
                    autoComplete="contrasena"
                    onChange={onChange}
                    type="password"
                    />
                )}
                rules={{ required: 'El campo Contrasena esta vacío' }}
                />
                <Controller
                name="repcontrasena"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="repcontrasena"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Repite Contrasena"
                    autoComplete="Repite contrasena"
                    onChange={onChange}
                    type="password"
                    />
                )}
                rules={{ required: 'El campo Repite Contrasena esta vacío' }}
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
                            name="tribunal"
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
                
                <Typography variant="inherit" color="error">{errMssg}</Typography>
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Registrar
                    </Button>
                </div>
               
            </form>
            </div>
    
            
        </Container>
  );
}

export default AgregarUsuario;