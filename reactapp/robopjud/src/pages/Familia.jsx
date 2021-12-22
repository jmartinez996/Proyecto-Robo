import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import AppbarMenu from "../components/AppbarMenu";

function Familia() {
	return (
		<React.Fragment>
			<AppbarMenu />
			<div>
				<Grid container spacing={10} direction='row' alignItems='center' justifyContent='center'>
					<Grid item xs={12}>
						<Typography variant='h3' color='initial' align='center'>
							Aqui es Familia
						</Typography>
					</Grid>
				</Grid>
			</div>
		</React.Fragment>
	);
}

export default Familia;
