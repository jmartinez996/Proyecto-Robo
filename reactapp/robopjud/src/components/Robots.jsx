import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography, Container, Switch
} from '@material-ui/core';

import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';


const Play = (flag) => {
  return (
    <Container>
      <PlayCircleOutlineIcon color="primary" />
      <Typography
        color="primary"
        display="inline"
        sx={{ pl: 1 }}
        variant="body2"
      >
        Disponible para ejecutar. 
      </Typography>
    </Container>
  );
};

const Pausa = (flag) => {
  return (
    <Container>
      <PauseCircleFilledRoundedIcon color="action" />
      <Typography
        color="textSecondary"
        display="inline"
        sx={{ pl: 1 }}
        variant="body2"
      >
        El Robot no se encuentra disponible. 
      </Typography>
    </Container>
  );
};

const ProductCard = (props) => (
  <Card
    button
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {props.titulo}
      </Typography>
      <Typography
        align="center"
        color="textPrimary"
        variant="body1"
      >
        {props.desc}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
          {props.disp === 'true' ? Play(props.disp) : Pausa(props.disp)}
          
        </Grid>
      </Grid>
    </Box>
  </Card>

);


export default ProductCard;
