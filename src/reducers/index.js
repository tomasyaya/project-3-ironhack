import { combineReducer } from 'redux';
import errorReducer from './errorReducer';

export default combineReducer({
  errorHandler: errorReducer
})