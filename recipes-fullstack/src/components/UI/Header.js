import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

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

	const handleTabChange = (event, newValue) => {
		props.setTabValue(newValue);
	};

	useEffect(() => {
		[...props.routes].forEach(route => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (props.tabValue !== route.activeIndex) {
						props.setTabValue(route.activeIndex);
					}
					break;
				default:
					break;
			}
		});
	}, [props.tabValue, props.routes]);

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
								routes={props.routes}
								setTabValue={props.setTabValue}
								tabValue={props.tabValue}
								setOpenDrawer={setOpenDrawer}
								openDrawer={openDrawer}
							/>
						) : (
							<NavTabs
								routes={props.routes}
								tabVal={props.tabValue}
								handleTabChange={handleTabChange}
							/>
						)}
					</Toolbar>
				</AppBar>
			</ElevationScroll>
			<div className={classes.toolbarMargin} />
		</React.Fragment>
	);
};

export default Header;
