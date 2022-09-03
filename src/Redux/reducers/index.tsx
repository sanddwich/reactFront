import { combineReducers } from 'redux'
import app from './app'
import toast from './toast'
import modal from './modal'
import frontApp from './frontApp'

export default combineReducers({
  app,
  frontApp,
  toast,
  modal,
})