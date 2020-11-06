import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import applePie from '../../assets/applePie.jpg';

const useStyles = makeStyles(theme => ({
	infoContainer: {
		width: '100%',
		height: '100%',
	},
	recipeImageContainer: {
		marginBottom: '75px',
		height: '20%',
		width: '70%',
		[theme.breakpoints.down('md')]: {
			marginBottom: '35px',
			height: '40%',
			width: '35%',
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '10px',
			height: '30%',
			width: '30%',
		},
	},
	recipeImage: {
		backgroundImage: `url(${applePie})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		width: '100%',
		height: '100%',
	},
	recipeTitle: {
		marginBottom: '25px',
		[theme.breakpoints.down('md')]: {
			marginBottom: '10px',
		},
	},
	info: {
		marginBottom: '15px',
		[theme.breakpoints.down('md')]: {
			marginBottom: '2.5px',
		},
	},
	modifyRecipeButton: {
		...theme.typography.button,
		marginTop: '25px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},
	},
}));

const RecipeInfoColumn = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	const recipeDetails = {
		name: props.recipeName,
		prepTime: props.prepTime,
		prepTimeUnits: props.prepTimeUnits,
		cookTime: props.cookTime,
		cookTimeUnits: props.cookTimeUnits,
		servings: props.servings,
		difficulty: props.difficulty,
		ingredientArray: props.ingredientArray,
		directionsArray: props.directionsArray,
	};

	return (
		<Grid
			container
			alignItems='center'
			justify='center'
			direction='column'
			className={classes.infoContainer}
		>
			<Grid item className={classes.recipeImageContainer}>
				<Paper className={classes.recipeImage} elevation={3} />
			</Grid>
			<Grid item>
				<Typography
					variant={matchesXS ? 'h4' : 'h3'}
					className={classes.recipeTitle}
				>
					{props.recipeName}
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					variant={matchesXS ? 'body2' : 'body1'}
					className={classes.info}
				>
					Prep Time: {props.prepTime} {props.prepTimeUnits}
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					variant={matchesXS ? 'body2' : 'body1'}
					className={classes.info}
				>
					Cook Time: {props.cookTime} {props.cookTimeUnits}
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					variant={matchesXS ? 'body2' : 'body1'}
					className={classes.info}
				>
					Servings: {props.servings}
				</Typography>
			</Grid>
			<Grid item>
				<Typography
					variant={matchesXS ? 'body2' : 'body1'}
					className={classes.info}
				>
					Difficulty: {props.difficulty}
				</Typography>
			</Grid>
			<Grid item>
				<Button
					className={classes.modifyRecipeButton}
					component={Link}
					to={{
						pathname: '/new-recipe',
						recipeDetails: recipeDetails,
					}}
					onClick={() => props.recipeInit()}
				>
					Modify Recipe
				</Button>
			</Grid>
		</Grid>
	);
};

export default RecipeInfoColumn;
