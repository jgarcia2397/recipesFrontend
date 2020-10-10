import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import UserProfile from '../UI/UserProfile';
import RecipeCard from '../UI/RecipeCard';

const useStyles = makeStyles(theme => ({
	root: {
		height: '95vh',
		display: 'flex',
	},
	background: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',
		width: '100%',
		overflow: 'auto',
	},
	profileDetailsContainer: {
		marginTop: '40px',
	},
	profileHeadings: {
		paddingLeft: '550px',
		paddingRight: '550px',
		paddingBottom: '25px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '320px',
			paddingRight: '320px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '200px',
			paddingRight: '200px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '90px',
			paddingRight: '90px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '30px',
			paddingRight: '30px',
		},
	},
	profileText: {
		paddingLeft: '550px',
		paddingRight: '550px',
		paddingBottom: '75px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '320px',
			paddingRight: '320px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '200px',
			paddingRight: '200px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '90px',
			paddingRight: '90px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '30px',
			paddingRight: '30px',
		},
	},
	recipeCardsContainer: {
		margin: '30px auto',
	},
}));

const ProfilePage = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));

	return (
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<UserProfile />
				<Grid
					container
					direction='column'
					className={classes.profileDetailsContainer}
				>
					<Grid item className={classes.profileHeadings}>
						<Typography
							variant='h4'
							style={{ fontWeight: 'bold' }}
							align={matchesSM ? 'center' : ''}
						>
							About Me
						</Typography>
					</Grid>
					<Grid item className={classes.profileText}>
						<Typography variant='body1' align={matchesSM ? 'center' : ''}>
							My name's Cheffff... Just kidding, my real name is up top! I love
							to cook and Gordon Ramsey is my hero! I wanna be like him someday,
							but I'm not a great chef like him. I can make some decent
							scrambled eggs though!
						</Typography>
					</Grid>
					<Grid item className={classes.profileHeadings}>
						<Typography
							variant='h4'
							style={{ fontWeight: 'bold' }}
							align={matchesSM ? 'center' : ''}
						>
							Favourite Things to Cook
						</Typography>
					</Grid>
					<Grid item className={classes.profileText}>
						<Typography variant='body1' align={matchesSM ? 'center' : ''}>
							I like to make Idiot Sandwiches and Gordon's famous Lamb Sauce.
						</Typography>
					</Grid>
					<Grid item className={classes.profileHeadings}>
						<Typography
							variant='h4'
							style={{ fontWeight: 'bold' }}
							align={matchesSM ? 'center' : ''}
						>
							Recipe Preview
						</Typography>
					</Grid>
					<Grid item className={classes.recipeCardsContainer}>
						<RecipeCard />
						<RecipeCard />
						<RecipeCard />
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default ProfilePage;
