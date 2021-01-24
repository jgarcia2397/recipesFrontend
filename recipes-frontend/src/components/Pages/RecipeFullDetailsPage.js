import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import RecipeInfoColumn from '../../components/UI/RecipeInfoColumn';
import RecipeInstructions from '../UI/RecipeInstructions';

import * as actions from '../../store/actions/index';

const useStyles = makeStyles(theme => ({
	root: {
		height: '95vh',
		width: '100vw',
		[theme.breakpoints.down('md')]: {
			height: '150vh',
		},
	},
	infoColumn: {
		width: '25.2%',
		height: '100%',
		backgroundColor: theme.palette.primary.light,
		[theme.breakpoints.down('md')]: {
			width: '100%',
			height: '33.4%',
		},
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

const RecipeFullDetailsPage = props => {
	const classes = useStyles();
	const theme = useTheme();
	const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

	const [alert, setAlert] = useState({ open: false, message: '' });
	const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);

	const recipeId = useParams().rid;

	const dispatch = useDispatch();

	const isLoading = useSelector(state => state.createRecipe.loading);
	const isRecipeDeleted = useSelector(
		state => state.createRecipe.recipeDeleted
	);
	const userId = useSelector(state => state.user.userId);
	const token = useSelector(state => state.user.token);
	const error = useSelector(state => state.createRecipe.error);
	const currentRecipe = useSelector(state => state.createRecipe.currentRecipe);

	const onUpdateRecipeInit = (id, oldRecipeObj) => {
		localStorage.setItem('recipeDetails', JSON.stringify({ ...oldRecipeObj }));
		dispatch(actions.updateRecipeInit(id));
	};

	const onDeleteRecipe = (id, token) =>
		dispatch(actions.deleteRecipe(id, token));

	const onGetRecipeByRecipeId = useCallback(
		rid => dispatch(actions.getRecipeByRecipeId(rid)),
		[dispatch]
	);

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

	useEffect(() => {
		props.setTabValue(false);
	}, [setTabValue]);

	useEffect(() => {
		if (error !== null) {
			setIsSnackBarOpen(true);
		}
	}, [error]);

	useEffect(() => {
		onGetRecipeByRecipeId(recipeId);
	}, [onGetRecipeByRecipeId, recipeId]);

	let storedCardId;
	if (props.location.id == null) {
		storedCardId = JSON.parse(localStorage.getItem('cardId'));
	} else {
		storedCardId = props.location.id.cardId;
	}

	const handleAlertClose = () => {
		setAlert({ ...alert, open: false });
	};

	const handleSnackbarClose = () => {
		setIsSnackBarOpen(false);
	};

	let snackbar;
	if (error) {
		snackbar = (
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
	} else if (alert.message) {
		snackbar = (
			<Snackbar
				open={alert.open}
				autoHideDuration={5000}
				onClose={handleAlertClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert severity='error' variant='filled' elevation={5}>
					{alert.message}
				</Alert>
			</Snackbar>
		);
	}

	const deleteRecipeRedirect = isRecipeDeleted ? (
		<Redirect to={`/recipes/${userId}`} />
	) : null;

	let recipe;
	if (Object.keys(currentRecipe).length === 0) {
		recipe = JSON.parse(localStorage.getItem('currentRecipe'));
	} else {
		recipe = currentRecipe;
	}

	return (
		<Grid
			container
			direction={matchesMD ? 'column' : 'row'}
			className={classes.root}
		>
			{deleteRecipeRedirect}
			{snackbar}
			<Grid item className={classes.infoColumn}>
				{/* Can probably clean up the props passed here. Instead only pass recipes and props.location.id.cardId ??? */}
				<RecipeInfoColumn
					recipeInit={onUpdateRecipeInit}
					recipeIndex={storedCardId}
					userId={userId}
					creatorId={recipe.creator}
					recipeId={recipe.id}
					recipeName={recipe.basicDetails.recipeName}
					prepTime={recipe.basicDetails.prepTime}
					cookTime={recipe.basicDetails.cookTime}
					prepTimeUnits={recipe.basicDetails.prepTimeUnits}
					cookTimeUnits={recipe.basicDetails.cookTimeUnits}
					servings={recipe.basicDetails.servings}
					difficulty={recipe.basicDetails.difficulty}
					ingredientArray={recipe.ingredients}
					directionsArray={recipe.directions}
					image={recipe.image}
					isLoading={isLoading}
					token={token}
					deleteRecipe={onDeleteRecipe}
				/>
			</Grid>
			<Grid item className={classes.divider}>
				<Divider orientation={matchesMD ? 'horizontal' : 'vertical'} />
			</Grid>
			<RecipeInstructions
				ingredientArray={recipe.ingredients}
				directionsArray={recipe.directions}
			/>
		</Grid>
	);
};

export default RecipeFullDetailsPage;
