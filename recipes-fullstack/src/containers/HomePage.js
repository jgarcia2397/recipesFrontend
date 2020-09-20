import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import SearchBar from '../components/UI/SearchBar';

const styles = {
    
};

// Higher-order component API
class HomePage extends Component {
	render() {
		const { classes } = this.props;
		return (
            <SearchBar />
        );
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
