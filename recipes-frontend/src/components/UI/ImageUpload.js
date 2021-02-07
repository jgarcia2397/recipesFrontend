import React, { useRef, useState, useEffect, useCallback } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	root: {
		marginTop: '50px',
		marginBottom: '140px',
		[theme.breakpoints.down('sm')]: {
			marginTop: '30px',
			marginBottom: '55px',
		},
	},
	uploadContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
	uploadPreview: {
		width: '30rem',
		height: '20rem',
		border: '1px solid #000',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		textAlign: 'center',
		marginBottom: '1rem',
		[theme.breakpoints.down('sm')]: {
			width: '20rem',
			height: '15rem',
		},
		[theme.breakpoints.down('xs')]: {
			width: '17rem',
			height: '15rem',
		},
	},
	uploadImageButton: {
		...theme.typography.button,
		borderRadius: 50,
		backgroundColor: theme.palette.secondary.main,
		'&:hover': {
			backgroundColor: theme.palette.secondary.dark,
		},
	},
	image: {
		objectFit: 'cover',
		height: '100%',
		width: '100%',
	},
	errorMsgContainer: {
		...theme.typography.body1,
		color: theme.palette.error.dark,
		fontWeight: 'bold',
		textAlign: 'center',
	},
}));

const ImageUpload = props => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);

	const classes = useStyles();

	const filePickerRef = useRef();

	const uploadFile = useCallback((file, signedRequest, url) => {
		const xhr = new XMLHttpRequest();

		xhr.open('PUT', signedRequest);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					setPreviewUrl(url);
				} 
			}
		};
		xhr.send(file);
	}, []);	// previewUrl

	const getSignedRequest = useCallback(file => {
		const xhr = new XMLHttpRequest();
		xhr.open('GET', `${process.env.REACT_APP_BACKEND_URL}sign-s3?file-name=${file.name}&file-type=${file.type}`);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					const response = JSON.parse(xhr.responseText);
					uploadFile(file, response.signedRequest, response.url);
				} else {
					alert('Could not get signed URL.');
				}
			}
		};
		xhr.send();
	}, [uploadFile]);

	useEffect(() => {
		if (!file) {
			return;
		}
		// built in browser API
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		}; // once readAsDataURL() below finishes, this onLoad function will execute
		fileReader.readAsDataURL(file);

		getSignedRequest(file);
	}, [file, getSignedRequest]);

	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	const pickedHandler = event => {
		let pickedFile;
		let fileIsValid = isValid;
		if (event.target.files || event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}

		props.onInput(props.id, pickedFile, fileIsValid);
	};

	return (
		<div className={classes.root}>
			<input
				id='image-upload'
				style={{ display: 'none' }}
				type='file'
				accept='.jpg,.png,.jpeg'
				ref={filePickerRef}
				onChange={pickedHandler}
			/>
			<div className={classes.uploadContainer}>
				<Paper square elevation={3} className={classes.uploadPreview}>
					{previewUrl && (
						<img src={previewUrl} alt='preview' className={classes.image} />
					)}
					{!previewUrl && (
						<Typography variant='body1'>Please pick an image.</Typography>
					)}
				</Paper>
				<Button
					style={{ maxWidth: '140px', minWidth: '140px' }}
					className={classes.uploadImageButton}
					onClick={pickImageHandler}
				>
					Upload Image
				</Button>
			</div>
			{!isValid && (
				<p className={classes.errorMsgContainer}>{props.errorText}</p>
			)}
		</div>
	);
};

export default ImageUpload;
