import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import InputPair from '../UI/InputPair';

const useStyles = makeStyles(theme => ({
	root: {
		height: '95vh',
		display: 'flex',
	},
	background: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',
		width: '100%',
		overflow: 'auto',
	},
	basicInfoInputsContainer: {
		marginTop: '50px',
	},
	dropdown: {
		width: '7.5vw',
		minWidth: '115px',
	},
	inputSet: {
		marginLeft: '15px',
		marginRight: '15px',
	},
}));

const CreateRecipePage = props => {
	const classes = useStyles();

	const [prepTimeUnits, setPrepTimeUnits] = useState('minutes');
	const [cookTimeUnits, setCookTimeUnits] = useState('minutes');
	const [difficulty, setDifficulty] = useState('Easy');

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
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<Grid container direction='column'>
					<Grid item>
						<Grid
							container
							direction='row'
							justify='center'
							className={classes.basicInfoInputsContainer}
						>
							<Grid item className={classes.inputSet}>
								<InputPair
									id={'prep-time'}
									label={'Prep Time'}
									timeUnits={prepTimeUnits}
									handleChange={handlePrepTimeChange}
								/>
							</Grid>
							<Grid item className={classes.inputSet}>
								<InputPair
									id={'cook-time'}
									label={'Cook Time'}
									timeUnits={cookTimeUnits}
									handleChange={handleCookTimeChange}
								/>
							</Grid>
							<Grid item className={classes.inputSet}>
								<TextField id='servings' label='Servings' variant='outlined' />
							</Grid>
							<Grid item className={classes.inputSet}>
								<TextField // native for mobile?
									id='difficulty'
									label='Difficulty'
									select
									value={difficulty}
									variant='outlined'
									onChange={handleDifficultyChange}
									className={classes.dropdown}
								>
									{difficultyLevels.map(option => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
};

export default CreateRecipePage;
