import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import BasicRecipeInfoInputs from '../UI/BasicRecipeInfoInputs';
import ImageUpload from '../UI/ImageUpload';
import RecipeInstructions from '../UI/RecipeInstructions';

const useStyles = makeStyles(theme => ({
	root: {
		height: '180vh',
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
		height: '55vh',
	},
	saveRecipeButton: {
		...theme.typography.button,
		marginTop: '45px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
	titleContainer: {
		marginTop: '200px',
		marginBottom: '100px',
		[theme.breakpoints.down('md')]: {
			marginTop: '70px',
			marginBottom: '60px',
		},
	},
}));

const CreateRecipePage = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

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
					<Grid item className={classes.titleContainer}>
						<Typography
							variant={matchesSM ? 'h4' : 'h3'}
							style={{ fontWeight: 'bold' }}
						>
							Basic Recipe Info
						</Typography>
					</Grid>
					<Grid item>
						<BasicRecipeInfoInputs />
					</Grid>
					<Grid item>
						<ImageUpload />
					</Grid>
					<Grid item className={classes.titleContainer}>
						<Typography
							variant={matchesSM ? 'h4' : 'h3'}
							style={{ fontWeight: 'bold' }}
						>
							Detailed Recipe Info
						</Typography>
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
							<RecipeInstructions
								ingredientArray={ingredients}
								directionsArray={directions}
								isNewRecipe
							/>
						</Grid>
					</Grid>
					<Grid item className={classes.divider}>
						<Divider />
					</Grid>
					<Grid item>
						<Button
							className={classes.saveRecipeButton}
							style={{ maxWidth: '140px', minWidth: '140px' }}
						>
							Save Recipe
						</Button>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CreateRecipePage;
