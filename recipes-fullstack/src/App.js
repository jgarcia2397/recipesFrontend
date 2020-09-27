import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './components/UI/Header';
import theme from './components/UI/Theme';

import HomePage from './components/Pages/HomePage';
import Auth from './containers/Auth';
import RecipePage from './components/Pages/RecipePage';
import ProfilePage from './containers/ProfilePage';
import RecipeFullDetailsPage from './components/Pages/RecipeFullDetailsPage';

function App() {
	const [tabValue, setTabValue] = useState(0);

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header tabValue={tabValue} setTabValue={setTabValue} />
				<Switch>
					<Route
						exact
						path='/'
						render={() => (
							<HomePage setTabValue={setTabValue} />
						)}
					/>
					<Route exact path='/auth' render={() => <Auth />} />
					<Route exact path='/recipes' render={() => <RecipePage />} />
					<Route exact path='/recipe-full-details' render={() => <RecipeFullDetailsPage />} />
					<Route exact path='/profile' render={() => <ProfilePage />} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
