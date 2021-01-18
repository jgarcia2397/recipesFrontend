import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
	root: {
		minWidth: 200,
		padding: '3px 6px',
		margin: '0 auto',
		display: 'flex',
	},
	searchIconContainer: {
		'&:hover': {
			backgroundColor: 'transparent',
		},
	},
	input: {
		flex: 1,
	},
}));

const SearchBar = (props) => {
	const classes = useStyles();

	return (
		<Paper component='form' className={classes.root} elevation={12}>
			<IconButton
				type='button'
				className={classes.searchIconContainer}
				onClick={e => props.submitHandler(e, props.searchVal)}
			>
				<SearchIcon />
			</IconButton>
			<InputBase
				placeholder='Search users or recipes'
				className={classes.input}
				value={props.searchValue}
				onChange={e => props.searchValueChangeHandler(e)}
			/>
		</Paper>
	);
};

export default SearchBar;
