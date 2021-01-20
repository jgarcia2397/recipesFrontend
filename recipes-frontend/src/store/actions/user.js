import * as actionTypes from './actionTypes';
import axiosRecipes from '../../axios-recipes';

export const setNameAndTitleStart = () => {
	return {
		type: actionTypes.SET_NAME_AND_TITLE_START,
	};
};

export const setNameAndTitleSuccess = (nameVal, titleVal) => {
	return {
		type: actionTypes.SET_NAME_AND_TITLE_SUCCESS,
		name: nameVal,
		title: titleVal,
	};
};

export const setNameAndTitleFailed = error => {
	return {
		type: actionTypes.SET_NAME_AND_TITLE_FAILED,
		error: error,
	};
};

export const setNameAndTitle = (
	userId,
	newName,
	newTitle,
	aboutMe,
	favesToCook,
	image
) => {
	return dispatch => {
		dispatch(setNameAndTitleStart());

		const updatedUserData = {
			name: newName,
			title: newTitle,
			aboutMe,
			favesToCook,
			image,
		};

		axiosRecipes
			.patch(`/user/${userId}`, updatedUserData)
			.then(response => {
				dispatch(
					setNameAndTitleSuccess(
						response.data.user.name,
						response.data.user.title
					)
				);
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						setNameAndTitleFailed(
							'There is a network problem, please try again later.'
						)
					);
				} else {
					dispatch(setNameAndTitleFailed(err.response.data.message));
				}
			});
	};
};

export const setProfilePicStart = () => {
	return {
		type: actionTypes.SET_PROFILE_PIC_START,
	};
};

export const setProfilePicSuccess = newImage => {
	return {
		type: actionTypes.SET_PROFILE_PIC_SUCCESS,
		image: newImage,
	};
};

export const setProfilePicFailed = error => {
	return {
		type: actionTypes.SET_PROFILE_PIC_FAILED,
		error: error,
	};
};

export const setProfilePic = (userId, image) => {
	return dispatch => {
		dispatch(setProfilePicStart());

		const formData = new FormData();
		formData.append('image', image);

		axiosRecipes
			.patch(`/user/profilePic/${userId}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
			.then(response => {
				dispatch(setProfilePicSuccess(response.data.user.image));
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						setProfilePicFailed(
							'There is a network problem, please try again later.'
						)
					);
				} else {
					dispatch(setProfilePicFailed(err.response.data.message));
				}
			});
	};
};

export const setAboutMeStart = () => {
	return {
		type: actionTypes.SET_ABOUT_ME_START,
	};
};

export const setAboutMeSuccess = newValue => {
	return {
		type: actionTypes.SET_ABOUT_ME_SUCCESS,
		value: newValue,
	};
};

export const setAboutMeFailed = error => {
	return {
		type: actionTypes.SET_ABOUT_ME_FAILED,
		error: error,
	};
};

export const setAboutMe = (
	userId,
	name,
	title,
	newAboutMeValue,
	favesToCook,
	image
) => {
	return dispatch => {
		dispatch(setAboutMeStart());

		const updatedUserData = {
			name,
			title,
			aboutMe: newAboutMeValue,
			favesToCook,
			image,
		};

		axiosRecipes
			.patch(`/user/${userId}`, updatedUserData)
			.then(response => {
				dispatch(setAboutMeSuccess(response.data.user.aboutMe));
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						setAboutMeFailed(
							'There is a network problem, please try again later.'
						)
					);
				} else {
					dispatch(setAboutMeFailed(err.response.data.message));
				}
			});
	};
};

export const setFavesToCookStart = () => {
	return {
		type: actionTypes.SET_FAVE_COOKS_START,
	};
};

export const setFavesToCookSuccess = newValue => {
	return {
		type: actionTypes.SET_FAVE_COOKS_SUCCESS,
		value: newValue,
	};
};

export const setFavesToCookFailed = error => {
	return {
		type: actionTypes.SET_FAVE_COOKS_FAILED,
		error: error,
	};
};

export const setFavesToCook = (
	userId,
	name,
	title,
	aboutMe,
	newFavesToCook,
	image
) => {
	return dispatch => {
		dispatch(setFavesToCookStart());

		const updatedUserData = {
			name,
			title,
			aboutMe,
			favesToCook: newFavesToCook,
			image,
		};

		axiosRecipes
			.patch(`/user/${userId}`, updatedUserData)
			.then(response => {
				dispatch(setFavesToCookSuccess(response.data.user.favesToCook));
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						setFavesToCookFailed(
							'There is a network problem, please try again later.'
						)
					);
				} else {
					dispatch(setFavesToCookFailed(err.response.data.message));
				}
			});
	};
};

export const getUserStart = () => {
	return {
		type: actionTypes.GET_USER_START,
	};
};

export const getUserSuccess = (
	name,
	title,
	aboutMe,
	favesToCook,
	profilePic
) => {
	return {
		type: actionTypes.GET_USER_SUCCESS,
		name,
		title,
		aboutMe,
		favesToCook,
		profilePic,
	};
};

export const getUserFailed = error => {
	return {
		type: actionTypes.GET_USER_FAILED,
		error: error,
	};
};

export const getUser = userId => {
	return dispatch => {
		dispatch(getUserStart());

		axiosRecipes
			.get(`/user/${userId}`)
			.then(response => {
				dispatch(
					getUserSuccess(
						response.data.user.name,
						response.data.user.title,
						response.data.user.aboutMe,
						response.data.user.favesToCook,
						response.data.user.image
					)
				);
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						getUserFailed('There is a network problem, please try again later.')
					);
				} else {
					dispatch(getUserFailed(err.response.data.message));
				}
			});
	};
};

export const getOtherUserIdStart = () => {
	return {
		type: actionTypes.GET_OTHER_USER_ID_START,
	};
};

export const getOtherUserIdSuccess = otherUserId => {
	return {
		type: actionTypes.GET_OTHER_USER_ID_SUCCESS,
		otherUserId,
	};
};

export const getOtherUserIdFailed = error => {
	return {
		type: actionTypes.GET_OTHER_USER_ID_FAILED,
		error: error,
	};
};

export const getOtherUserId = fullName => {
	return dispatch => {
		dispatch(getOtherUserIdStart());

		axiosRecipes
			.get('/user/search/name', { params: { username: fullName } })
			.then(response => {
				dispatch(getOtherUserIdSuccess(response.data.user.id));
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						getOtherUserIdFailed('There is a network problem, please try again later.')
					);
				} else {
					dispatch(getOtherUserIdFailed(err.response.data.message));
				}
			});
	};
};

export const autoLoginStart = () => {
	return {
		type: actionTypes.AUTO_LOGIN_START,
	};
};

// export const autoLoginSuccess = (userId, token) => {
export const autoLoginSuccess = (userId, token, expiration) => {
	return {
		type: actionTypes.AUTO_LOGIN_SUCCESS,
		// email: email,
		id: userId,
		token,
		expiration,
	};
};

export const autoLoginFailed = error => {
	return {
		type: actionTypes.AUTO_LOGIN_FAILED,
		error: error,
	};
};

// export const autoLogin = (userId, token) => {
export const autoLogin = (userId, token, expiration) => {
	return dispatch => {
		dispatch(autoLoginStart());

		try {
			// dispatch(autoLoginSuccess(userId, token));
			dispatch(autoLoginSuccess(userId, token, expiration));
		} catch (err) {
			dispatch(autoLoginFailed(err));
		}
	};
};

export const authLogout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT,
	};
};

export const authLoginStart = () => {
	return {
		type: actionTypes.AUTH_LOGIN_START,
		// isLoggedIn: false,
	};
};

export const authLoginSuccess = (email, userId, token) => {
	return {
		type: actionTypes.AUTH_LOGIN_SUCCESS,
		email: email,
		id: userId,
		token,
		// isLoggedIn: true,
	};
};

export const authLoginFailed = error => {
	return {
		type: actionTypes.AUTH_LOGIN_FAILED,
		error: error,
		// isLoggedIn: false,
	};
};

export const authLogin = (email, password) => {
	return dispatch => {
		dispatch(authLoginStart());

		const authData = {
			email,
			password,
		};

		axiosRecipes
			.post('/user/login', JSON.stringify(authData))
			.then(response => {
				dispatch(
					authLoginSuccess(
						response.data.email,
						response.data.userId,
						response.data.token
					)
				);
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						authLoginFailed(
							'There is a network problem, please try again later.'
						)
					);
				} else {
					dispatch(authLoginFailed(err.response.data.message));
				}
			});
	};
};

export const authSignupStart = () => {
	return {
		type: actionTypes.AUTH_SIGNUP_START,
		// isLoggedIn: false,
	};
};

export const authSignupSuccess = (email, userId, token) => {
	return {
		type: actionTypes.AUTH_SIGNUP_SUCCESS,
		email: email,
		id: userId,
		token,
		// isLoggedIn: true,
	};
};

export const authSignupFailed = error => {
	return {
		type: actionTypes.AUTH_SIGNUP_FAILED,
		error: error,
		// isLoggedIn: false,
	};
};

export const authSignup = (name, email, password) => {
	return dispatch => {
		dispatch(authSignupStart());

		const authData = {
			name,
			email,
			password,
		};

		axiosRecipes
			.post('/user/signup', JSON.stringify(authData))
			.then(response => {
				dispatch(
					authSignupSuccess(
						response.data.email,
						response.data.userId,
						response.data.token
					)
				);
			})
			.catch(err => {
				if (!err.response) {
					dispatch(
						authSignupFailed(
							'There is a network problem, please try again later.'
						)
					);
				} else {
					dispatch(authSignupFailed(err.response.data.message));
				}
			});
	};
};
