import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography, Container
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import {Link} from 'react-router-dom'

const Play = (flag) => {
  console.log(flag)
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
  console.log(flag)
  return (
    <Container>
      <PauseCircleFilledRoundedIcon color="action" />
      <Typography
        color="textSecondary"
        display="inline"
        sx={{ pl: 1 }}
        variant="body2"
      >
        El Robot se esta ejecutando.
      </Typography>
    </Container>
  );
};

const ProductCard = (props) => (
  // <Link to="/home" style={{textDecoration:'none'}}>
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
        {/* <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        /> */}
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
          {/* {props.disp === true && Play(props.disp)}
          {props.disp === false && Pausa(props.disp)} */}
        </Grid>
      </Grid>
    </Box>
  </Card>
  // </Link>
);

// ProductCard.propTypes = {
//   product: PropTypes.object.isRequired
// };

export default ProductCard;
