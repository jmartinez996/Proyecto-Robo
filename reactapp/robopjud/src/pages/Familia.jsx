import React from "react";
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

function Familia() {
    return (
    <div>
      <Grid 
          container 
          spacing={10}
          direction="row"
          alignItems='center'
          justifyContent='center'
        >
        <Grid item xs={12}>
          <Typography variant="h3" color="initial" align='center'>Aqui es Familia</Typography>
        </Grid>
        
      </Grid>
      
      </div>
    

    
  );
}

export default Familia;