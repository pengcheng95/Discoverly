const text = (state = {
	text: 'beg',
	change: 'false'
}, action) => {
	switch (action.type) {
    case 'CHANGE_TEXT':
      console.log('reducer', state);
      console.log(action);
      return {text: action.obj.text, change: state.change}
    default:
      return state
  }
}

export default text;