import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './components/UI/Header';
import theme from './components/UI/Theme';

import HomePage from './components/Pages/HomePage';
import Auth from './components/Pages/Auth';
import RecipePage from './components/Pages/RecipePage';
import ProfilePage from './components/Pages/ProfilePage';
import RecipeFullDetailsPage from './components/Pages/RecipeFullDetailsPage';
import CreateRecipePage from './components/Pages/CreateRecipePage';

function App() {
	const [tabValue, setTabValue] = useState(0);

	const routes = [
		{ name: 'Home', link: '/', activeIndex: 0, isMainTab: true },
		{ name: 'My Recipes', link: '/recipes', activeIndex: 1, isMainTab: true },
		{ name: 'My Profile', link: '/profile', activeIndex: 2, isMainTab: true },
		{ name: 'Log In/Out', link: '/auth', activeIndex: 3, isMainTab: true },
		{ name: 'New Recipe', link: '/new-recipe', activeIndex: false, isMainTab: false },
		{ name: 'Full Recipe Details', link: '/recipe-full-details', activeIndex: false, isMainTab: false },
	];

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header routes={routes} tabValue={tabValue} setTabValue={setTabValue} />
				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<HomePage routes={routes} setTabValue={setTabValue} />
						)}
					/>
					<Route
						exact
						path='/auth'
						render={() => <Auth routes={routes} setTabValue={setTabValue} />}
					/>
					<Route
						exact
						path='/recipes'
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
						render={() => (
							<RecipeFullDetailsPage
								routes={routes}
								setTabValue={setTabValue}
							/>
						)}
					/>
					<Route
						exact
						path='/new-recipe'
						render={() => (
							<CreateRecipePage routes={routes} setTabValue={setTabValue} />
						)}
					/>
					<Route
						exact
						path='/profile'
						render={() => (
							<ProfilePage routes={routes} setTabValue={setTabValue} />
						)}
					/>
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
