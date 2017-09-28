import { combineReducers } from 'redux'
import text from './text'
import heading from './heading'
import poem from './poem'
import user from './user'

const textApp = combineReducers({
	text,
  heading,
  poem,
  user
})

export default textApp;