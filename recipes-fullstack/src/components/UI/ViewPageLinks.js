import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
	cardsContainer: {
		backgroundColor: theme.palette.primary.light,
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
	root: {
		// minWidth: 250,
		width: '50%',
	},
	viewButton: {
		width: '15%',
		textTransform: 'none',
		padding: 0,
	},
}));

const ViewPageLinks = () => {
	const classes = useStyles();

	return (
		<Grid container direction='row' className={classes.cardsContainer}>
			<Grid item className={classes.root}>
				<Grid container direction='column'>
					<Typography variant='h4'>My Recipes</Typography>
					<Typography variant='body1'>
						View your recipes and add to your menu!
					</Typography>
					<Button variant='outlined' className={classes.viewButton}>
						View Recipes
					</Button>
				</Grid>
			</Grid>
			<Grid item className={classes.root} style={{ textAlign: 'right' }}>
				<Grid container direction='column' alignItems='flex-end'>
					<Typography variant='h4'>My Profile</Typography>
					<Typography variant='body1'>
						Update your profile for others to see!
					</Typography>
					<Button variant='outlined' className={classes.viewButton}>
						View Profile
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ViewPageLinks;
