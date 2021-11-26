import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Link } from "react-router-dom";

const RoboAdm1 = (titulo) => (
  // <Link to="/home" style={{textDecoration:'none'}}>
  <Card
    button
    sx={{
      display: "flex",
      flexDirection: "column",
      height: "100%",
    }}
  >
    <CardContent>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          pb: 3,
        }}
      >
        {/* <Avatar
          alt="Product"
          src={product.media}
          variant="square"
        /> */}
      </Box>
      <Typography align="center" color="textPrimary" gutterBottom variant="h4">
        {titulo.titulo}
      </Typography>
      <Typography align="center" color="textPrimary" variant="body1">
        Descripcion
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <AccessTimeIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            Updated 2hr ago
          </Typography>
        </Grid>
        <Grid
          item
          sx={{
            alignItems: "center",
            display: "flex",
          }}
        >
          <GetAppIcon color="action" />
          <Typography
            color="textSecondary"
            display="inline"
            sx={{ pl: 1 }}
            variant="body2"
          >
            200 Downloads
          </Typography>
        </Grid>
      </Grid>
    </Box>
  </Card>
  // </Link>
);

// ProductCard.propTypes = {
//   product: PropTypes.object.isRequired
// };

export default RoboAdm1;
