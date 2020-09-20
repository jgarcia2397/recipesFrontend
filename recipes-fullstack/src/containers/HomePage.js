import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SearchBar from '../components/UI/SearchBar';
import cooking from '../assets/cooking.jpg';

const styles = {
	paperContainer: {
		backgroundImage: `url(${cooking})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
        padding: '600px',
	},
};

// Higher-order component API
class HomePage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<Paper className={classes.paperContainer}>
				<SearchBar />
			</Paper>
		);
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
