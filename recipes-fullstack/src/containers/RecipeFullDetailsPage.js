import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';

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
    }
});

class RecipeFullDetailsPage extends Component {
	render() {

        const { classes } = this.props;

		return (
            <Grid container direction='row' className={classes.root}>
                <Grid item className={classes.infoColumn}>
                    Hello
                </Grid>
                <Divider orientation="vertical" classes={{root: classes.divider}} />
                <Grid item className={classes.instructColoumn}>
                    My name
                </Grid>
                <Divider orientation="vertical" classes={{root: classes.divider}} />
                <Grid item className={classes.instructColoumn}>
                    Jeff
                </Grid>
            </Grid>
        );
	}
}

RecipeFullDetailsPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeFullDetailsPage);
