import { combineReducers } from 'redux'
import text from './text'
import heading from './heading'

const textApp = combineReducers({
	text,
  heading
})

export default textApp;