const heading = (state = 'heading', action) => {
	switch (action.type) {
    case 'CHANGE_HEADING':
      return action.text
    default:
      return state
  }
}

export default heading