
export const CHANGE_TEXT = 'CHANGE_TEXT'
export const CHANGE_HEADING = 'CHANGE_HEADING'
export const CHANGE_POEM = 'CHANGE_POEM'


export const changeText = function(obj) {
	return {
		type: CHANGE_TEXT,
		obj
	}	
}

export const changePoem = function(obj) {
	return {
		type: CHANGE_POEM,
		obj
	}
}

export const changeHeading = function(text) {
	return {
		type: CHANGE_HEADING,
		text
	}
}