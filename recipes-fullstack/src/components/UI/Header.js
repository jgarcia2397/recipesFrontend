import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
	},
	tabContainer: {
		marginLeft: 'auto',
	},
	tab: {
		minWidth: 15,
		marginLeft: '15px',
		marginRight: '15px',
	},
	drawerIconContainer: {
		marginLeft: 'auto',
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	drawerIcon: {
		height: '40px',
		width: '40px',
	},
}));

const ElevationScroll = props => {
	const { children } = props;
	const trigger = useScrollTrigger({
		disableHysteresis: true,
		threshold: 0,
	});

	return React.cloneElement(children, {
		elevation: trigger ? 4 : 0,
	});
};

const Header = props => {
	const classes = useStyles();
	const theme = useTheme();
	const matches = useMediaQuery(theme.breakpoints.down('md'));

	const [tabValue, setTabValue] = useState(0);

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

	const routes = [
		{ name: 'Home', link: '/' },
		{ name: 'My Recipes', link: '/recipes' },
		{ name: 'My Profile', link: '/profile' },
		{ name: 'Log In/Out', link: '/auth' },
	];

	const tabs = (
		<Tabs
			className={classes.tabContainer}
			value={tabValue}
			onChange={handleTabChange}
			/*indicatorColor='primary'*/
		>
			{routes.map((route, index) => (
				<Tab
					className={classes.tab}
					key={`${route}${index}`}
					label={route.name}
					component={Link}
					to={route.link}
				/>
			))}
		</Tabs>
	);

	const drawer = (
		<IconButton
			className={classes.drawerIconContainer}
			onClick={() => {}}
			color='inherit'
		>
			<MenuIcon className={classes.drawerIcon} />
		</IconButton>
	);

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position='fixed' color='primary'>
					<Toolbar>
						<Typography variant='h3'>Good Food</Typography>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
