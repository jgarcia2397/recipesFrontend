import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import BasicRecipeInfoInputs from '../UI/BasicRecipeInfoInputs';

const useStyles = makeStyles(theme => ({
	root: {
		height: '95vh',
		display: 'flex',
	},
	background: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',
		width: '100%',
		overflow: 'auto',
	},
}));

const CreateRecipePage = props => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<Grid container direction='column'>
					<Grid item>
						<BasicRecipeInfoInputs />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CreateRecipePage;
