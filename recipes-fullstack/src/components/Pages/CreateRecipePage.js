import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import BasicRecipeInfoInputs from '../UI/BasicRecipeInfoInputs';
import ImageUpload from '../UI/ImageUpload';

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
	divider: {
		backgroundColor: theme.divider.main,
		width: '100%',
		// [theme.breakpoints.down('md')]: {
		// 	width: '100%',
		// 	height: '0.1%',
		// },
	},
}));

const CreateRecipePage = props => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<Grid container direction='column'>
					<Grid item>
						<ImageUpload />
					</Grid>
					<Grid item>
						<BasicRecipeInfoInputs />
					</Grid>
					<Grid item className={classes.divider}>
						<Divider />
					</Grid>
					<Grid item>
						<p>helloo</p>
					</Grid>
					<Grid item className={classes.divider}>
						<Divider />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CreateRecipePage;
