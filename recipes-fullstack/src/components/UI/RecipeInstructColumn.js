import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import RecipeList from './RecipeList';

const useStyles = makeStyles(theme => ({
	titles: {
        marginTop: '35px',
        marginLeft: '15px',
        fontWeight: 'bold',
        [theme.breakpoints.down('xs')]: {
            marginTop: '15px',
        },
    },
    addButtonContainer: {
        marginTop: '15px',
        width: '100%',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            marginTop: '5px',
        },
    },
}));

const RecipeInstructColumn = props => {
    const classes = useStyles();
    const theme = useTheme();

    const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<React.Fragment>
			<Typography variant={matchesXS ? 'h5' : 'h4'} className={classes.titles}>
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
