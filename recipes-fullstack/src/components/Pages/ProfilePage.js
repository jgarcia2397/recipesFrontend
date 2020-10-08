import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import profile from '../../assets/blankProfile.png';

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
	profilePic: {
		backgroundImage: `url(${profile})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		borderRadius: 120,
		height: '225px',
		width: '225px',
	},
	profileContainer: {
		marginTop: '100px',
	},
	profileTitlesContainer: {
		marginLeft: '55px',
		height: '100%',
	},
}));

const ProfilePage = props => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<Grid
					container
					direction='row'
					justify='center'
					className={classes.profileContainer}
				>
					<Grid item>
						<Paper className={classes.profilePic} />
					</Grid>
					<Grid item>
						<Grid
							container
							direction='column'
							justify='center'
							className={classes.profileTitlesContainer}
						>
							<Grid item>
								<Typography variant='h3'>Joshua Garcia</Typography>
							</Grid>
							<Grid item>
								<Typography variant='h4'>Master Chef</Typography>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default ProfilePage;
