import {
  AssociatedPropertiesFetchSuccess,
  AssociatedPropertiesFetchIsLoading,
  AssociatedPropertiesFetchHasErrored,
  ByPurchasedAfterExpirationBucketedByFoodFetchSuccess,
  ByPurchasedAfterExpirationBucketedByFoodFetchIsLoading,
  ByPurchasedAfterExpirationBucketedByFoodFetchHasErrored,
  ByMonthPurchasedBucketedByFoodFetchSuccess,
  ByMonthPurchasedBucketedByFoodFetchIsLoading,
  ByMonthPurchasedBucketedByFoodFetchHasErrored,
} from '../constants/actionTypes';
import Pages from '../constants/SiteMap';

const initialState = {};
Pages.filter(page => !page.isHome).forEach(page => (
  page.sections.forEach((section) => {
    initialState[section.reducerName] = {
      hasErrored: false,
      isLoading: false,
      foodItems: [],
    };
  })
));

function bigFridge(state = initialState, action) {
  switch (action.type) {
    case ByMonthPurchasedBucketedByFoodFetchHasErrored:
      return {
        ...state,
        quantityByMonthPurchasedBucketedByFood: {
          ...state.quantityByMonthPurchasedBucketedByFood,
          hasErrored: action.hasErrored,
        },
      };

    case ByPurchasedAfterExpirationBucketedByFoodFetchHasErrored:
      return {
        ...state,
        quantityByPurchasedAfterExpirationBucketedByFood: {
          ...state.quantityByPurchasedAfterExpirationBucketedByFood,
          hasErrored: action.hasErrored,
        },
      };

    case AssociatedPropertiesFetchHasErrored:
      return {
        ...state,
        listAssociatedProperties: {
          ...state.listAssociatedProperties,
          hasErrored: action.hasErrored,
        },
      };

    case ByMonthPurchasedBucketedByFoodFetchIsLoading:
      return {
        ...state,
        quantityByMonthPurchasedBucketedByFood: {
          ...state.quantityByMonthPurchasedBucketedByFood,
          isLoading: action.isLoading,
        },
      };

    case ByPurchasedAfterExpirationBucketedByFoodFetchIsLoading:
      return {
        ...state,
        quantityByPurchasedAfterExpirationBucketedByFood: {
          ...state.quantityByPurchasedAfterExpirationBucketedByFood,
          isLoading: action.isLoading,
        },
      };

    case AssociatedPropertiesFetchIsLoading:
      return {
        ...state,
        listAssociatedProperties: {
          ...state.listAssociatedProperties,
          isLoading: action.isLoading,
        },
      };

    case ByMonthPurchasedBucketedByFoodFetchSuccess:
      return {
        ...state,
        quantityByMonthPurchasedBucketedByFood: {
          ...state.quantityByMonthPurchasedBucketedByFood,
          foodItems: state.quantityByMonthPurchasedBucketedByFood.foodItems.concat(action.data.items),
        },
      };

    case ByPurchasedAfterExpirationBucketedByFoodFetchSuccess:
      return {
        ...state,
        quantityByPurchasedAfterExpirationBucketedByFood: {
          ...state.quantityByPurchasedAfterExpirationBucketedByFood,
          foodItems: state.quantityByPurchasedAfterExpirationBucketedByFood.foodItems.concat(action.data.items),
        },
      };

    case AssociatedPropertiesFetchSuccess:
      return {
        ...state,
        listAssociatedProperties: {
          ...state.listAssociatedProperties,
          foodItems: state.listAssociatedProperties.foodItems.concat(action.data.items),
        },
      };

    default:
      return state;
  }
}

export default bigFridge;
