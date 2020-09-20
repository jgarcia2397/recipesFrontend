import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const styles = {
    root: {
        elevation: 5,
        width: 1000,
        padding: '3px 6px',
        margin: '300px auto',
        display: 'flex'
    },
    searchIconContainer: {
        '&:hover': {
			backgroundColor: 'transparent',
		},
    },
    input: {
        flex: 1
    }
};

// Higher-order component API
class HomePage extends Component {
	render() {
		const { classes } = this.props;
		return (
            <Paper component='form' className={classes.root}>
                <IconButton type='submit' className={classes.searchIconContainer}>
                    <SearchIcon />
                </IconButton>
                <InputBase placeholder='Search users or recipes' className={classes.input} />
            </Paper>
        );
	}
}

HomePage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HomePage);
