import { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { TextField } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import PlayCircleFilledWhiteIcon from '@material-ui/icons/PlayCircleFilledWhite';
import { useParams } from 'react-router';

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


 export default function ResumenMensual(props){
  const MySwal = withReactContent(Swal)
  // console.log(useParams())
  const {idT} = useParams()
  const {idR} = useParams()
  const classes = useStyles();
  const [errMssg, setErrMssg] = useState('');
  const { handleSubmit, control} = useForm();
  const [archivo, setArchivo] = useState(null);
  const [formState, setFormState] = useState(false);

  const subirArchivo = e => {
    setArchivo(e);
    console.log(e.size);
  }

  function validationFile(archivo){
    //console.log(archivo)
    if( archivo == null ){
      return 'No se ha seleccionado ningun archivo'
    }
    if( archivo !== null ){
      var nombre = archivo.name.split('.');
      console.log(nombre[1])
      if(nombre[1] != 'xls'){
        return 'Tipo de archivo no compatible'
      }
      // if(nombre[1] != 'xlsx' ){
      //   return 'Tipo de archivo no compatible'
      // }
      
    }
  }

  function validationType(archivo){
    console.log(archivo)
    if ( archivo !== null ){
      console.log(archivo.type)
      if(archivo.type !== 'application/vnd.ms-excel' || archivo.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
        return 'Tipo de archivo no permitido'
      }
    }
  }

  const onSubmit = (data) => {
    const token = window.localStorage.getItem('robo-jwt-token')
    const f = new FormData();
    //console.log(data.archivo[9])
    f.append("correo", data.correo);
    f.append("archivo", archivo);
    f.append("user_mixtos", data.user_mixtos);
    f.append("pass_mixtos", data.pass_mixtos);
    f.append("user_familia", data.user_familia);
    f.append("pass_familia", data.pass_familia);
    f.append("user_siagj", data.user_siagj);
    f.append("pass_siagj", data.pass_siagj);
    f.append("id_tribunal", idT);
    f.append("id_robot", idR); 
    
    Swal.fire({
      title: 'Estas seguro que los datos son correctos?',
      text: "Se recomienda probar las credenciales de las distintas plataformas para evitar errores.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Iniciar Robot',
      allowOutsideClick: false
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post(`http://127.0.0.1:5000/ejecutaRobotResMens/`, f, {headers: {'Content-Type': 'multipart/form-data','Authorization': `Bearer `+token}})
        .then(response=>{

            // seteaError("");
            //console.log(response.data.message)
            MySwal.fire({
                icon: 'success',
                title: 'Completado',
                text: 'Robot ejecutado con exito!',
            })
            setFormState(true);

        }).catch(error=>{
            // seteaError(error.response.data.message);

        })
        // Swal.fire(
        //   'Deleted!',
        //   'Your file has been deleted.',
        //   'success'
        // )
      }
    })
    //console.log('enviando');
};

  return(
  
  <div>
      <Grid 
        container
        justify="center"
      >
        <Typography variant="h2" color="initial">Resumen Mensual</Typography>
      </Grid>
      
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >

        <Container>

          <Grid 
            container
            spacing={8}
          >

            <Grid
              item
              xs={6}
            >
              <CssBaseline/>
              <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                  <PlayCircleFilledWhiteIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                  Iniciar Robot
              </Typography>
              <form className={classes.form} onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                <Controller
                name="correo"
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
                    label="Correo Electronico"
                    autoComplete="Correo Electronico"
                    autoFocus
                    onChange={onChange}
                    disabled = {formState}
                    />
                )}
                rules={{ required: 'El campo Correo Electronico esta vacío',
                         pattern: /^\S+@\S+$/i,
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="archivo"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    InputProps={{readOnly:true}}
                    margin="dense"
                    type='file'
                    fullWidth
                    id="archivo"
                    // value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    onChange={e => subirArchivo(e.target.files[0])}
                    disabled = {formState}
                    />
                )}
                rules={{  
                        validate: () => validationFile(archivo),
                      }}
                />
                 {/* <input type="file" name="pic" id="pic" accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /> */}
                <Typography variant="inherit" color="error">{errMssg}</Typography>
                <Controller
                name="user_mixtos"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="user_mixtos"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Usuario de la plataforma mixtos.pjud"
                    autoComplete="usuario mixtos"
                    onChange={onChange}
                    disabled = {formState}
                    />
                )}
                rules={{ required: 'El campo usuario mixtos esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                  name="pass_mixtos"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="pass_mixtos"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Contrasena plataforma mixtos.pjud"
                    autoComplete="contrasena"
                    type="password"
                    onChange={onChange}
                    disabled = {formState}
                    />
                  )}
                  rules={{ required: 'El campo Contrasena mixtos esta vacío' }}
                />
                <Controller
                name="user_familia"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="user_familia"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Usuario de la plataforma familia.pjud"
                    autoComplete="usuario familia"
                    onChange={onChange}
                    disabled = {formState}
                    />
                )}
                rules={{ required: 'El campo usuario familia esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                  name="pass_familia"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="pass_familia"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Contrasena plataforma familia.pjud"
                    type="password"
                    onChange={onChange}
                    disabled = {formState}
                    />
                  )}
                  rules={{ required: 'El campo Contrasena familia esta vacío' }}
                />
                <Controller
                name="user_siagj"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="user_siagj"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Usuario de la plataforma siagj"
                    autoComplete="usuario siagj"
                    onChange={onChange}
                    disabled = {formState}
                    />
                )}
                rules={{ required: 'El campo usuario siagj esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                  name="pass_siagj"
                  control={control}
                  defaultValue=""
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="pass_siagj"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Contrasena plataforma siagj"
                    type="password"
                    onChange={onChange}
                    disabled = {formState}
                    />
                  )}
                  rules={{ required: 'El campo Contrasena siagj esta vacío' }}
                />
                <Typography variant="inherit" color="error">{errMssg}</Typography>
                <Grid
                  container
                  justify='center'
                  style={{marginTop:'10px'}}
                >
                  
                  <Button type="submit" disabled={formState}  variant="contained" color="primary">
                   Iniciar Robot
                  </Button>
                
                </Grid>
               
            </form>

              </div>
            </Grid>



            <Grid
              item
              xs={6}
            >
              
              <Grid 
                container
                justify="center"
              >
                <Typography style={{marginBottom:'15px'}} variant="h4" color="initial">Instrucciones</Typography>

                <Typography style={{marginBottom:'15px'}} variant="body1" color="initial">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique totam sit nisi dolore sunt rerum fugiat, commodi fugit alias ipsam! Qui harum voluptates esse eos necessitatibus atque blanditiis est? Consectetur?</Typography>
                

                
              </Grid>
              <Grid
                container
                
              >
                <ul>
                  <li><Typography variant="body1" color="initial">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nihil, asperiores quam illo consequatur repudiandae rem velit atque hic voluptatem cupiditate totam, deserunt rerum quod autem quae eaque earum id nulla.</Typography></li>
                  <li><Typography variant="body1" color="initial">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis labore, facilis aut laudantium animi excepturi maxime distinctio non officiis nam eligendi accusantium autem voluptates architecto ullam sit quo debitis esse?</Typography></li>
                  <li><Typography variant="body1" color="initial">Numero 3</Typography></li>
                  <li><Typography variant="body1" color="initial">Numero 4</Typography></li>
    
                </ul>
              </Grid>
                
            </Grid>


          </Grid>

        </Container>

      </Box>
      
  </div>
  
  )
}


