export const updateObject = (oldObject, updatedProperties) => {
	return {
		...oldObject,
		...updatedProperties,
	};
};

export const checkInputValidity = (value, rules) => {
	let isValid = true;

	if (!rules) {
		return true;
	}

	if (rules.required) {
		isValid = value.trim() !== '' && isValid;
	}

	if (rules.isNumeric) {
		const pattern = /^[1-9][0-9]*$/; // This regex does not allow 0 as first digit (or a single 0 not allowed). Any number from 1 to infinity allowed.
		isValid = pattern.test(value) && isValid;
	}

	return isValid;
};

export const formatNameHelper = name => {
	const nameArr = name.split(' ');

	let finalName;
	if (nameArr.length > 1) {
		const firstName =
			nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1).toLowerCase();
		const lastName =
			nameArr[1].charAt(0).toUpperCase() + nameArr[1].slice(1).toLowerCase();

		finalName = firstName + ' ' + lastName;
	} else {
		finalName =
			nameArr[0].charAt(0).toUpperCase() + nameArr[0].slice(1).toLowerCase();
	}

	return finalName;
};
