import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import RecipeCard from '../../components/UI/RecipeCard';
import { Typography } from '@material-ui/core';

import * as actions from '../../store/actions/index';

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
	newRecipeButtonContainer: {
		margin: '40px auto',
	},
	newRecipeButton: {
		...theme.typography.button,
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
	recipeCardsContainer: {
		margin: '30px auto',
	},
	titleContainer: {
		marginTop: '30px',
		marginLeft: '40px',
		[theme.breakpoints.down('sm')]: {
			marginTop: '30px',
			marginLeft: 0,
			textAlign: 'center',
		},
	},
}));

const RecipePage = props => {
	const classes = useStyles();

	const { tabValue, routes, setTabValue } = props;

	useEffect(() => {
		[...routes].forEach(route => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (tabValue !== route.activeIndex) {
						setTabValue(route.activeIndex);
					}
					break;
				default:
					break;
			}
		});
	}, [tabValue, routes, setTabValue]);

	const dispatch = useDispatch();

	const recipes = useSelector(state => state.createRecipe.recipes);

	const onCreateRecipeInit = () => dispatch(actions.createRecipeInit());

	return (
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<Grid container direction='column'>
					<Grid item className={classes.titleContainer}>
						<Typography variant='h3'>My Recipes</Typography>
					</Grid>
					<Grid item className={classes.newRecipeButtonContainer}>
						<Button
							className={classes.newRecipeButton}
							style={{ maxWidth: '150px', minWidth: '150px' }}
							component={Link}
							to={{
								pathname: '/new-recipe',
								recipeDetails: {}
							}}
							onClick={() => onCreateRecipeInit()}
						>
							New Recipe
						</Button>
					</Grid>
					<Grid item className={classes.recipeCardsContainer}>
						{/* <RecipeCard setTabValue={setTabValue} /> */}
						{recipes.map((recipe, index) => (
							<RecipeCard
								key={index}
								id={index}
								recipeName={recipe.basicDetails.recipeName}
								prepTime={recipe.basicDetails.prepTime}
								cookTime={recipe.basicDetails.cookTime}
								prepTimeUnits={recipe.basicDetails.prepTimeUnits}
								cookTimeUnits={recipe.basicDetails.cookTimeUnits}
								setTabValue={setTabValue}
							/>
						))}
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default RecipePage;
