import React, { useEffect, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import RecipeCard from '../../components/UI/RecipeCard';

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

	const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);

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

	const recipes = useSelector(state => state.createRecipe.recipes);
	const isLoading = useSelector(state => state.createRecipe.loading);
	const error = useSelector(state => state.createRecipe.error);

	useEffect(() => {
		if (error !== null) {
			setIsSnackBarOpen(true);
		}
	}, [error]);

	const dispatch = useDispatch();

	const userId = useParams().userId;

	const onCreateRecipeInit = () => dispatch(actions.createRecipeInit());

	const onDeleteRecipeInit = () => dispatch(actions.deleteRecipeInit());

	const onGetAllUserRecipes = useCallback(
		uid => dispatch(actions.getAllUserRecipes(uid)),
		[dispatch]
	);

	const onClearIsTabsDeselect = useCallback(
		() => dispatch(actions.clearIsTabsDeselect()),
		[dispatch]
	);

	useEffect(() => {
		onGetAllUserRecipes(userId);
	}, [onGetAllUserRecipes, userId]);

	useEffect(() => {
		onClearIsTabsDeselect();
	}, [onClearIsTabsDeselect]);

	const handleSnackbarClose = () => {
		setIsSnackBarOpen(false);
	};

	let recipeList;
	if (recipes.length > 0) {
		recipeList = !isLoading ? (
			recipes.map((recipe, index) => (
				<RecipeCard
					key={index}
					id={index}
					recipeId={recipe.id}
					image={recipe.image}
					recipeName={recipe.basicDetails.recipeName}
					prepTime={recipe.basicDetails.prepTime}
					cookTime={recipe.basicDetails.cookTime}
					prepTimeUnits={recipe.basicDetails.prepTimeUnits}
					cookTimeUnits={recipe.basicDetails.cookTimeUnits}
					setTabValue={setTabValue}
					deleteRecipeInit={onDeleteRecipeInit}
				/>
			))
		) : (
			<CircularProgress color='secondary' size={75} thickness={4.5} />
		);
	} else {
		recipeList = (
			<Typography variant='h4'>
				You have no recipes, try adding some!
			</Typography>
		);
	}

	const snackbar = (
		<Snackbar
			open={isSnackbarOpen}
			autoHideDuration={5000}
			onClose={handleSnackbarClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert severity='error' variant='filled' elevation={5}>
				{error}
			</Alert>
		</Snackbar>
	);

	return (
		<div className={classes.root}>
			{snackbar}
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
								recipeDetails: {},
							}}
							onClick={() => onCreateRecipeInit()}
						>
							New Recipe
						</Button>
					</Grid>
					<Grid item className={classes.recipeCardsContainer}>
						{recipeList}
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default RecipePage;
