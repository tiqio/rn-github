import { combineReducers } from 'redux';
import theme from './theme'
import popular from './popular'

/**
 * 1.合并reducer，通过combineReducers将多个reducer合并成一个根reducer
 * @type {Reducer<any> | Reducer<any, AnyAction>}
 */
const index = combineReducers({
  theme: theme,
  popular: popular,
});

export default index;
