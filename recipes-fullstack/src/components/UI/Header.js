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
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.modal + 1
	},
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
	logo: {
		...theme.typography.h3,
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
		},
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
	const [openDrawer, setOpenDrawer] = useState(false);

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
		<React.Fragment>
			<SwipeableDrawer
				open={openDrawer}
				onClose={() => setOpenDrawer(false)}
				onOpen={() => setOpenDrawer(true)}
			>
				<div className={classes.toolbarMargin} />
				<List>
					{routes.map((route, index) => (
						<ListItem
							key={`${route}${index}`}
							button
							component={Link}
							to={route.link}
							onClick={() => setOpenDrawer(false)}
						>
							<ListItemText>{route.name}</ListItemText>
						</ListItem>
					))}
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => {setOpenDrawer(!openDrawer)}}
				color='inherit'
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</React.Fragment>
	);

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position='fixed' color='primary' className={classes.appBar}>
					<Toolbar>
						<Typography className={classes.logo} variant='h3'>
							Good Food
						</Typography>
						{matches ? drawer : tabs}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
