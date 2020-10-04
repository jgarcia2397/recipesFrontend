import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import BasicRecipeInfoInputs from '../UI/BasicRecipeInfoInputs';
import ImageUpload from '../UI/ImageUpload';
import RecipeInstructColumn from '../UI/RecipeInstructColumn';

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
	instructColumn: {
		width: '49.97%',
		height: '100%',
		backgroundColor: theme.palette.secondary.light,
		// [theme.breakpoints.down('md')]: {
		// 	width: '100%',
		// 	height: '33.2%',
		// },
	},
	recipeDetailsRoot: {
		width: '100%',
	},
	recipeDetailsContainer: {
		height: '45vh',
	},
	saveRecipeButton: {
		...theme.typography.button,
		marginTop: '15px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
    },
}));

const CreateRecipePage = props => {
	const classes = useStyles();

	const ingredients = [
		'1/2 cup butter',
		'3 tablespoons flour',
		'1/4 cup water',
		'1/2 cup sugar',
		'6 apples',
	];
	const directions = [
		'Preheat oven to 350 degrees. Preheat oven to 350 degrees. Preheat oven to 350 degrees. Preheat oven to 350 degrees. Preheat oven to 350 degrees. Preheat oven to 350 degrees.',
		'Make crust',
		'Start peeling and slicing apples',
		'Make crust',
		'Make crust',
		'Start peeling and slicing apples',
		'Make crust',
		'Make crust',
		'Start peeling and slicing apples',
		'Make crust',
		'Make crust',
		'Start peeling and slicing apples',
		'Make crust',
		'Make crust',
		'Start peeling and slicing apples',
		'Make crust',
	];

	return (
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<Grid container direction='column' alignItems='center'>
					<Grid item>
						<ImageUpload />
					</Grid>
					<Grid item>
						<BasicRecipeInfoInputs />
					</Grid>
					<Grid item className={classes.divider}>
						<Divider />
					</Grid>
					<Grid item className={classes.recipeDetailsRoot}>
						<Grid
							container
							direction='row'
							className={classes.recipeDetailsContainer}
						>
							<Grid item className={classes.instructColumn}>
								<RecipeInstructColumn label='Ingredients' array={ingredients} isNewRecipe />
							</Grid>
							<Grid item>
								<Divider
									orientation='vertical'
									style={{ backgroundColor: '#000' }}
								/>
							</Grid>
							<Grid item className={classes.instructColumn}>
								<RecipeInstructColumn label='Directions' array={directions} isNewRecipe />
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.divider}>
						<Divider />
					</Grid>
					<Grid item>
						<Button className={classes.saveRecipeButton}>Save Recipe</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CreateRecipePage;
