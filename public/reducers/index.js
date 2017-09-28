import { combineReducers } from 'redux'
import text from './text'
import heading from './heading'
import poem from './poem'

const textApp = combineReducers({
	text,
  heading,
  poem
})

export default textApp;