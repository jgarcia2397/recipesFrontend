import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import applePie from '../../assets/applePie.jpg';

const useStyles = makeStyles(theme => ({
	infoContainer: {
		width: '100%',
		height: '100%',
    },
    recipeImageContainer: {
		marginBottom: '75px',
		height: '20%',
		width: '70%',
	},
	recipeImage: {
		backgroundImage: `url(${applePie})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		width: '100%',
		height: '100%',
    },
    recipeTitle: {
		marginBottom: '25px',
	},
	info: {
		marginBottom: '15px',
    },
    modifyRecipeButton: {
        ...theme.typography.button,
        marginTop: '25px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
}));

const RecipeInfoColumn = props => {
    const classes = useStyles();

	return (
		<Grid
			container
			alignItems='center'
			justify='center'
			direction='column'
			className={classes.infoContainer}
		>
			<Grid item className={classes.recipeImageContainer}>
				<Paper className={classes.recipeImage} />
			</Grid>
			<Grid item>
				<Typography variant='h3' className={classes.recipeTitle}>
					Apple Pie
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body1' className={classes.info}>
					Prep Time: 20 mins
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body1' className={classes.info}>
					Cook Time: 1 hr
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body1' className={classes.info}>
					Total Time: 1 hr 20 mins
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body1' className={classes.info}>
					Servings: 10
				</Typography>
			</Grid>
			<Grid item>
				<Typography variant='body1' className={classes.info}>
					Difficulty: Medium
				</Typography>
			</Grid>
			<Grid item>
				<Button className={classes.modifyRecipeButton}>Modify Recipe</Button>
			</Grid>
		</Grid>
	);
};

export default RecipeInfoColumn;
