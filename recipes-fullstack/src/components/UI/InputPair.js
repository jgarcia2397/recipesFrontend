import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
	dropdown: {
		width: '7.5vw',
		minWidth: '115px',
	},
	textInput: {
		width: '11.5vw',
		minWidth: '150px',
	},
}));

const InputPair = props => {
	const classes = useStyles();

	return (
		<Grid container direction='row' spacing={1}>
			{!props.isSingleDropdown ? (
				<Grid item>
					<TextField
						id={props.id}
						label={props.label}
						variant='outlined'
						className={classes.textInput}
					/>
				</Grid>
			) : null}
			<Grid item>
				<TextField // native for mobile?
					id={`${props.id}-units`}
					select
					value={props.timeUnits}
					variant='outlined'
					onChange={props.handleChange}
					className={classes.dropdown}
					label={props.isSingleDropdown ? props.label : ''}
				>
					{props.options.map(option => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
			</Grid>
		</Grid>
	);
};

export default InputPair;
