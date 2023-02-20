import { createStore, combineReducers, applyMiddleware} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import Authentication from './Reducers/Authentication';
import thunk from 'redux-thunk';

const middleware = [thunk]
const rootReducer = combineReducers({
  Authentication
});
 
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));