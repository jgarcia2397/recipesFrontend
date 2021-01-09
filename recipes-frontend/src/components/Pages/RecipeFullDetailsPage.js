import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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

	const dispatch = useDispatch();

	const recipes = useSelector(state => state.createRecipe.recipes);

	const onUpdateRecipeInit = (id, oldRecipeObj) => {
		localStorage.setItem('recipeDetails', JSON.stringify({ ...oldRecipeObj }));
		dispatch(actions.updateRecipeInit(id));
	};

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

	let storedCardId;
	if (props.location.id == null) {
		storedCardId = JSON.parse(localStorage.getItem('cardId'));
	} else {
		storedCardId = props.location.id.cardId;
	}

	return (
		<Grid
			container
			direction={matchesMD ? 'column' : 'row'}
			className={classes.root}
		>
			<Grid item className={classes.infoColumn}>
				{/* Can probably clean up the props passed here. Instead only pass recipes and props.location.id.cardId ??? */}
				<RecipeInfoColumn
					recipeInit={onUpdateRecipeInit}
					recipeId={storedCardId}
					recipeName={recipes[storedCardId].basicDetails.recipeName}
					prepTime={recipes[storedCardId].basicDetails.prepTime}
					cookTime={recipes[storedCardId].basicDetails.cookTime}
					prepTimeUnits={recipes[storedCardId].basicDetails.prepTimeUnits}
					cookTimeUnits={recipes[storedCardId].basicDetails.cookTimeUnits}
					servings={recipes[storedCardId].basicDetails.servings}
					difficulty={recipes[storedCardId].basicDetails.difficulty}
					ingredientArray={recipes[storedCardId].ingredients}
					directionsArray={recipes[storedCardId].directions}
					image={recipes[storedCardId].image}
				/>
			</Grid>
			<Grid item className={classes.divider}>
				<Divider orientation={matchesMD ? 'horizontal' : 'vertical'} />
			</Grid>
			<RecipeInstructions
				ingredientArray={recipes[storedCardId].ingredients}
				directionsArray={recipes[storedCardId].directions}
			/>
		</Grid>
	);
};

export default RecipeFullDetailsPage;
