import React, { useEffect, useState, useCallback } from 'react';
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
import CircularProgress from '@material-ui/core/CircularProgress';

import { updateObject, checkInputValidity } from '../../shared/utility';
import BasicRecipeInfoInputs from '../UI/BasicRecipeInfoInputs';
import ImageUpload from '../UI/ImageUpload';
import RecipeInstructions from '../UI/RecipeInstructions';

import * as actions from '../../store/actions/index';

const useStyles = makeStyles(theme => ({
	root: {
		height: '182vh',
		display: 'flex',
	},
	rootModifyRecipe: {
		height: '136vh',
		display: 'flex',
	},
	background: {
		backgroundColor: theme.palette.common.ivory,
		height: '100%',
		width: '100%',
	},
	divider: {
		backgroundColor: theme.divider.main,
		width: '100%',
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
		marginTop: '25px',
		marginBottom: '25px',
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
		height: '5vh',
	},
	recipeNameInput: {
		marginBottom: '35px',
	},
	circProgressContainer: {
		marginTop: '25px',
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
		image: {
			elementType: 'imageInput',
			value: null,
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
	const [isSnackbarOpen, setIsSnackBarOpen] = useState(false);

	const dispatch = useDispatch();

	const isRecipeCreated = useSelector(
		state => state.createRecipe.recipeCreated
	);
	const error = useSelector(state => state.createRecipe.error);
	const creatorId = useSelector(state => state.user.userId);
	const recipeId = useSelector(state => state.createRecipe.recipeId);
	const recipes = useSelector(state => state.createRecipe.recipes);
	const isModifyRecipe = useSelector(
		state => state.createRecipe.isModifyRecipe
	); // can use this to have additional UI message when updating recipe?
	const isLoading = useSelector(state => state.createRecipe.loading);
	const token = useSelector(state => state.user.token);

	const onCreateRecipe = (
		basicDetails,
		ingredients,
		directions,
		creator,
		image,
		token
	) =>
		dispatch(
			actions.createRecipe(
				basicDetails,
				ingredients,
				directions,
				creator,
				image,
				token
			)
		);

	const onUpdateRecipe = (basicDetails, ingredients, directions, recipeId, token) =>
		dispatch(
			actions.updateRecipe(basicDetails, ingredients, directions, recipeId, token)
		);

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

	useEffect(() => {
		if (error !== null) {
			setIsSnackBarOpen(true);
		}
	}, [error]);

	let oldRecipeDetails;
	const isModifyLocalStorage = localStorage.getItem('isModifyRecipe');
	if (isModifyLocalStorage === 'true') {
		// previously isModifyRecipe from Redux store
		// This case occurs when we are modifying an existing recipe and the page is refreshed, cannot use isModifyRecipe from Redux store since it resets to false on refresh
		oldRecipeDetails = JSON.parse(localStorage.getItem('recipeDetails'));
	} else {
		oldRecipeDetails = {
			recipeName: '',
			prepTime: '',
			prepTimeUnits: 'minutes',
			cookTime: '',
			cookTimeUnits: 'minutes',
			servings: '',
			difficulty: 'Easy',
			ingredientArray: [],
			directionsArray: [],
		};
	}

	const updateBasicFormOnMount = () => {
		let updatedBasicFormState = {};

		for (const inputID of Object.keys(basicRecipeForm)) {
			const updatedFormElement = updateObject(basicRecipeForm[inputID], {
				value: oldRecipeDetails[inputID],
				valid: true,
				touched: true,
			});

			updatedBasicFormState[inputID] = updatedFormElement;
		}

		setBasicRecipeForm(updatedBasicFormState);
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
				touched: true,
			}
		);

		const updatedDirectionList = updateObject(detailRecipeForm['directions'], {
			value: mergedDirectionArray,
			touched: true,
		});

		const updatedForm = updateObject(detailRecipeForm, {
			ingredients: updatedIngredientList,
			directions: updatedDirectionList,
		});

		setDetailRecipeForm(updatedForm);
	};

	useEffect(() => {
		if (isModifyLocalStorage === 'true') {
			// previously isModifyRecipe from Redux store
			// acts like componentDidMount, update basicRecipeForm dropdown state
			updateBasicFormOnMount();

			// acts like componentDidMount, update detailRecipeForm ingredient and direction array state
			updateDetailFormOnMount();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

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
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basicRecipeForm]);

	const checkFormErrors = useCallback(() => {
		setFormIsValid(true);

		for (const key of Object.keys(basicRecipeForm)) {
			if (
				!basicRecipeForm[key].valid &&
				basicRecipeForm[key].touched === true
			) {
				setFormIsValid(false);
				setAlert({
					open: true,
					message: 'There is an error with your Basic Recipe Info!',
				});
				break;
			}
		}

		for (const key of Object.keys(detailRecipeForm)) {
			// On initial empty form, if both columns are not yet touched - we want invalid form but no Alert popup everytime basicRecipeForm is updated
			if (
				!detailRecipeForm['ingredients'].touched &&
				!detailRecipeForm['directions'].touched
			) {
				setFormIsValid(false);
				break;
			}

			if (detailRecipeForm[key].value.length === 0) {
				setFormIsValid(false);
				setAlert({
					open: true,
					message: `The ${key} column is empty!`,
				});
				break;
			}
		}

		if (!isModifyRecipe && basicRecipeForm['image'].value === null) {
			setFormIsValid(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [basicRecipeForm, detailRecipeForm]);

	useEffect(() => {
		checkFormErrors();
	}, [checkFormErrors]);

	const newRecipeHandler = event => {
		event.preventDefault();

		if (formIsValid) {
			const basicDetails = {};
			for (let formElementID in basicRecipeForm) {
				basicDetails[formElementID] = basicRecipeForm[formElementID].value;
			}

			const ingredientList = [...detailRecipeForm.ingredients.value];
			const directionList = [...detailRecipeForm.directions.value];

			const image = basicDetails['image'];

			if (recipeId === -1) {
				onCreateRecipe(
					basicDetails,
					ingredientList,
					directionList,
					creatorId,
					image,
					token
				);
			} else {
				const recipeObjId = recipes[recipeId].id;
				onUpdateRecipe(
					basicDetails,
					ingredientList,
					directionList,
					recipeObjId,
					token
				);
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
			valid: true,
			touched: true,
		});

		const updatedForm = updateObject(detailRecipeForm, {
			[list]: updatedList,
		});

		setDetailRecipeForm(updatedForm);
	};

	const imageInputHandler = (id, file, isFileValid) => {
		const updatedFormElement = updateObject(basicRecipeForm[id], {
			value: file,
			valid: isFileValid,
		});

		const updatedForm = updateObject(basicRecipeForm, {
			[id]: updatedFormElement,
		});

		setBasicRecipeForm(updatedForm);
	};

	const handleAlertClose = () => {
		setAlert({ ...alert, open: false });
	};

	const handleSnackbarClose = () => {
		setIsSnackBarOpen(false);
	};

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
					color='secondary'
					defaultValue={
						isModifyLocalStorage === 'true' ? oldRecipeDetails.recipeName : ''
					} // previously isModifyRecipe from Redux store
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
					isModify={isModifyLocalStorage === 'true'} // previously isModifyRecipe from Redux store
					oldDetails={oldRecipeDetails}
					errors={textInputErrors}
				/>
			</Grid>
			<Grid item>
				{!isModifyRecipe ? (
					<ImageUpload
						id='image'
						onInput={imageInputHandler}
						errorText='No image selected!'
					/>
				) : null}
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
						isModify={isModifyLocalStorage === 'true'} // previously isModifyRecipe from Redux store
						oldDetails={oldRecipeDetails}
					/>
				</Grid>
			</Grid>
			<Grid item className={classes.divider}>
				<Divider />
			</Grid>
			<Grid item>
				{!isLoading ? (
					<Button
						disabled={!formIsValid}
						className={classes.saveRecipeButton}
						style={{ maxWidth: '140px', minWidth: '140px' }}
						onClick={newRecipeHandler}
					>
						Save Recipe
					</Button>
				) : (
					<CircularProgress
						className={classes.circProgressContainer}
						color='secondary'
						size={50}
						thickness={4.0}
					/>
				)}
			</Grid>
		</React.Fragment>
	);

	const createRecipeRedirect = isRecipeCreated ? (
		<Redirect to={`/recipes/${creatorId}`} />
	) : null;

	let snackbar;
	if (error) {
		snackbar = (
			<Snackbar
				open={isSnackbarOpen}
				autoHideDuration={5000}
				onClose={handleSnackbarClose}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert severity='error' variant='filled' elevation={5}>
					{error}
				</Alert>
			</Snackbar>
		);
	} else if (alert.message) {
		snackbar = (
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
		);
	}

	return (
		<div className={!isModifyRecipe ? classes.root : classes.rootModifyRecipe}>
			{createRecipeRedirect}
			{snackbar}
			<Paper className={classes.background} square>
				<Grid container direction='column' alignItems='center'>
					{form}
				</Grid>
			</Paper>
		</div>
	);
};

export default CreateRecipePage;
