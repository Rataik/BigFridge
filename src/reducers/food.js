import {FetchFoodSuccess, HasErrored, IsLoading} from "../constants/actionTypes";

export function hasErrored(state = false, action) {
  switch (action.type) {
    case HasErrored:
      return action.hasErrored;

    default:
      return state;
  }
}

export function isLoading(state = false, action) {
  switch (action.type) {
    case IsLoading:
      return action.isLoading;

    default:
      return state;
  }
}

export function foodItems (state = [], action) {
  switch (action.type) {
    case FetchFoodSuccess:
      return (state.items && state.items.concat(action.data.items)) || action.data.items;
    default:
      return state;
  }
}

// export function section (sectionKey, state = {}, action) {
//   switch (action.type) {
//     case FetchFoodSuccess:
//       return (state.items && state.items.concat(action.data.items)) || action.data.items;
//     default:
//       return state;
//   }
// }
