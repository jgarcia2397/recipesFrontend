import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import SearchBar from '../UI/SearchBar';
import ViewPageLinks from '../UI/ViewPageLinks';

import cooking from '../../assets/cooking.jpg';

import * as actions from '../../store/actions/index';
import { formatNameHelper } from '../../shared/utility';

const useStyles = makeStyles(theme => ({
	paperContainer: {
		backgroundImage: `url(${cooking})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		paddingLeft: '400px',
		paddingRight: '400px',
		paddingTop: '600px',
		paddingBottom: '600px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '250px',
			paddingRight: '250px',
			paddingTop: '250px',
			paddingBottom: '250px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '150px',
			paddingRight: '150px',
			paddingTop: '550px',
			paddingBottom: '700px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '400px',
			paddingBottom: '515px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '50px',
			paddingRight: '50px',
			paddingTop: '250px',
			paddingBottom: '300px',
		},
	},
}));

const HomePage = props => {
	const classes = useStyles();

	const [searchValue, setSearchValue] = useState('');
	const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);

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

	const userId = useSelector(state => state.user.userId);
	const searchedUserId = useSelector(state => state.user.searchedUserId);
	const error = useSelector(state => state.user.error);

	useEffect(() => {
		if (error !== null) {
			setIsSnackBarOpen(true);
		}
	}, [error]);

	const dispatch = useDispatch();

	const onClearIsTabsDeselect = useCallback(
		() => dispatch(actions.clearIsTabsDeselect()),
		[dispatch]
	);

	const onGetOtherUserId = useCallback(
		fullName => dispatch(actions.getOtherUserId(fullName)),
		[dispatch]
	);

	const searchValueChangeHandler = event => {
		setSearchValue(event.target.value);
		console.log(searchValue);
	};

	const onUserSearchSubmit = (event, searchValue) => {
		event.preventDefault();
		
		const formattedSearchVal = formatNameHelper(searchValue);
		onGetOtherUserId(formattedSearchVal);
	};

	const keyPressHandler = event => {
		// 'Enter' key press
		if (event.key === 'Enter') {
			console.log('Enter key pressed!');
			onUserSearchSubmit(event, searchValue);
		}
	};

	const handleSnackbarClose = () => {
		setIsSnackBarOpen(false);
	};

	useEffect(() => {
		onClearIsTabsDeselect();
	}, [onClearIsTabsDeselect]);

	const snackbar = (
		<Snackbar
			open={isSnackbarOpen}
			autoHideDuration={5000}
			onClose={handleSnackbarClose}
			anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
		>
			<Alert severity='error' variant='filled' elevation={5}>
				{error}
			</Alert>
		</Snackbar>
	);

	const profileRedirect = searchedUserId ? (
		<Redirect to={`/profile/${searchedUserId}`} />
	) : null;

	return (
		<React.Fragment>
			{profileRedirect}
			{snackbar}
			<Paper className={classes.paperContainer}>
				<SearchBar
					searchVal={searchValue}
					searchValueChangeHandler={searchValueChangeHandler}
					submitHandler={onUserSearchSubmit}
					enterKeyHandler={keyPressHandler}
				/>
			</Paper>
			<ViewPageLinks setTabValue={setTabValue} userId={userId} />
		</React.Fragment>
	);
};

export default HomePage;
