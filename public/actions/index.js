
export const CHANGE_TEXT = 'CHANGE_TEXT'


export const changeText = function(text) {
	return {
		type: CHANGE_TEXT,
		text
	}	
}