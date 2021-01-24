import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';

import Modal from './Modal';

const useStyles = makeStyles(theme => ({
	infoContainer: {
		width: '100%',
		height: '100%',
	},
	recipeImageContainer: {
		marginBottom: '75px',
		height: '20%',
		width: '70%',
		[theme.breakpoints.down('md')]: {
			marginBottom: '35px',
			height: '40%',
			width: '35%',
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '10px',
			height: '30%',
			width: '30%',
		},
	},
	recipeImage: {
		borderRadius: 10,
		width: '100%',
		height: '100%',
	},
	recipeTitle: {
		marginBottom: '25px',
		[theme.breakpoints.down('md')]: {
			marginBottom: '10px',
		},
	},
	info: {
		marginBottom: '15px',
		[theme.breakpoints.down('md')]: {
			marginBottom: '2.5px',
		},
	},
	modifyRecipeButton: {
		...theme.typography.button,
		marginTop: '25px',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},
	},
	deleteRecipeButton: {
		...theme.typography.button,
		marginTop: '15px',
		borderRadius: 50,
		backgroundColor: theme.palette.error.main,
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
		[theme.breakpoints.down('xs')]: {
			marginTop: '10px',
		},
	},
}));

const RecipeInfoColumn = props => {
	const classes = useStyles();
	const theme = useTheme();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState('');

	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	const recipeDetails = {
		recipeName: props.recipeName,
		prepTime: props.prepTime,
		prepTimeUnits: props.prepTimeUnits,
		cookTime: props.cookTime,
		cookTimeUnits: props.cookTimeUnits,
		servings: props.servings,
		difficulty: props.difficulty,
		ingredientArray: props.ingredientArray,
		directionsArray: props.directionsArray,
	};

	const modalOpenHandler = () => {
		setIsModalOpen(true);
	};

	const modalCloseHandler = () => {
		setIsModalOpen(false);
	};

	const buttonClickHandler = () => {
		setModalType('Recipe');
		modalOpenHandler();
	};

	const buttons =
		props.userId === props.creatorId ? (
			<React.Fragment>
				<Grid item>
					<Button
						className={classes.modifyRecipeButton}
						component={Link}
						to={{
							pathname: '/new-recipe',
							recipeDetails: recipeDetails,
						}}
						onClick={() => props.recipeInit(props.recipeIndex, recipeDetails)}
					>
						Modify Recipe
					</Button>
				</Grid>
				<Grid item>
					<Button
						className={classes.deleteRecipeButton}
						onClick={() => buttonClickHandler()}
					>
						Delete Recipe
					</Button>
				</Grid>
			</React.Fragment>
		) : null;

	return (
		<React.Fragment>
			<Grid
				container
				alignItems='center'
				justify='center'
				direction='column'
				className={classes.infoContainer}
			>
				<Grid item className={classes.recipeImageContainer}>
					<Avatar
						alt='Recipe Pic'
						variant='square'
						className={classes.recipeImage}
						src={`http://localhost:5000/${props.image}`}
						style={{ boxShadow: theme.shadows[5] }}
					/>
				</Grid>
				<Grid item>
					<Typography
						variant={matchesXS ? 'h4' : 'h3'}
						className={classes.recipeTitle}
					>
						{props.recipeName}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						variant={matchesXS ? 'body2' : 'body1'}
						className={classes.info}
					>
						Prep Time: {props.prepTime} {props.prepTimeUnits}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						variant={matchesXS ? 'body2' : 'body1'}
						className={classes.info}
					>
						Cook Time: {props.cookTime} {props.cookTimeUnits}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						variant={matchesXS ? 'body2' : 'body1'}
						className={classes.info}
					>
						Servings: {props.servings}
					</Typography>
				</Grid>
				<Grid item>
					<Typography
						variant={matchesXS ? 'body2' : 'body1'}
						className={classes.info}
					>
						Difficulty: {props.difficulty}
					</Typography>
				</Grid>
				{buttons}
			</Grid>
			<Modal
				isOpen={isModalOpen}
				modalCloseHandler={modalCloseHandler}
				mode={'Delete'}
				type={modalType}
				isLoading={props.isLoading}
				recipeId={props.recipeId}
				token={props.token}
				deleteRecipe={props.deleteRecipe}
			/>
		</React.Fragment>
	);
};

export default RecipeInfoColumn;
