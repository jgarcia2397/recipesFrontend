import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import RecipeList from './RecipeList';

const useStyles = makeStyles(theme => ({
	titles: {
        marginTop: '35px',
        marginLeft: '15px',
        fontWeight: 'bold',
    },
    addButtonContainer: {
        marginTop: '15px',
        width: '100%',
        textAlign: 'center',
    },
}));

const RecipeInstructColumn = props => {
    const classes = useStyles();

	return (
		<React.Fragment>
			<Typography variant='h4' className={classes.titles}>
				{props.label}
			</Typography>
			<RecipeList array={props.array} />
			<div className={classes.addButtonContainer}>
				<Button>
					<AddCircleOutlinedIcon />
				</Button>
			</div>
		</React.Fragment>
	);
};

export default RecipeInstructColumn;
