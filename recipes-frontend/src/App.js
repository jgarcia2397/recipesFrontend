import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './components/UI/Header';
import theme from './components/UI/Theme';

import HomePage from './components/Pages/HomePage';
import Auth from './components/Pages/Auth';
import RecipePage from './components/Pages/RecipePage';
import ProfilePage from './components/Pages/ProfilePage';
import RecipeFullDetailsPage from './components/Pages/RecipeFullDetailsPage';
import CreateRecipePage from './components/Pages/CreateRecipePage';

import * as actions from './store/actions/index';

let logoutTimer;

function App() {
	const [tabValue, setTabValue] = useState(0);

	// auth constants
	const token = useSelector(state => state.user.token);
	const tokenExpiration = useSelector(state => state.user.tokenExpiration);
	const userId = useSelector(state => state.user.userId);

	let routes;
	if (token) {
		routes = [
			{ name: 'Home', link: '/', activeIndex: 0, isMainTab: true },
			{
				name: 'My Recipes',
				link: `/recipes/${userId}`,
				activeIndex: 1,
				isMainTab: true,
			},
			{
				name: 'My Profile',
				link: `/profile/${userId}`,
				activeIndex: 2,
				isMainTab: true,
			},
			{ name: 'Log Out', link: '/auth', activeIndex: 3, isMainTab: false },
			{
				name: 'New Recipe',
				link: '/new-recipe',
				activeIndex: false,
				isMainTab: false,
			},
			{
				name: 'Full Recipe Details',
				link: '/recipe-full-details',
				activeIndex: false,
				isMainTab: false,
			},
		];
	} else {
		routes = [
			{ name: 'Home', link: '/', activeIndex: 0, isMainTab: true },
			{ name: 'Log In', link: '/auth', activeIndex: 1, isMainTab: true },
		];
	}

	let routeComponents;
	if (token) {
		routeComponents = (
			<Switch>
				<Route
					exact
					path='/'
					render={() => <HomePage routes={routes} setTabValue={setTabValue} />}
				/>
				<Route
					exact
					path='/auth'
					render={() => <Auth routes={routes} setTabValue={setTabValue} />}
				/>
				<Route
					exact
					path='/recipes/:userId'
					render={() => (
						<RecipePage
							tabValue={tabValue}
							routes={routes}
							setTabValue={setTabValue}
						/>
					)}
				/>
				<Route
					exact
					path='/recipe-full-details'
					render={props => (
						<RecipeFullDetailsPage
							{...props}
							routes={routes}
							setTabValue={setTabValue}
						/>
					)}
				/>
				<Route
					exact
					path='/new-recipe'
					render={props => (
						<CreateRecipePage
							{...props}
							routes={routes}
							setTabValue={setTabValue}
						/>
					)}
				/>
				<Route
					exact
					path='/profile/:userId'
					render={() => (
						<ProfilePage routes={routes} setTabValue={setTabValue} />
					)}
				/>
			</Switch>
		);
	} else {
		routeComponents = (
			<Switch>
				<Route
					exact
					path='/'
					render={() => <HomePage routes={routes} setTabValue={setTabValue} />}
				/>
				<Route
					exact
					path='/auth'
					render={() => <Auth routes={routes} setTabValue={setTabValue} />}
				/>
			</Switch>
		);
	}

	// ** AUTHENTICATION **
	const dispatch = useDispatch();

	const onAutoLogin = useCallback(
		(userId, token, expiration) =>
			dispatch(actions.autoLogin(userId, token, expiration)),
		[dispatch]
	);

	const onAutoLogout = useCallback(() => dispatch(actions.authLogout()), [
		dispatch,
	]);

	useEffect(() => {
		if (token && tokenExpiration) {
			const remainingTime =
				new Date(tokenExpiration).getTime() - new Date().getTime();
			logoutTimer = setTimeout(onAutoLogout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, onAutoLogout, tokenExpiration]);

	useEffect(() => {
		const storedUserData = JSON.parse(localStorage.getItem('userData'));
		if (
			storedUserData &&
			storedUserData.token &&
			new Date(storedUserData.expiration) > new Date()
		) {
			onAutoLogin(
				storedUserData.userId,
				storedUserData.token,
				new Date(storedUserData.expiration)
			);
		}
	}, [onAutoLogin]);
	// ** AUTHENTICATION **

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header
					routes={routes}
					tabValue={tabValue}
					setTabValue={setTabValue}
					isLoggedIn={!!token}
					logout={onAutoLogout}
				/>
				{routeComponents}
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
