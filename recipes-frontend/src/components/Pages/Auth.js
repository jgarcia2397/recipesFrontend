import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { updateObject } from '../../shared/utility';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import * as actions from '../../store/actions/index';

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
		// height: '500px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: '700px',
		position: 'fixed',
		top: '0',
		bottom: '0',
		left: '0',
		right: '0',
		margin: 'auto',
		backgroundColor: '#fff',
		border: `4px solid ${theme.palette.secondary.light}`,
		[theme.breakpoints.down('lg')]: {
			height: '450px',
			width: '600px',
		},
		[theme.breakpoints.down('md')]: {
			height: '350px',
			width: '500px',
		},
		[theme.breakpoints.down('xs')]: {
			width: '275px',
		},
	},
	title: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	inputContainer: {
		marginTop: '40px',
		[theme.breakpoints.down('md')]: {
			marginTop: '25px',
		},
	},
	input: {
		width: '11.5vw',
		minWidth: '250px',
	},
	loginButton: {
		...theme.typography.button,
		marginTop: '40px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
		[theme.breakpoints.down('md')]: {
			marginTop: '45px',
		},
	},
	switchAuthModeButton: {
		...theme.typography.button,
		marginTop: '10px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
		[theme.breakpoints.down('md')]: {
			marginTop: '45px',
		},
	},
}));

const Auth = props => {
	const classes = useStyles();

	const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);
	const [authForm, setAuthForm] = useState({
		name: {
			elementType: 'input',
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		email: {
			elementType: 'input',
			value: '',
			validation: {
				required: true,
				isEmail: true,
			},
			valid: false,
			touched: false,
		},
		password: {
			elementType: 'input',
			value: '',
			validation: {
				required: true,
				minLength: 8,
			},
			valid: false,
			touched: false,
		},
		isSignUp: true,
	});

	const isLoading = useSelector(state => state.user.loading);
	const authError = useSelector(state => state.user.error);
	const token = useSelector(state => state.user.token);
	const isLoggedIn = !!token;

	const dispatch = useDispatch();

	const onAuthLogin = (email, password) =>
		dispatch(actions.authLogin(email, password));

	const onAuthSignup = (name, email, password) =>
		dispatch(actions.authSignup(name, email, password));

	const onClearIsTabsDeselect = () => dispatch(actions.clearIsTabsDeselect());

	const { tabValue, routes, setTabValue } = props;

	useEffect(() => {
		[...routes].forEach(route => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (tabValue !== route.activeIndex) {
						setTabValue(route.activeIndex);
					}
					break;
				default:
					break;
			}
		});
	}, [tabValue, routes, setTabValue]);

	useEffect(() => {
		if (authError !== null) {
			setIsSnackBarOpen(true);
		}
	}, [authError]);

	useEffect(() => {
		onClearIsTabsDeselect();
	}, []);

	const switchAuthModeHandler = () => {
		const updatedAuthForm = updateObject(authForm, {
			isSignUp: !authForm.isSignUp,
		});

		setAuthForm(updatedAuthForm);
	};

	const inputChangedHandler = (event, inputId) => {
		const updatedFormElement = updateObject(authForm[inputId], {
			value: event.target.value,
			touched: true,
		});

		const updatedAuthForm = updateObject(authForm, {
			[inputId]: updatedFormElement,
		});

		setAuthForm(updatedAuthForm);
		console.log(authForm);
	};

	const authSubmitHandler = event => {
		event.preventDefault();

		if (authForm.isSignUp) {
			onAuthSignup(
				authForm.name.value,
				authForm.email.value,
				authForm.password.value
			);
		} else {
			onAuthLogin(authForm.email.value, authForm.password.value);
		}
	};

	const handleSnackbarClose = () => {
		setIsSnackBarOpen(false);
	};

	const form = (
		<React.Fragment>
			{authForm.isSignUp ? (
				<Grid item className={classes.inputContainer}>
					<TextField
						id='name'
						label='Name'
						variant='outlined'
						className={classes.input}
						onChange={event => inputChangedHandler(event, 'name')}
					/>
				</Grid>
			) : null}
			<Grid item className={classes.inputContainer}>
				<TextField
					id='email'
					label='Email'
					variant='outlined'
					className={classes.input}
					onChange={event => inputChangedHandler(event, 'email')}
				/>
			</Grid>
			<Grid item className={classes.inputContainer}>
				<TextField
					id='password'
					label='Password'
					variant='outlined'
					type='password'
					className={classes.input}
					onChange={event => inputChangedHandler(event, 'password')}
				/>
			</Grid>
			<Grid item>
				<Button
					className={classes.loginButton}
					style={{ maxWidth: '140px', minWidth: '140px' }}
					onClick={authSubmitHandler}
				>
					{authForm.isSignUp ? 'Sign Up' : 'Login'}
				</Button>
			</Grid>
			<Grid item>
				<Button
					className={classes.switchAuthModeButton}
					style={{ maxWidth: '180px', minWidth: '180px' }}
					onClick={switchAuthModeHandler}
				>
					Switch to {authForm.isSignUp ? 'Login' : 'Sign Up'}
				</Button>
			</Grid>
		</React.Fragment>
	);

	const snackbar = (
		<Snackbar
			open={isSnackbarOpen}
			autoHideDuration={5000}
			onClose={handleSnackbarClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert severity='error' variant='filled' elevation={5}>
				{authError}
			</Alert>
		</Snackbar>
	);

	const circularProgress = (
		<div>
			<CircularProgress color='secondary' size={75} thickness={4.5} />+
		</div>
	);

	const authRedirect = isLoggedIn ? (
		<Redirect to='/' />
	) : null;

	return (
		<div className={classes.root}>
			{authRedirect}
			{snackbar}
			<Paper square className={classes.background}>
				<Paper
					elevation={4}
					className={classes.loginContainer}
					style={{ height: authForm.isSignUp ? '575px' : '500px' }}
				>
					<Grid container direction='column' alignItems='center'>
						{!isLoading ? (
							<Grid item>
								<Typography variant='h3' className={classes.title}>
									Login
								</Typography>
							</Grid>
						) : null}
						{isLoading ? circularProgress : form}
					</Grid>
				</Paper>
			</Paper>
		</div>
	);
};

export default Auth;
