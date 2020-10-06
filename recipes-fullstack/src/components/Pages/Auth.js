import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	root: {
		height: '95vh',
	},
	background: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',
		width: '100%',
	},
	loginContainer: {
		height: '40%',
		width: '40%',
		position: 'fixed',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		margin: 'auto',
		backgroundColor: '#fff',
		border: `4px solid ${theme.palette.secondary.light}`,
	},
	title: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	input: {
		marginTop: '50px',
	},
	loginButton: {
		...theme.typography.button,
		marginTop: '80px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
}));

const Auth = props => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Paper square className={classes.background}>
				<Paper elevation={4} className={classes.loginContainer}>
					<Grid container direction='column' alignItems='center'>
						<Grid item>
							<Typography variant='h3' className={classes.title}>
								Login
							</Typography>
						</Grid>
						<Grid item className={classes.input}>
							<TextField id='email' label='Email' variant='outlined' />
						</Grid>
						<Grid item className={classes.input}>
							<TextField id='password' label='Password' variant='outlined' />
						</Grid>
						<Grid item>
							<Button
								className={classes.loginButton}
								style={{ maxWidth: '140px', minWidth: '140px' }}
							>
								Login
							</Button>
						</Grid>
					</Grid>
				</Paper>
			</Paper>
		</div>
	);
};

export default Auth;