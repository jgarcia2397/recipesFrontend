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

	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header tabValue={tabValue} setTabValue={setTabValue} />
				<Switch>
					<Route
						exact
						path='/'
						render={() => <HomePage setTabValue={setTabValue} />}
					/>
					<Route exact path='/auth' render={() => <Auth />} />
					<Route
						exact
						path='/recipes'
						render={() => (
							<RecipePage tabValue={tabValue} setTabValue={setTabValue} />
						)}
					/>
					<Route
						exact
						path='/recipe-full-details'
						render={() => <RecipeFullDetailsPage />}
					/>
					<Route exact path='/new-recipe' render={() => <CreateRecipePage />} />
					<Route exact path='/profile' render={() => <ProfilePage />} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
