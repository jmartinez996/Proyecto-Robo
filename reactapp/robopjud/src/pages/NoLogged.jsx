import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


function NoLogged() {
  const classes = useStyles();
  const goLoggin = () => {
    window.location.href = "/"
  }

  return (
    <div className={classes.root}>
      <Grid 
          container 
          spacing={10}
          direction="row"
          alignItems='center'
          justifyContent='center'
        >
        <Grid item xs={12}>
          <Typography variant="h3" color="initial" align='center'>Debes iniciar sesion</Typography>
        </Grid>
        
        <Grid container justifyContent='center' item xs={12}  >
          <Button variant='contained' color="primary" onClick={goLoggin}>
            Iniciar sesion
          </Button>
        </Grid>
        
      </Grid>
      
      </div>
    

    
  );
}

export default NoLogged;