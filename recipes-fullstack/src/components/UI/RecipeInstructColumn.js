import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';

import RecipeList from './RecipeList';
import Modal from './Modal';

const useStyles = makeStyles(theme => ({
	titles: {
		marginTop: '35px',
		marginLeft: '15px',
		fontWeight: 'bold',
		[theme.breakpoints.down('xs')]: {
			marginTop: '15px',
		},
	},
	addButtonContainer: {
		marginTop: '15px',
		width: '100%',
		textAlign: 'center',
		[theme.breakpoints.down('xs')]: {
			marginTop: '5px',
		},
	},
}));

const RecipeInstructColumn = props => {
	const classes = useStyles();
	const theme = useTheme();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [clickedButton, setClickedButton] = useState('Add New');
	const [listIndex, setListIndex] = useState(-1);
	const [textToEdit, setTextToEdit] = useState('');

	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	const modalOpenHandler = () => {
		setIsModalOpen(true);
	};

	const modalCloseHandler = () => {
		setIsModalOpen(false);
	};

	const buttonClickHandler = (buttonType, index, textToEdit) => {
		setListIndex(index);
		setClickedButton(buttonType);

		if (buttonType === 'Edit') {
			setTextToEdit(textToEdit);
		} else {
			setTextToEdit('');
		}

		modalOpenHandler();
	};

	const addButton = props.isNewRecipe ? (
		<Button
			onClick={() => {
				buttonClickHandler('Add New', -1, '');
			}}
		>
			<AddCircleOutlinedIcon />
		</Button>
	) : null;

	return (
		<React.Fragment>
			<Typography variant={matchesXS ? 'h5' : 'h4'} className={classes.titles}>
				{props.label}
			</Typography>
			<RecipeList
				array={props.array}
				isNewRecipe={props.isNewRecipe}
				clicked={buttonClickHandler}
			/>
			<div className={classes.addButtonContainer}>
				{addButton}
			</div>
			<Modal
				isOpen={isModalOpen}
				modalCloseHandler={modalCloseHandler}
				mode={clickedButton}
				type={props.label}
				listChange={props.changedList}
				clickedListIndex={listIndex}
				textToEdit={textToEdit}
			/>
		</React.Fragment>
	);
};

export default RecipeInstructColumn;
