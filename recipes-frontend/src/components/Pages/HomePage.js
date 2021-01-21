import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SearchBar from '../UI/SearchBar';
import ViewPageLinks from '../UI/ViewPageLinks';

import cooking from '../../assets/cooking.jpg';

import * as actions from '../../store/actions/index';

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

	const searchedUserId = useSelector(state => state.user.searchedUserId);

	const dispatch = useDispatch();

	const onClearIsTabsDeselect = () => dispatch(actions.clearIsTabsDeselect());

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
		// onGetOtherUserRecipes(searchValue);
		onGetOtherUserId(searchValue);
	};

	useEffect(() => {
		onClearIsTabsDeselect();
	}, []);

	const profileRedirect = searchedUserId ? (
		<Redirect to={`/profile/${searchedUserId}`} />
	) : null;

	return (
		<React.Fragment>
			{profileRedirect}
			<Paper className={classes.paperContainer}>
				<SearchBar
					searchVal={searchValue}
					searchValueChangeHandler={searchValueChangeHandler}
					submitHandler={onUserSearchSubmit}
				/>
			</Paper>
			<ViewPageLinks setTabValue={setTabValue} />
		</React.Fragment>
	);
};

export default HomePage;
