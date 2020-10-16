import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import RecipeCard from '../../components/UI/RecipeCard';
import { Typography } from '@material-ui/core';

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

	const routes = [
		{ name: 'Home', link: '/', activeIndex: 0 },
		{ name: 'My Recipes', link: '/recipes', activeIndex: 1 },
		{ name: 'My Profile', link: '/profile', activeIndex: 2 },
		{ name: 'Log In/Out', link: '/auth', activeIndex: 3 },
		// { name: 'New Recipe', link: '/new-recipe', activeIndex: -1 },
		// { name: 'Full Recipe Details', link: '/recipe-full-details', activeIndex: -1 },
	];

	useEffect(() => {
		[...routes].forEach(route => {
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
	}, [props.tabValue, routes]);

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
							to='/new-recipe'
							onClick={() => props.setTabValue(-1)}
						>
							New Recipe
						</Button>
					</Grid>
					<Grid item className={classes.recipeCardsContainer}>
						<RecipeCard setTabValue={props.setTabValue} />
						<RecipeCard setTabValue={props.setTabValue} />
						<RecipeCard setTabValue={props.setTabValue} />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default RecipePage;
