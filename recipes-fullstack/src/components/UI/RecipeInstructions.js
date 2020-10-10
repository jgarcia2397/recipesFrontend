import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import RecipeInstructColumn from './RecipeInstructColumn';

const useStyles = makeStyles(theme => ({
	instructColumn: {
		width: '37.3%',
		height: '100%',
		backgroundColor: theme.palette.secondary.light,
		[theme.breakpoints.down('md')]: {
			width: '100%',
			height: '33.2%',
		},
	},
	instructColumnNewRecipe: {
		width: '49.97%',
		height: '100%',
		backgroundColor: theme.palette.secondary.light,
		// [theme.breakpoints.down('md')]: {
		// 	width: '100%',
		// 	height: '33.2%',
		// },
	},
	divider: {
		backgroundColor: theme.divider.main,
		width: '0.1%',
		[theme.breakpoints.down('md')]: {
			width: '100%',
			height: '0.1%',
		},
	},
}));

const RecipeInstructions = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<React.Fragment>
			<Grid
				item
				className={
					props.isNewRecipe
						? classes.instructColumnNewRecipe
						: classes.instructColumn
				}
			>
				<RecipeInstructColumn
					label='Ingredients'
					array={props.ingredientArray}
					isNewRecipe={props.isNewRecipe}
				/>
			</Grid>
			<Grid item className={classes.divider}>
				<Divider orientation={matchesMD ? 'horizontal' : 'vertical'} />
			</Grid>
			<Grid
				item
				className={
					props.isNewRecipe
						? classes.instructColumnNewRecipe
						: classes.instructColumn
				}
			>
				<RecipeInstructColumn
					label='Directions'
					array={props.directionsArray}
					isNewRecipe={props.isNewRecipe}
				/>
			</Grid>
		</React.Fragment>
	);
};

export default RecipeInstructions;
