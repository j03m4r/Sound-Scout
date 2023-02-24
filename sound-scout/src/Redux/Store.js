import { createStore, combineReducers, applyMiddleware} from 'redux';
import Authentication from './Reducers/Authentication';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  Authentication
});
 
export const store = createStore(rootReducer, applyMiddleware(thunk));