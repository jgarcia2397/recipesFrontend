import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
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
}));

const RecipeInstructions = props => {
	const classes = useStyles();

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
			<Grid item>
				<Divider orientation='vertical' style={{ backgroundColor: '#000' }} />
                {/* <Divider orientation={matchesMD ? 'horizontal' : 'vertical'} /> */}     {/* ToDo: Horizontal divider not present in RecipeFullDetailsPage when switching to small screen */}
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
