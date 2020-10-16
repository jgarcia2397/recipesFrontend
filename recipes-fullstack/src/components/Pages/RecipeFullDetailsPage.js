import React, { useEffect } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

import RecipeInfoColumn from '../../components/UI/RecipeInfoColumn';
import RecipeInstructions from '../UI/RecipeInstructions';

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
		'Mix apples with water and sugar',
		'Boil mixture in saucepan until thick',
		'Pour mixture in pie crust',
		'Bake pie for 45 mins',
		'Make crust',
		'Start peeling and slicing apples',
		'Mix apples with water and sugar',
		'Boil mixture in saucepan until thick',
		'Pour mixture in pie crust',
		'Bake pie for 45 mins',
		'Make crust',
		'Start peeling and slicing apples',
		'Mix apples with water and sugar',
		'Boil mixture in saucepan until thick',
		'Pour mixture in pie crust',
		'Bake pie for 45 mins',
		'Make crust',
		'Start peeling and slicing apples',
		'Mix apples with water and sugar',
		'Boil mixture in saucepan until thick',
		'Pour mixture in pie crust',
		'Bake pie for 45 mins',
		'Make crust',
		'Start peeling and slicing apples',
		'Mix apples with water and sugar',
		'Boil mixture in saucepan until thick',
		'Pour mixture in pie crust',
		'Bake pie for 45 mins',
	];

	useEffect(() => {
		[...props.routes].forEach(route => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (props.tabValue !== route.activeIndex) {
						props.setTabValue(route.activeIndex);
					}
					break;
				default:
					break;
			}
		});
	}, [props.tabValue, props.routes]);

	return (
		<Grid
			container
			direction={matchesMD ? 'column' : 'row'}
			className={classes.root}
		>
			<Grid item className={classes.infoColumn}>
				<RecipeInfoColumn />
			</Grid>
			<Grid item className={classes.divider}>
				<Divider orientation={matchesMD ? 'horizontal' : 'vertical'} />
			</Grid>
			<RecipeInstructions
				ingredientArray={ingredients}
				directionsArray={directions}
			/>
		</Grid>
	);
};

export default RecipeFullDetailsPage;
