import React from 'react';

import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
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
	listContainer: {
		marginTop: '25px',
		[theme.breakpoints.down('xs')]: {
			marginTop: '5px',
		},
	},
	root: {
		overflow: 'auto',
		maxHeight: '88%',
		[theme.breakpoints.down('lg')]: {
			maxHeight: '75%',
		},
		[theme.breakpoints.down('xs')]: {
			maxHeight: '70%',
		},
	},
	rootAlternate: {
		overflow: 'auto',
		maxHeight: '75%',
		[theme.breakpoints.down('lg')]: {
			maxHeight: '60%',
		},
		[theme.breakpoints.down('md')]: {
			maxHeight: '75%',
		},
		[theme.breakpoints.down('xs')]: {
			maxHeight: '70%',
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
	const theme = useTheme();

	return (
		<div className={props.isNewRecipe ? classes.rootAlternate : classes.root}>
			<List className={classes.listContainer}>
				{props.array.map((value, index) => (
					<ListItemWithWiderSecondaryAction key={index}>
						<ListItemIcon
							style={
								props.isNewRecipe
									? { color: theme.palette.common.black }
									: { color: theme.palette.secondary.main }
							}
						>
							<ArrowRightIcon />
						</ListItemIcon>
						<ListItemText
							primary={value}
							style={
								props.isNewRecipe
									? { color: theme.palette.common.black }
									: { color: theme.palette.secondary.main }
							}
						/>
						<ListItemSecondaryAction>
							{props.isNewRecipe ? (
								<IconButton
									edge='end'
									aria-label='edit'
									onClick={() => {
										props.clicked('Edit', index, value);
									}}
								>
									<EditIcon />
								</IconButton>
							) : null}
							{props.isNewRecipe ? (
								<IconButton
									edge='end'
									aria-label='delete'
									onClick={() => {
										props.clicked('Delete', index, '');
									}}
								>
									<DeleteIcon />
								</IconButton>
							) : null}
						</ListItemSecondaryAction>
					</ListItemWithWiderSecondaryAction>
				))}
			</List>
		</div>
	);
};

export default RecipeList;
