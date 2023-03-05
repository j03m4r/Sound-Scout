import { createStore, combineReducers, applyMiddleware} from 'redux';
import Authentication from './Reducers/Authentication';
import Spotify from './Reducers/Spotify'
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  Authentication,
  Spotify
});
 
export const store = createStore(rootReducer, applyMiddleware(thunk));