import React, { useState } from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import Modal from './Modal';

import profile from '../../assets/blankProfile.png';

const useStyles = makeStyles(theme => ({
	profilePic: {
		height: '225px',
		width: '225px',
		[theme.breakpoints.down('sm')]: {
			height: '195px',
			width: '195px',
		},
		'&:hover': {
			cursor: 'pointer',
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
	circProgContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
}));

const UserProfile = props => {
	const classes = useStyles();
	const theme = useTheme();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalType, setModalType] = useState('');

	const matchesXS = useMediaQuery(theme.breakpoints.down('xs'));

	const modalOpenHandler = () => {
		setIsModalOpen(true);
	};

	const modalCloseHandler = () => {
		setIsModalOpen(false);
	};

	const buttonClickHandler = () => {
		setModalType('Name and Title');
		modalOpenHandler();
	};

	const updateProfile = (name, title) => {
		props.updateHandler(
			props.uid,
			props.uidRedux,
			props.token,
			name,
			title,
			props.aboutMe,
			props.favesToCook,
			props.profilePic
		);
	};

	const updateProfilePic = image => {
		props.updatePicHandler(props.uid, props.uidRedux, props.token, image);
	};

	const chooseProfilePicHandler = () => {
		setModalType('Profile Pic');
		modalOpenHandler();
	};

	const circularProgress = (
		<div className={classes.circProgContainer}>
			<CircularProgress color='secondary' size={55} thickness={3.5} />
		</div>
	);

	return (
		<React.Fragment>
			{props.isLoading ? (
				circularProgress
			) : (
				<Grid
					container
					direction={matchesXS ? 'column' : 'row'}
					justify='center'
					alignItems='center'
					className={classes.profileContainer}
				>
					<Grid item>
						<Avatar
							alt='Profile Pic'
							className={classes.profilePic}
							src={
								props.profilePic
									? `${process.env.REACT_APP_ASSET_URL}/${props.profilePic}`
									: profile
							}
							onClick={chooseProfilePicHandler}
							style={{ boxShadow: theme.shadows[5] }}
						/>
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
								{!props.isOwnProfile ? null : (
									<Button
										className={classes.editButton}
										onClick={() => buttonClickHandler()}
									>
										Edit
									</Button>
								)}
							</Grid>
						</Grid>
					</Grid>
				</Grid>
			)}
			<Modal
				isOpen={isModalOpen}
				modalCloseHandler={modalCloseHandler}
				mode={'Edit'}
				type={modalType}
				updateProfile={updateProfile}
				updateProfilePic={updateProfilePic}
				name={props.name}
				title={props.title}
				isLoading={props.isLoading}
			/>
		</React.Fragment>
	);
};

export default UserProfile;
