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

	const [prepTimeUnits, setPrepTimeUnits] = useState('minutes');
	const [cookTimeUnits, setCookTimeUnits] = useState('minutes');
	const [difficulty, setDifficulty] = useState('Easy');

	const timeUnits = [
		{ value: 'minutes', label: 'minutes' },
		{ value: 'hours', label: 'hours' },
	];

	const difficultyLevels = [
		{ value: 'Easy', label: 'Easy' },
		{ value: 'Medium', label: 'Medium' },
		{ value: 'Hard', label: 'Hard' },
	];

	const handlePrepTimeChange = event => {
		setPrepTimeUnits(event.target.value);
	};

	const handleCookTimeChange = event => {
		setCookTimeUnits(event.target.value);
	};

	const handleDifficultyChange = event => {
		setDifficulty(event.target.value);
	};

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
					id={'prep-time'}
					label={'Prep Time'}
					timeUnits={prepTimeUnits}
					handleChange={handlePrepTimeChange}
					options={timeUnits}
				/>
			</Grid>
			<Grid item className={classes.inputSet}>
				<InputPair
					id={'cook-time'}
					label={'Cook Time'}
					timeUnits={cookTimeUnits}
					handleChange={handleCookTimeChange}
					options={timeUnits}
				/>
			</Grid>
			<Grid item className={classes.inputSet}>
				<TextField
					id='servings'
					label='Servings'
					variant='outlined'
					className={classes.textInput}
				/>
			</Grid>
			<Grid item className={classes.inputSet}>
				<InputPair
					id={'difficulty'}
					label={'Difficulty'}
					timeUnits={difficulty}
					handleChange={handleDifficultyChange}
					options={difficultyLevels}
					isSingleDropdown
				/>
			</Grid>
		</Grid>
	);
};

export default BasicRecipeInfoInputs;
