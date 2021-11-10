import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import GavelIcon from '@material-ui/icons/Gavel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
  
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

  const GreenCheckbox = withStyles({
    root: {
      color: green[400],
      '&$checked': {
        color: green[600],
      },
    },
    checked: {},
  })((props) => <Checkbox color="default" {...props} />);

function AgregarTribunal() {
    const token = window.localStorage.getItem('robo-jwt-token')
    const MySwal = withReactContent(Swal)
    const classes = useStyles();
    const [errMssg, setErrMssg] = useState('');
    const { handleSubmit, control, getValues,errors} = useForm({});
    const [areas, setAreas] = useState([]);
    const [sArea, setSArea] = useState([]);
    const [iArea, setIArea] = useState([]);
    const getAreas = async() => {
        const areas = await axios(`http://127.0.0.1:5000/getAreas`,{
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer `+token
            }
          })
          .then((res) => {
            console.log(res.data.message)
            setAreas(res.data.message)
          })
          .catch((error) => {
            console.log(error.message)
          })
    }

    useEffect(() => {
        getAreas();
    }, []);

    const [state, setState] = React.useState({
        checkedA: true,
      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };

    const onSubmit = async (data) => {
        const token = window.localStorage.getItem('robo-jwt-token')
        const f = new FormData();
        console.log(data)
        f.append("nombre", data.nombre);
        f.append("telefono", data.telefono);
        f.append("ciudad", data.ciudad);
        f.append("s_area",sArea);
        f.append("i_area",iArea);
        MySwal.fire({
          title: 'Agregar',
          text: "¿Desea agregar el tribunal "+ data.nombre +"?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Agregar',
          cancelButtonText: 'Cancelar',
          reverseButtons: true
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(`http://127.0.0.1:5000/createTribunal/`, f, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer `+token
              }})
            MySwal.fire(
              'Agregado',
              'El registro se ha agregado',
              'success'
            )
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            MySwal.fire(
              'Cancelado',
              'El registro no se ha eliminado',
              'error'
            )
          }
        }).catch(error => {
          MySwal.fire({
              icon: 'error',
              title: 'Error...',
              text: 'No se pudo Eliminar.',
            })
      })

    };
    const handleCheck = (checkedID)=>{
      const {areas : ids} = getValues()
    };
    
     const checked = (e,id) => {
       if (e.target.checked == true) {
         setSArea([...sArea,id])
         console.log(sArea);
      } else {
        setSArea(sArea => sArea.filter(n => n != id))
        console.log(sArea)
      }
       //falso eliminar
     }
    
    const seteaError = err => {
        setErrMssg(err);
    };
    
    // function validation(value){
    //   if(value != "1234"){
    //     return "el valor debe ser 1234"
    //   }
    // }
    // https://codesandbox.io/s/material-demo-bzj4i?file=/demo.js
    return (

        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <GavelIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Agregar Tribunal
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
                    label="Ingresa Nombre Tribunal"
                    autoComplete="Nombre de Tribunal"
                    autoFocus
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo nombre Tribunal esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="telefono"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="telefono"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa Telefono Tribunal"
                    autoComplete="Telefono Tribunal"
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo telefono Tribunal esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                name="ciudad"
                control={control}
                defaultValue=""
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    id="ciudad"
                    value={value}
                    error={!!error}
                    helperText={error ? error.message : null}
                    label="Ingresa la Ciudad del Tribunal"
                    autoComplete="Ciudad de Tribunal"
                    onChange={onChange}
                    />
                )}
                rules={{ required: 'El campo telefono Tribunal esta vacío',
                        //  validate: (value) => validation(value) 
                        }}
                />
                <Controller
                  name="item_ids"
                  render={({ field: { onChange, value }, fieldState: { error } }) =>
                    areas.map((area) => (
                      <FormControlLabel
                control={
                  <Checkbox
                    //checked = {true}
                    onChange={e => checked(e,area.nombre_area)}
                    //defaultChecked={defaultIds.includes(item.id)}
                  />
                }
                key={area.id_area}
                label={area.nombre_area}
              />
                    ))
                  }
                  control={control}
                />

                
                <Typography variant="inherit" color="error">{errMssg}</Typography>
                <div>
                    <Button type="submit" variant="contained" color="primary">
                        Agregar
                    </Button>
                </div>
               
            </form>
            </div>
    
            
        </Container>
  );
}

export default AgregarTribunal;