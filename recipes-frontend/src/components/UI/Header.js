import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Button from '@material-ui/core/Button';

import NavTabs from '../Navigation/NavTabs';
import NavDrawer from '../Navigation/NavDrawer';

const useStyles = makeStyles(theme => ({
	appBar: {
		zIndex: theme.zIndex.modal + 1,
	},
	toolbarMargin: {
		...theme.mixins.toolbar,
		[theme.breakpoints.down('xs')]: {
			minHeight: 64,
		},
	},
	logo: {
		...theme.typography.h3,
		[theme.breakpoints.down('sm')]: {
			fontSize: '2.5rem',
		},
	},
	logoutButton: {
		...theme.typography.button,
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
		[theme.breakpoints.down('md')]: {
			marginBottom: '20px',
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

	const [openDrawer, setOpenDrawer] = useState(false);

	const { tabValue, routes, setTabValue } = props;

	const handleTabChange = (event, newValue) => {
		setTabValue(newValue);
	};

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

	const logOutButton = (!matches && props.isLoggedIn) ? (
		<Button
			className={classes.logoutButton}
			style={{ maxWidth: '140px', minWidth: '140px' }}
			onClick={() => props.logout()}
		>
			Log Out
		</Button>
	) : null;

	return (
		<React.Fragment>
			<ElevationScroll>
				<AppBar position='fixed' color='primary' className={classes.appBar}>
					<Toolbar>
						<Typography className={classes.logo} variant='h3'>
							Good Food
						</Typography>
						{matches ? (
							<NavDrawer
								routes={routes}
								setTabValue={setTabValue}
								tabValue={tabValue}
								setOpenDrawer={setOpenDrawer}
								openDrawer={openDrawer}
							/>
						) : (
							<NavTabs
								routes={routes}
								tabVal={tabValue}
								handleTabChange={handleTabChange}
							/>
						)}
						{logOutButton}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
