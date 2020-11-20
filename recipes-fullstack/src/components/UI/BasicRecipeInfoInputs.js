import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import InputPair from './InputPair';

const useStyles = makeStyles(theme => ({
	basicInfoInputsContainer: {
		marginBottom: '50px',
	},
	inputSet: {
		marginLeft: '15px',
		marginRight: '15px',
		[theme.breakpoints.down('md')]: {
			marginBottom: '25px',
		},
	},
	textInput: {
		width: '11.5vw',
		minWidth: '150px',
	},
}));

const BasicRecipeInfoInputs = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

	// const [prepTimeUnits, setPrepTimeUnits] = useState('minutes');
	// const [cookTimeUnits, setCookTimeUnits] = useState('minutes');
	// const [difficulty, setDifficulty] = useState('Easy');

	const timeUnits = [
		{ value: 'minutes', label: 'minutes' },
		{ value: 'hours', label: 'hours' },
	];

	const difficultyLevels = [
		{ value: 'Easy', label: 'Easy' },
		{ value: 'Medium', label: 'Medium' },
		{ value: 'Hard', label: 'Hard' },
	];

	// const handlePrepTimeChange = event => {
	// 	setPrepTimeUnits(event.target.value);
	// };

	// const handleCookTimeChange = event => {
	// 	setCookTimeUnits(event.target.value);
	// };

	// const handleDifficultyChange = event => {
	// 	setDifficulty(event.target.value);
	// };

	return (
		<Grid
			container
			direction={matchesMD ? 'column' : 'row'}
			justify='center'
			alignItems='center'
			className={classes.basicInfoInputsContainer}
		>
			<Grid item className={classes.inputSet}>
				<InputPair
					id={'prepTime'}
					label={'Prep Time'}
					timeUnits={props.prepTimeUnits}
					handleChange={props.changed}
					options={timeUnits}
					isModify={props.isModify}
					oldValue={props.oldDetails.prepTime}
					oldUnits={props.oldDetails.prepTimeUnits}
					error={props.errors[1]}
				/>
			</Grid>
			<Grid item className={classes.inputSet}>
				<InputPair
					id={'cookTime'}
					label={'Cook Time'}
					timeUnits={props.cookTimeUnits}
					handleChange={props.changed}
					options={timeUnits}
					isModify={props.isModify}
					oldValue={props.oldDetails.cookTime}
					oldUnits={props.oldDetails.cookTimeUnits}
					error={props.errors[2]}
				/>
			</Grid>
			<Grid item className={classes.inputSet}>
				<TextField
					id='servings'
					label='Servings'
					variant='outlined'
					defaultValue={props.isModify ? props.oldDetails.servings : ''}
					className={classes.textInput}
					onChange={(event) => props.changed(event, 'servings')}
					error={props.errors[3]}
				/>
			</Grid>
			<Grid item className={classes.inputSet}>
				<InputPair
					id={'difficulty'}
					label={'Difficulty'}
					timeUnits={props.difficulty}
					handleChange={props.changed}
					options={difficultyLevels}
					isSingleDropdown
					isModify={props.isModify}
					oldUnits={props.oldDetails.difficulty}
				/>
			</Grid>
		</Grid>
	);
};

export default BasicRecipeInfoInputs;
