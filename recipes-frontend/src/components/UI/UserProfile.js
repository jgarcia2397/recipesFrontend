import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import Modal from './Modal';

import profile from '../../assets/blankProfile.png';

const useStyles = makeStyles(theme => ({
	profilePic: {
		backgroundImage: `url(${profile})`,
		backgroundPosition: 'center',
		backgroundSize: 'cover',
		backgroundRepeat: 'no-repeat',
		borderRadius: 120,
		height: '225px',
		width: '225px',
		[theme.breakpoints.down('sm')]: {
			height: '195px',
			width: '195px',
		},
	},
	profileContainer: {
		marginBottom: '50px',
	},
	profileTitlesContainer: {
		marginLeft: '55px',
		height: '100%',
		[theme.breakpoints.down('xs')]: {
			marginLeft: '0px',
			marginTop: '35px',
		},
	},
	editButton: {
		...theme.typography.button,
		marginTop: '15px',
		lineHeight: '1.25',
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
	editButtonContainer: {
		textAlign: 'center',
	},
}));

const UserProfile = props => {
	const classes = useStyles();
	const theme = useTheme();

	// const [name, setName] = useState('Your Name');
	// const [title, setTitle] = useState('Your Title');
	const [isModalOpen, setIsModalOpen] = useState(false);
	// const [editType, setEditType] = useState('');
	// const [textToEdit, setTextToEdit] = useState('');

	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	const modalOpenHandler = () => {
		setIsModalOpen(true);
	};

	const modalCloseHandler = () => {
		setIsModalOpen(false);
	};

	const buttonClickHandler = () => {
		modalOpenHandler();
	};

	const updateProfile = (name, title) => {
		// setName(name);
		// setTitle(title);
		props.updateHandler(name, title);
	};

	return (
		<React.Fragment>
			<Grid
				container
				direction={matchesXS ? 'column' : 'row'}
				justify='center'
				alignItems='center'
				className={classes.profileContainer}
			>
				<Grid item>
					<Paper className={classes.profilePic} elevation={3} />
				</Grid>
				<Grid item>
					<Grid
						container
						direction='column'
						justify='center'
						className={classes.profileTitlesContainer}
					>
						<Grid item>
							<Typography variant='h3' align={matchesXS ? 'center' : 'left'}>
								{props.name}
							</Typography>
						</Grid>
						<Grid item>
							<Typography variant='h4' align={matchesXS ? 'center' : 'left'}>
								{props.title}
							</Typography>
						</Grid>
						<Grid item className={classes.editButtonContainer}>
							<Button
								className={classes.editButton}
								onClick={() => buttonClickHandler()}
							>
								Edit
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</Grid>
			<Modal
				isOpen={isModalOpen}
				modalCloseHandler={modalCloseHandler}					
				mode={'Edit'}
				type={'Name and Title'}
				updateProfile={updateProfile}	
				name={props.name}
				title={props.title}
			/>
		</React.Fragment>
	);
};

export default UserProfile;
