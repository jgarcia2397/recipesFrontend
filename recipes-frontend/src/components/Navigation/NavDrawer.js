import React from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
	toolbarMargin: {
		...theme.mixins.toolbar,
		[theme.breakpoints.down('xs')]: {
			minHeight: 64,
		},
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
	drawerItem: {
		...theme.typography.tab,
		color: 'white',
		opacity: 0.7,
	},
	drawerItemSelected: {
		'& .MuiListItemText-root': {
			color: theme.palette.common.yellow,
			opacity: 1,
		},
	},
	drawer: {
		backgroundColor: theme.palette.common.green,
	},
}));

const NavDrawer = props => {
	const classes = useStyles();

	return (
		<React.Fragment>
			<SwipeableDrawer
				open={props.openDrawer}
				onClose={() => props.setOpenDrawer(false)}
				onOpen={() => props.setOpenDrawer(true)}
				classes={{ paper: classes.drawer }}
			>
				<div className={classes.toolbarMargin} />
				<List>
					{props.routes.map((route, index) =>
						route.isMainTab ? (
							<ListItem
								key={`${route}${index}`}
								button
								divider
								component={Link}
								to={route.link}
								onClick={() => {
									props.setOpenDrawer(false);
									props.setTabValue(route.activeIndex);
								}}
								selected={props.tabValue === route.activeIndex}
								classes={{ selected: classes.drawerItemSelected }}
							>
								<ListItemText className={classes.drawerItem} disableTypography>
									{route.name}
								</ListItemText>
							</ListItem>
						) : null
					)}
				</List>
			</SwipeableDrawer>
			<IconButton
				className={classes.drawerIconContainer}
				onClick={() => {
					props.setOpenDrawer(!props.openDrawer);
				}}
				color='inherit'
			>
				<MenuIcon className={classes.drawerIcon} />
			</IconButton>
		</React.Fragment>
	);
};

export default NavDrawer;
