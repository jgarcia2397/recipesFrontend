import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
	root: {
        height: '95vh',
        display: 'flex',
	},
	background: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',
        width: '100%',
        overflow: 'auto'
	},
});

class RecipePage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				<Paper className={classes.background} square></Paper>
			</div>
		);
	}
}

RecipePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipePage);
