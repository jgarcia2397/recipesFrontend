import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
	modalTitleContainer: {
		marginBottom: '15px',
	},
	contentContainer: {
		paddingLeft: '2.5em',
		paddingRight: '2.5em',
	},
	textInput: {
		width: '100%',
	},
	confirmButton: {
		...theme.typography.button,
		borderRadius: 10,
		backgroundColor: theme.palette.primary.main,
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
		// [theme.breakpoints.down('md')]: {
		// 	marginBottom: '20px',
		// },
	},
	cancelButton: {
		...theme.typography.button,
		borderRadius: 10,
		backgroundColor: theme.palette.error.main,
		'&:hover': {
			backgroundColor: theme.palette.error.dark,
		},
		// [theme.breakpoints.down('md')]: {
		// 	marginBottom: '20px',
		// },
	},
}));

const Modal = props => {
	const classes = useStyles();
	const theme = useTheme();

	const [textValue, setTextValue] = useState('');

	const { mode, textToEdit } = props;

	useEffect(() => {
		if (mode === 'Delete' || mode === 'Add New') {
			setTextValue('');
		} else if (mode === 'Edit') {
			setTextValue(textToEdit);
		}
	}, [mode, textToEdit]);

	let editType;
	let textField = (		// Set multiline TextField as default since it is used for three cases (Directions, About Me, Fav Things to Cook)
		<TextField
			id='newEntry'
			variant='outlined'
			defaultValue={textValue}
			className={classes.textInput}
			multiline
			rows={4}
			onChange={event => inputChangedHandler(event)}
		/>
	);
	if (props.type === 'Ingredients') {
		editType = 'Ingredient';
		textField = (
			<TextField
				id='newEntry'
				variant='outlined'
				defaultValue={textValue}
				className={classes.textInput}
				onChange={event => inputChangedHandler(event)}
			/>
		);
	} else if (props.type === 'Directions') {
		editType = 'Direction';
	} else if (props.type === 'About Me') {
		editType = 'About Me';
	} else if (props.type === 'Favourite Things to Cook') {
		editType = 'Favourite Things to Cook';
	}

	const inputChangedHandler = event => {
		setTextValue(event.target.value);
	};

	const updateRecipeDetailHandler = () => {
		const listType =
			props.type === 'Ingredients' ? 'ingredients' : 'directions';

		props.listChange(textValue, props.mode, listType, props.clickedListIndex);
		props.modalCloseHandler();
		setTextValue('');
	};

	const cancelHandler = () => {
		props.modalCloseHandler();
	};

	return (
		<Dialog
			style={{ zIndex: theme.zIndex.modal + 2 }}
			open={props.isOpen}
			onClose={props.modalCloseHandler}
			PaperProps={{
				style: {
					width: '150em',
				},
			}}
		>
			<DialogContent className={classes.contentContainer}>
				<Typography variant='h4' className={classes.modalTitleContainer}>
					{props.mode} {editType}
					{/* {props.type === 'Ingredients' ? 'Ingredient' : 'Direction'} */}
					{props.mode === 'Delete' ? '?' : ''}
				</Typography>
				{props.mode !== 'Delete' ? textField : null}
			</DialogContent>
			<DialogActions>
				<Button onClick={cancelHandler} className={classes.cancelButton}>
					Cancel
				</Button>
				<Button
					onClick={updateRecipeDetailHandler}
					className={classes.confirmButton}
				>
					{props.mode === 'Delete' ? 'Delete' : 'Save'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
