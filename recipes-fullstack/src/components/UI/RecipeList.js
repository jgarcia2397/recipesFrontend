import React from 'react';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '25px',
		[theme.breakpoints.down('xs')]: {
			marginTop: '5px',
		},
	},
}));

const ListItemWithWiderSecondaryAction = withStyles({
	root: {
		paddingBottom: 0,
	},
	secondaryAction: {
		paddingRight: 96,
	},
})(ListItem);

const RecipeList = props => {
	const classes = useStyles();

	return (
		<div>
			<List className={classes.root}>
				{props.array.map(value => (
					<ListItemWithWiderSecondaryAction>
						<ListItemIcon>
							<ArrowRightIcon />
						</ListItemIcon>
						<ListItemText primary={value} />
						<ListItemSecondaryAction>
							<IconButton edge='end' aria-label='edit'>
								<EditIcon />
							</IconButton>
							<IconButton edge='end' aria-label='delete'>
								<DeleteIcon />
							</IconButton>
						</ListItemSecondaryAction>
					</ListItemWithWiderSecondaryAction>
				))}
			</List>
		</div>
	);
};

export default RecipeList;
