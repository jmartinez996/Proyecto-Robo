import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
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
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const [errMssg, setErrMssg] = useState('');
  const { handleSubmit, control} = useForm();

  const onSubmit = async (data) => {
    
    const f = new FormData();
    f.append("rut", data.rut);
    f.append("contrasena", data.contrasena);
    await axios.post(`http://127.0.0.1:5000/login`, f, {'Content-Type': 'application/json'})
    .then(response=>{
      seteaError("");
      window.localStorage.setItem("robo-jwt-token", response.data.token)
      window.location.href="/home"

    }).catch(error=>{
      seteaError(error.response.data.message);

    })
    // console.log(data.rut);
  };

  const seteaError = err => {
    setErrMssg(err);
  };

  // function validation(value){
  //   if(value != "1234"){
  //     return "el valor debe ser 1234"
  //   }
  // }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesion
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)} encType='application/json'>
          <Controller
            name="rut"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              id="rut"
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              label="Ingresa Rut"
              autoComplete="rut"
              autoFocus
              onChange={onChange}
              />
            )}
            rules={{ required: 'El campo Rut esta vacío',
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
              margin="normal"
              fullWidth
              id="contrasena"
              value={value}
              error={!!error}
              helperText={error ? error.message : null}
              label="Ingresa Contrasena"
              autoComplete="contrasena"
              type="password"
              onChange={onChange}
              />
            )}
            rules={{ required: 'El campo Contrasena esta vacío' }}
          />
          <Typography variant="inherit" color="error">{errMssg}</Typography>
          <div>
            <Button type="submit" variant="contained" color="primary">
              Signup
            </Button>
          </div>
          
        </form>
      </div>
     

      
    </Container>
  );
}