import { createStore, combineReducers, applyMiddleware} from 'redux';
import Authentication from './Reducers/Authentication';
import Spotify from './Reducers/Spotify';
import Profile from './Reducers/Profile';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  Authentication,
  Profile,
  Spotify
});
 
export const store = createStore(rootReducer, applyMiddleware(thunk));