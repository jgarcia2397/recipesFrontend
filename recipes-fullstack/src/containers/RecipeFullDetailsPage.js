import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

import RecipeInfoColumn from '../components/UI/RecipeInfoColumn';
import RecipeList from '../components/UI/RecipeList';

const styles = theme => ({
	root: {
		height: '95vh',
	},
	infoColumn: {
		width: '25vw',
		height: '100%',
		backgroundColor: theme.palette.primary.light,
	},
	instructColoumn: {
		width: '37.44vw',
		height: '100%',
		backgroundColor: theme.palette.secondary.light,
	},
	divider: {
		backgroundColor: theme.divider.main,
	},
	titles: {
		marginTop: '35px',
		marginLeft: '15px',
		fontWeight: 'bold',
	},
});

class RecipeFullDetailsPage extends Component {
	render() {
		const { classes } = this.props;

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
		];

		return (
			<Grid container direction='row' className={classes.root}>
				<Grid item className={classes.infoColumn}>
					<RecipeInfoColumn />
				</Grid>
				<Divider orientation='vertical' classes={{ root: classes.divider }} />
				<Grid item className={classes.instructColoumn}>
					<Typography variant='h4' className={classes.titles}>
						Ingredients
					</Typography>
					<RecipeList array={ingredients} />
				</Grid>
				<Divider orientation='vertical' classes={{ root: classes.divider }} />
				<Grid item className={classes.instructColoumn}>
					<Typography variant='h4' className={classes.titles}>
						Directions
					</Typography>
                    <RecipeList array={directions} />
				</Grid>
			</Grid>
		);
	}
}

RecipeFullDetailsPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeFullDetailsPage);
