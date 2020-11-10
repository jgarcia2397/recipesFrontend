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

	const onUpdateRecipeInit = (id) => dispatch(actions.updateRecipeInit(id));

	const {tabValue, routes, setTabValue} = props;

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
					recipeId={props.location.id.cardId}
					recipeName={recipes[props.location.id.cardId].basicDetails.recipeName}
					prepTime={recipes[props.location.id.cardId].basicDetails.prepTime}
					cookTime={recipes[props.location.id.cardId].basicDetails.cookTime}
					prepTimeUnits={recipes[props.location.id.cardId].basicDetails.prepTimeUnits}
					cookTimeUnits={recipes[props.location.id.cardId].basicDetails.cookTimeUnits}
					servings={recipes[props.location.id.cardId].basicDetails.servings}
					difficulty={recipes[props.location.id.cardId].basicDetails.difficulty}
					ingredientArray={recipes[props.location.id.cardId].ingredients}
					directionsArray={recipes[props.location.id.cardId].directions}
				/>
			</Grid>
			<Grid item className={classes.divider}>
				<Divider orientation={matchesMD ? 'horizontal' : 'vertical'} />
			</Grid>
			<RecipeInstructions
				ingredientArray={recipes[props.location.id.cardId].ingredients}
				directionsArray={recipes[props.location.id.cardId].directions}
			/>
		</Grid>
	);
};

export default RecipeFullDetailsPage;
