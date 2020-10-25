import React from 'react';

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

	let textField =
		props.columnType === 'Ingredients' ? (
			<TextField
				id='newEntry'
				variant='outlined'
				className={classes.textInput}
			/>
		) : (
			<TextField
				id='newEntry'
				variant='outlined'
				className={classes.textInput}
				multiline
				rows={4}
			/>
		);

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
					{props.mode}{' '}
					{props.columnType === 'Ingredients' ? 'Ingredient' : 'Direction'}
					{props.mode === 'Delete' ? '?' : ''}
				</Typography>
				{props.mode !== 'Delete' ? textField : null}
			</DialogContent>
			<DialogActions>
				<Button
					onClick={props.modalCloseHandler}
					className={classes.cancelButton}
				>
					Cancel
				</Button>
				<Button
					onClick={props.modalCloseHandler}
					className={classes.confirmButton}
				>
					{props.mode === 'Delete' ? 'Delete' : 'Save'}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default Modal;
