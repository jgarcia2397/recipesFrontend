import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import UserProfile from '../UI/UserProfile';
import RecipeCard from '../UI/RecipeCard';
import Modal from '../UI/Modal';

import * as actions from '../../store/actions/index';

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
	profileDetailsContainer: {
		marginTop: '55px',
	},
	profileHeadings: {
		paddingLeft: '550px',
		paddingRight: '550px',
		paddingBottom: '25px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '320px',
			paddingRight: '320px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '200px',
			paddingRight: '200px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '90px',
			paddingRight: '90px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '30px',
			paddingRight: '30px',
		},
	},
	profileText: {
		paddingLeft: '550px',
		paddingRight: '550px',
		paddingBottom: '75px',
		[theme.breakpoints.down('lg')]: {
			paddingLeft: '320px',
			paddingRight: '320px',
		},
		[theme.breakpoints.down('md')]: {
			paddingLeft: '200px',
			paddingRight: '200px',
		},
		[theme.breakpoints.down('sm')]: {
			paddingLeft: '90px',
			paddingRight: '90px',
		},
		[theme.breakpoints.down('xs')]: {
			paddingLeft: '30px',
			paddingRight: '30px',
		},
	},
	recipeCardsContainer: {
		margin: '30px auto',
	},
	editButton: {
		...theme.typography.button,
		marginLeft: '25px',
		lineHeight: '1.25',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
		[theme.breakpoints.down('xs')]: {
			marginLeft: '0px',
			marginTop: '15px',
		},
	},
}));

const ProfilePage = props => {
	const classes = useStyles();
	const theme = useTheme();

	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [clickedButton, setClickedButton] = useState('Edit');
	// const [listIndex, setListIndex] = useState(-1);
	const [editType, setEditType] = useState('');
	const [textToEdit, setTextToEdit] = useState('');
	// const [aboutMe, setAboutMe] = useState('Tell us a bit about yourself!');
	// const [favThingsToCook, setFavThingsToCook] = useState('Feel free to brag about your most famous dishes!');
	const editTypes = ['About Me', 'Favourite Things to Cook'];

	const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	const dispatch = useDispatch();

	const recipes = useSelector(state => state.createRecipe.recipes);
	const name = useSelector(state => state.user.name);
	const title = useSelector(state => state.user.title);
	const aboutMe = useSelector(state => state.user.aboutMe);
	const favThingsToCook = useSelector(state => state.user.favesToCook);
	// const userId = useSelector(state => state.user.userId);
	const userId = useParams().userId;

	const onSetNameAndTitle = (uid, name, title, aboutMe, favesToCook) =>
		dispatch(actions.setNameAndTitle(uid, name, title, aboutMe, favesToCook));

	const onSetAboutMe = (uid, name, title, newAboutMeValue, favesToCook) =>
		dispatch(
			actions.setAboutMe(uid, name, title, newAboutMeValue, favesToCook)
		);

	const onSetFavesToCook = (uid, name, title, aboutMe, newFavesToCookValue) =>
		dispatch(
			actions.setFavesToCook(uid, name, title, aboutMe, newFavesToCookValue)
		);

	const onGetUser = useCallback(userId => dispatch(actions.getUser(userId)), [
		dispatch,
	]);

	const onGetAllUserRecipes = useCallback(
		uid => dispatch(actions.getAllUserRecipes(uid)),
		[dispatch]
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
		onGetUser(userId);
		onGetAllUserRecipes(userId);
	}, [
		onGetUser,
		onGetAllUserRecipes,
		userId,
	]);

	const modalOpenHandler = () => {
		setIsModalOpen(true);
	};

	const modalCloseHandler = () => {
		setIsModalOpen(false);
	};

	const buttonClickHandler = (editType, textToEdit) => {
		if (editType === editTypes[0]) {
			setEditType(editTypes[0]);
		} else {
			setEditType(editTypes[1]);
		}
		setTextToEdit(textToEdit);

		modalOpenHandler();
	};

	const updateProfile = newTextValue => {
		if (editType === editTypes[0]) {
			onSetAboutMe(userId, name, title, newTextValue, favThingsToCook);
		} else {
			onSetFavesToCook(userId, name, title, aboutMe, newTextValue);
		}
	};

	return (
		<div className={classes.root}>
			<Paper className={classes.background} square>
				<Grid
					container
					direction='column'
					className={classes.profileDetailsContainer}
				>
					<Grid item>
						<UserProfile
							updateHandler={onSetNameAndTitle}
							uid={userId}
							name={name}
							title={title}
							aboutMe={aboutMe}
							favesToCook={favThingsToCook}
						/>
					</Grid>
					<Grid item className={classes.profileHeadings}>
						<Grid
							container
							direction={matchesXS ? 'column' : 'row'}
							alignItems='center'
						>
							<Grid item>
								<Typography
									variant='h4'
									style={{ fontWeight: 'bold' }}
									align={matchesSM ? 'center' : 'left'}
								>
									About Me
								</Typography>
							</Grid>
							<Grid item>
								<Button
									className={classes.editButton}
									onClick={() => buttonClickHandler(editTypes[0], aboutMe)}
								>
									Edit
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.profileText}>
						<Typography variant='body1' align={matchesSM ? 'center' : 'left'}>
							{aboutMe}
						</Typography>
					</Grid>
					<Grid item className={classes.profileHeadings}>
						<Grid
							container
							direction={matchesXS ? 'column' : 'row'}
							alignItems='center'
						>
							<Grid item>
								<Typography
									variant='h4'
									style={{ fontWeight: 'bold' }}
									align={matchesSM ? 'center' : 'left'}
								>
									Favourite Things to Cook
								</Typography>
							</Grid>
							<Grid item>
								<Button
									className={classes.editButton}
									onClick={() =>
										buttonClickHandler(editTypes[1], favThingsToCook)
									}
								>
									Edit
								</Button>
							</Grid>
						</Grid>
					</Grid>
					<Grid item className={classes.profileText}>
						<Typography variant='body1' align={matchesSM ? 'center' : 'left'}>
							{favThingsToCook}
						</Typography>
					</Grid>
					<Grid item className={classes.profileHeadings}>
						<Typography
							variant='h4'
							style={{ fontWeight: 'bold' }}
							align={matchesSM ? 'center' : 'left'}
						>
							Recipe Preview
						</Typography>
					</Grid>
					<Grid item className={classes.recipeCardsContainer}>
						{recipes.map((recipe, index) => (
							<RecipeCard
								key={index}
								id={index}
								image={recipe.image}
								recipeName={recipe.basicDetails.recipeName}
								prepTime={recipe.basicDetails.prepTime}
								cookTime={recipe.basicDetails.cookTime}
								prepTimeUnits={recipe.basicDetails.prepTimeUnits}
								cookTimeUnits={recipe.basicDetails.cookTimeUnits}
								setTabValue={setTabValue}
							/>
						))}
					</Grid>
				</Grid>
				<Modal
					isOpen={isModalOpen}
					modalCloseHandler={modalCloseHandler}
					mode={'Edit'}
					type={editType}
					updateProfile={updateProfile}
					textToEdit={textToEdit}
				/>
			</Paper>
		</div>
	);
};

export default ProfilePage;
