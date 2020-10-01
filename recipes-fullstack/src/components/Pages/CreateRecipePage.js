import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

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
								<Grid container direction='row' spacing={1}>
									<Grid item>
										<TextField
											id='prep-time'
											label='Prep Time'
											variant='outlined'
										/>
									</Grid>
									<Grid item>
										<TextField // native for mobile?
											id='prep-time-units'
											select
											value={prepTimeUnits}
											variant='outlined'
											onChange={handlePrepTimeChange}
											className={classes.dropdown}
										>
											{timeUnits.map(option => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</TextField>
									</Grid>
								</Grid>
							</Grid>
                            <Grid item className={classes.inputSet}>
								<Grid container direction='row' spacing={1}>
									<Grid item>
										<TextField
											id='cook-time' label='Cook Time' variant='outlined'
										/>
									</Grid>
									<Grid item>
										<TextField // native for mobile?
											id='cook-time-units'
                                            select
                                            value={cookTimeUnits}
                                            variant='outlined'
                                            onChange={handleCookTimeChange}
                                            className={classes.dropdown}
										>
											{timeUnits.map(option => (
												<MenuItem key={option.value} value={option.value}>
													{option.label}
												</MenuItem>
											))}
										</TextField>
									</Grid>
								</Grid>
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
