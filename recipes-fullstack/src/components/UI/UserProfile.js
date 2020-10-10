import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import profile from '../../assets/blankProfile.png';

const useStyles = makeStyles(theme => ({
	profilePic: {
		backgroundImage: `url(${profile})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		borderRadius: 120,
		height: '225px',
		width: '225px',
		[theme.breakpoints.down('sm')]: {
			height: '195px',
			width: '195px',
		},
	},
	profileContainer: {
		marginTop: '100px',
	},
	profileTitlesContainer: {
		marginLeft: '55px',
		height: '100%',
		[theme.breakpoints.down('xs')]: {
			marginLeft: '0px',
			marginTop: '35px',
		},
	},
}));

const UserProfile = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Grid
			container
			direction={matchesXS ? 'column' : 'row'}
			justify='center'
			alignItems='center'
			className={classes.profileContainer}
		>
			<Grid item>
				<Paper className={classes.profilePic} elevation={3} />
			</Grid>
			<Grid item>
				<Grid
					container
					direction='column'
					justify='center'
					className={classes.profileTitlesContainer}
				>
					<Grid item>
						<Typography variant='h3' align={matchesXS ? 'center' : ''}>
							Joshua Garcia
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant='h4' align={matchesXS ? 'center' : ''}>
							Master Chef
						</Typography>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default UserProfile;
