import { combineReducers } from 'redux';
import index from './test';
import userInfo from './userInfo';

export default combineReducers({
  index,
  userInfo
});
