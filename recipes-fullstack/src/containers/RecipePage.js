import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme => ({
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
		color: 'white',
		backgroundColor: theme.palette.secondary.main,
		borderRadius: 50,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
});

class RecipePage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.background} square>
					<Grid container direction='column'>
						<Grid item className={classes.newRecipeButtonContainer}>
							<Button
								className={classes.newRecipeButton}
								style={{ maxWidth: '150px', minWidth: '150px' }}
							>
								New Recipe
							</Button>
						</Grid>
						<Grid item></Grid>
					</Grid>
				</Paper>
			</div>
		);
	}
}

RecipePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipePage);
