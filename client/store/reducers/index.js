import { combineReducers } from 'redux';

import user from './user';
import todos from './todos';
import school from './school';

const createRootReducer = routerReducer => combineReducers({
  router: routerReducer,
  user,
  todos,
  school,
});

export default createRootReducer;
