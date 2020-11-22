import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

import { updateObject, checkInputValidity } from '../../shared/utility';
import BasicRecipeInfoInputs from '../UI/BasicRecipeInfoInputs';
import ImageUpload from '../UI/ImageUpload';
import RecipeInstructions from '../UI/RecipeInstructions';

import * as actions from '../../store/actions/index';

const useStyles = makeStyles(theme => ({
	root: {
		height: '180vh',
		display: 'flex',
	},
	background: {
		backgroundColor: theme.palette.primary.light,
		height: '100%',
		width: '100%',
		overflow: 'auto',
	},
	divider: {
		backgroundColor: theme.divider.main,
		width: '100%',
		// [theme.breakpoints.down('md')]: {
		// 	width: '100%',
		// 	height: '0.1%',
		// },
	},
	recipeDetailsRoot: {
		width: '100%',
	},
	recipeDetailsContainer: {
		height: '55vh',
		[theme.breakpoints.down('md')]: {
			height: '110vh',
		},
	},
	saveRecipeButton: {
		...theme.typography.button,
		marginTop: '45px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
		[theme.breakpoints.down('md')]: {
			marginBottom: '20px',
		},
	},
	titleContainer: {
		marginTop: '200px',
		marginBottom: '100px',
		[theme.breakpoints.down('md')]: {
			marginTop: '70px',
			marginBottom: '60px',
		},
	},
	textInput: {
		width: '15vw',
		minWidth: '150px',
	},
	recipeNameInput: {
		marginBottom: '25px',
	},
}));

const CreateRecipePage = props => {
	const classes = useStyles();
	const theme = useTheme();

	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const matchesMD = useMediaQuery(theme.breakpoints.down('md'));

	const [basicRecipeForm, setBasicRecipeForm] = useState({
		recipeName: {
			elementType: 'input',
			value: '',
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		prepTime: {
			elementType: 'input',
			value: '',
			validation: {
				required: true,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		prepTimeUnits: {
			elementType: 'dropdown',
			value: 'minutes',
			valid: true,
		},
		cookTime: {
			elementType: 'input',
			value: '',
			validation: {
				required: true,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		cookTimeUnits: {
			elementType: 'dropdown',
			value: 'minutes',
			valid: true,
		},
		servings: {
			elementType: 'input',
			value: '',
			validation: {
				required: true,
				isNumeric: true,
			},
			valid: false,
			touched: false,
		},
		difficulty: {
			elementType: 'dropdown',
			value: 'Easy',
			valid: true,
		},
	});
	const [detailRecipeForm, setDetailRecipeForm] = useState({
		ingredients: {
			elementType: 'list',
			value: [],
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
		directions: {
			elementType: 'list',
			value: [],
			validation: {
				required: true,
			},
			valid: false,
			touched: false,
		},
	});
	const [textInputErrors, setTextInputErrors] = useState([
		false,
		false,
		false,
		false,
	]);
	const [formIsValid, setFormIsValid] = useState(false);
	const [alert, setAlert] = useState({ open: false, message: '' });

	const dispatch = useDispatch();

	const isRecipeCreated = useSelector(
		state => state.createRecipe.recipeCreated
	);

	const recipeId = useSelector(state => state.createRecipe.recipeId);

	const onCreateRecipe = (basicDetails, ingredients, directions) =>
		dispatch(actions.createRecipe(basicDetails, ingredients, directions));

	const onUpdateRecipe = (basicDetails, ingredients, directions) =>
		dispatch(actions.updateRecipe(basicDetails, ingredients, directions));

	const { tabValue, routes, setTabValue } = props;

	useEffect(() => {
		[...routes].forEach(route => {
			switch (window.location.pathname) {
				case `${route.link}`:
					if (tabValue !== route.activeIndex) {
						setTabValue(route.activeIndex);
					}
					break;
				default:
					break;
			}
		});
	}, [tabValue, routes, setTabValue]);

	let oldRecipeDetails;
	const isModifyRecipe = Object.keys(props.location.recipeDetails).length !== 0;

	if (isModifyRecipe) {
		oldRecipeDetails = props.location.recipeDetails;
	} else {
		oldRecipeDetails = {};
	}

	const updateBasicFormOnMount = () => {
		let updatedBasicDropdowns = {};
		const inputIDs = ['prepTimeUnits', 'cookTimeUnits', 'difficulty'];

		for (const inputID of inputIDs) {
			const updatedFormElement = updateObject(basicRecipeForm[inputID], {
				value: oldRecipeDetails[inputID],
			});

			updatedBasicDropdowns[inputID] = updatedFormElement;
		}

		setBasicRecipeForm(updatedBasicDropdowns);
	};

	const updateDetailFormOnMount = () => {
		let mergedIngredientArray = [];
		let mergedDirectionArray = [];

		mergedIngredientArray = [
			...oldRecipeDetails.ingredientArray,
			...detailRecipeForm.ingredients.value,
		];
		mergedDirectionArray = [
			...oldRecipeDetails.directionsArray,
			...detailRecipeForm.directions.value,
		];

		const updatedIngredientList = updateObject(
			detailRecipeForm['ingredients'],
			{
				value: mergedIngredientArray,
			}
		);

		const updatedDirectionList = updateObject(detailRecipeForm['directions'], {
			value: mergedDirectionArray,
		});

		const updatedForm = updateObject(detailRecipeForm, {
			ingredients: updatedIngredientList,
			directions: updatedDirectionList,
		});

		setDetailRecipeForm(updatedForm);
	};

	useEffect(() => {
		if (isModifyRecipe) {
			// acts like componentDidMount, update basicRecipeForm dropdown state
			updateBasicFormOnMount();

			// acts like componentDidMount, update detailRecipeForm ingredient and direction array state
			updateDetailFormOnMount();
		}
	}, []);

	// ToDo: Validity check does not work when modifying a recipe
	useEffect(() => {
		let inputIDs = ['recipeName', 'prepTime', 'cookTime', 'servings'];
		let errorArray = [...textInputErrors];

		for (const inputID of inputIDs) {
			const indexOfID = inputIDs.indexOf(inputID);

			if (!basicRecipeForm[inputID].valid && basicRecipeForm[inputID].touched) {
				errorArray[indexOfID] = true;
			} else {
				errorArray[indexOfID] = false;
			}
		}

		setTextInputErrors(errorArray);
	}, [basicRecipeForm]);

	const checkFormErrors = () => {
		let errorFound = false;

		for (const error of textInputErrors) {
			if (error) {
				errorFound = true;
				break;
			}
		}

		return errorFound;
	};

	const newRecipeHandler = event => {
		// event.preventDefault();

		const isFormErrorFound = checkFormErrors();

		if (isFormErrorFound) {
			setAlert({open: true, message: 'There is an error with your Basic Recipe Info!'});
		} else {
			const basicDetails = {};
			for (let formElementID in basicRecipeForm) {
				basicDetails[formElementID] = basicRecipeForm[formElementID].value;
			}

			const ingredientList = [...detailRecipeForm.ingredients.value];
			const directionList = [...detailRecipeForm.directions.value];

			if (recipeId === -1) {
				onCreateRecipe(basicDetails, ingredientList, directionList);
			} else {
				onUpdateRecipe(basicDetails, ingredientList, directionList);
			}
		}
	};

	const basicInputChangedHandler = (event, inputID) => {
		const updatedFormElement = updateObject(basicRecipeForm[inputID], {
			value: event.target.value,
			valid: checkInputValidity(
				event.target.value,
				basicRecipeForm[inputID].validation
			),
			touched: true,
		});

		const updatedForm = updateObject(basicRecipeForm, {
			[inputID]: updatedFormElement,
		});

		setBasicRecipeForm(updatedForm);
		console.log(updatedForm);
	};

	const detailedListChangedHandler = (modalTextValue, mode, list, index) => {
		const oldListState = { ...detailRecipeForm[list] };
		const oldList = [...oldListState.value];
		let newList = [];

		if (mode === 'Delete') {
			// Delete button clicked
			newList = oldList.filter(i => oldList.indexOf(i) !== index);
		} else if (mode === 'Edit') {
			// Edit button clicked
			oldList.splice(index, 1, modalTextValue);
			newList = [...oldList];
		} else {
			// Add button clicked
			newList = [...oldList, modalTextValue];
		}

		const updatedList = updateObject(detailRecipeForm[list], {
			value: newList,
		});

		const updatedForm = updateObject(detailRecipeForm, {
			[list]: updatedList,
		});

		setDetailRecipeForm(updatedForm);
		console.log(updatedForm);
	};

	const handleAlertClose = () => {
		setAlert({ ...alert, open: false });
	};

	// ToDo: Add padding/margin on bottom of BasicRecipeInfoInputs TextFields so components don't shift when theres an error message
	let form = (
		<React.Fragment>
			<Grid item className={classes.titleContainer}>
				<Typography
					variant={matchesSM ? 'h4' : 'h3'}
					style={{ fontWeight: 'bold' }}
				>
					Basic Recipe Info
				</Typography>
			</Grid>
			<Grid item className={classes.recipeNameInput}>
				<TextField
					id='recipeName'
					label='Recipe Name'
					variant='outlined'
					defaultValue={isModifyRecipe ? oldRecipeDetails.name : ''}
					className={classes.textInput}
					onChange={event => basicInputChangedHandler(event, 'recipeName')}
					error={textInputErrors[0]}
					helperText={
						textInputErrors[0] ? 'Recipe name must not be blank.' : null
					}
				/>
			</Grid>
			<Grid item>
				<BasicRecipeInfoInputs
					changed={basicInputChangedHandler}
					prepTimeUnits={basicRecipeForm.prepTimeUnits.value}
					cookTimeUnits={basicRecipeForm.cookTimeUnits.value}
					difficulty={basicRecipeForm.difficulty.value}
					isModify={isModifyRecipe}
					oldDetails={oldRecipeDetails}
					errors={textInputErrors}
				/>
			</Grid>
			<Grid item>
				<ImageUpload />
			</Grid>
			<Grid item className={classes.titleContainer}>
				<Typography
					variant={matchesSM ? 'h4' : 'h3'}
					style={{ fontWeight: 'bold' }}
				>
					Detailed Recipe Info
				</Typography>
			</Grid>
			<Grid item className={classes.divider}>
				<Divider />
			</Grid>
			<Grid item className={classes.recipeDetailsRoot}>
				<Grid
					container
					direction={matchesMD ? 'column' : 'row'}
					className={classes.recipeDetailsContainer}
				>
					<RecipeInstructions
						ingredientArray={detailRecipeForm.ingredients.value}
						directionsArray={detailRecipeForm.directions.value}
						isNewRecipe
						changedListHandler={detailedListChangedHandler}
						isModify={isModifyRecipe}
						oldDetails={oldRecipeDetails}
					/>
				</Grid>
			</Grid>
			<Grid item className={classes.divider}>
				<Divider />
			</Grid>
			<Grid item>
				<Button
					className={classes.saveRecipeButton}
					style={{ maxWidth: '140px', minWidth: '140px' }}
					onClick={newRecipeHandler}
				>
					Save Recipe
				</Button>
			</Grid>
		</React.Fragment>
	);

	const createRecipeRedirect = isRecipeCreated ? (
		<Redirect to='/recipes' />
	) : null;

	return (
		<div className={classes.root}>
			{createRecipeRedirect}
			<Snackbar
				open={alert.open}
				autoHideDuration={5000}
				onClose={handleAlertClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert severity='error' variant='filled' elevation={5}>
					{alert.message}
				</Alert>
			</Snackbar>
			<Paper className={classes.background} square>
				<Grid container direction='column' alignItems='center'>
					{form}
				</Grid>
			</Paper>
		</div>
	);
};

export default CreateRecipePage;
