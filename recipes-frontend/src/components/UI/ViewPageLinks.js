import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
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
			paddingTop: '300px',
			paddingBottom: '300px',
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
		width: '50%',
	},
	rootSM: {
		width: '100%',
	},
	viewButton: {
		...theme.typography.button,
		borderRadius: 20,
		padding: 0,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
}));

const ViewPageLinks = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<Grid
			container
			direction={matchesSM ? 'column' : 'row'}
			alignItems={matchesSM ? 'center' : 'flex-start'}
			className={classes.cardsContainer}
		>
			<Grid item className={matchesSM ? classes.rootSM : classes.root}>
				<Grid
					container
					direction='column'
					alignItems={matchesSM ? 'center' : 'flex-start'}
					justify='space-between'
					style={{ marginBottom: matchesSM ? '35px' : 0 }}
				>
					<Typography variant='h4' style={{ marginBottom: '6px' }}>
						My Recipes
					</Typography>
					<Typography variant='body1' style={{ marginBottom: '3px' }}>
						View your recipes and add to your menu!
					</Typography>
					<Button
						variant='outlined'
						className={classes.viewButton}
						component={Link}
						to={`/recipes/${props.userId}`}
						style={{ maxWidth: '120px', minWidth: '120px' }}
						onClick={() => props.setTabValue(1)} // /recipes is activeIndex = 1
					>
						View Recipes
					</Button>
				</Grid>
			</Grid>
			<Grid item className={matchesSM ? classes.rootSM : classes.root}>
				<Grid
					container
					direction='column'
					alignItems={matchesSM ? 'center' : 'flex-end'}
				>
					<Typography variant='h4' style={{ marginBottom: '6px' }}>
						My Profile
					</Typography>
					<Typography variant='body1' style={{ marginBottom: '3px' }}>
						Update your profile for others to see!
					</Typography>
					<Button
						variant='outlined'
						className={classes.viewButton}
						component={Link}
						to={`/profile/${props.userId}`}
						style={{ maxWidth: '120px', minWidth: '120px' }}
						onClick={() => props.setTabValue(2)} // /profile is activeIndex = 2
					>
						View Profile
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ViewPageLinks;
