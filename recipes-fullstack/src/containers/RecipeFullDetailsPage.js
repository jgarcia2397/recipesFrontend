import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
	
});

class RecipeFullDetailsPage extends Component {
    render() {
        return (
            <div>This is the RecipeFullDetailsPage</div>
        );
    }
};

RecipeFullDetailsPage.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RecipeFullDetailsPage);
