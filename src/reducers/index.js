import { combineReducers } from 'redux';
import {foodItems, hasErrored, isLoading} from './food';
import * as siteMap from '../constants/siteMap';

// const reducers: any = {};
// siteMap.Pages.forEach((page: any) => {
//   page.sections.forEach((section: any) => {
//     reducers[section.reducerName] = food(section.reducerName);
//   });
// });

// const rootReducer = combineReducers({...reducers, hasErrored, isLoading});
const rootReducer = combineReducers({foodItems, hasErrored, isLoading});


export default rootReducer;