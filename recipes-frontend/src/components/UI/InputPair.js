import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(theme => ({
	dropdown: {
		width: '7.5vw',
		minWidth: '115px',
		height: '7vh',
	},
	textInput: {
		width: '11.5vw',
		minWidth: '150px',
		height: '7vh',
	},
}));

const InputPair = props => {
	const classes = useStyles();

	const dropdownID = props.id === 'difficulty' ? props.id : `${props.id}Units`;

	return (
		<Grid container direction='row' spacing={1}>
			{!props.isSingleDropdown ? (
				<Grid item>
					<TextField
						id={props.id}
						label={props.label}
						variant='outlined'
						color='secondary'
						defaultValue={props.isModify ? props.oldValue : ''}
						className={classes.textInput}
						onChange={event => props.handleChange(event, props.id)}
						error={props.error}
						helperText={props.error ? 'Time value must be a number greater than 0.' : null}
					/>
				</Grid>
			) : null}
			<Grid item>
				<TextField 
					id={`${props.id}Units`}
					select
					value={props.timeUnits}
					variant='outlined'
					color='secondary'
					onChange={event => props.handleChange(event, dropdownID)}
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
