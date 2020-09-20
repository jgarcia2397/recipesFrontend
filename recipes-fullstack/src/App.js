import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import Header from './components/UI/Header';
import theme from './components/UI/Theme';

import HomePage from './containers/HomePage';
import Auth from './containers/Auth';
import RecipePage from './containers/RecipePage';
import ProfilePage from './containers/ProfilePage';

function App() {
	return (
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path='/' render={() => <HomePage />} />
					<Route exact path='/auth' render={() => <Auth />} />
					<Route exact path='/recipes' render={() => <RecipePage />} />
					<Route exact path='/profile' render={() => <ProfilePage />} />
				</Switch>
			</BrowserRouter>
		</ThemeProvider>
	);
}

export default App;
