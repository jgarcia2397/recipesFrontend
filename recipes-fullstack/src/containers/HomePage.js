import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SearchBar from '../components/UI/SearchBar';
import ViewPageLinks from '../components/UI/ViewPageLinks';
import cooking from '../assets/cooking.jpg';

const styles = theme => ({
	paperContainer: {
		backgroundImage: `url(${cooking})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		paddingLeft: '400px',
		paddingRight: '400px',
		paddingTop: '600px',
		paddingBottom: '600px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '250px',
			paddingRight: '250px',
			paddingTop: '500px',
			paddingBottom: '500px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '150px',
			paddingRight: '150px',
			paddingTop: '400px',
			paddingBottom: '400px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '300px',
			paddingBottom: '300px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '250px',
			paddingBottom: '250px',
		},
	},
});

// Higher-order component API
class HomePage extends Component {
	render() {
		const { classes } = this.props;
		return (
			<React.Fragment>
				<Paper className={classes.paperContainer}>
					<SearchBar />
				</Paper>
				<ViewPageLinks />
			</React.Fragment>
		);
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
