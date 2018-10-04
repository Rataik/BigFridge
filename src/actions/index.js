import fetchData, { pauseFetchRequest } from './utilityActions';
import {
  AssociatedPropertiesFetchSuccess,
  AssociatedPropertiesFetchIsLoading,
  AssociatedPropertiesFetchPause,
  AssociatedPropertiesFetchHasErrored,
  ByPurchasedAfterExpirationBucketedByFoodFetchSuccess,
  ByPurchasedAfterExpirationBucketedByFoodFetchIsLoading,
  ByPurchasedAfterExpirationBucketedByFoodFetchHasErrored,
  ByMonthPurchasedBucketedByFoodFetchSuccess,
  ByMonthPurchasedBucketedByFoodFetchIsLoading,
  ByMonthPurchasedBucketedByFoodFetchHasErrored,
} from '../constants/actionTypes';
import parseFoodData from './foodActions';

export const fetchByMonthPurchasedBucketedByFoodData = (urls, fetchDelay, sectionIndex, parseFoodDataArgs) => fetchData(
  urls,
  fetchDelay,
  sectionIndex,
  parseFoodData,
  parseFoodDataArgs,
  ByMonthPurchasedBucketedByFoodFetchSuccess,
  ByMonthPurchasedBucketedByFoodFetchIsLoading,
  ByMonthPurchasedBucketedByFoodFetchHasErrored,
);

export const fetchByPurchasedAfterExpirationBucketedByFoodData = (urls, fetchDelay, sectionIndex, parseFoodDataArgs) => fetchData(
  urls,
  fetchDelay,
  sectionIndex,
  parseFoodData,
  parseFoodDataArgs,
  ByPurchasedAfterExpirationBucketedByFoodFetchSuccess,
  ByPurchasedAfterExpirationBucketedByFoodFetchIsLoading,
  ByPurchasedAfterExpirationBucketedByFoodFetchHasErrored,
);

export const fetchAssociatedPropertiesData = (urls, fetchDelay, sectionIndex, parseFoodDataArgs) => fetchData(
  urls,
  fetchDelay,
  sectionIndex,
  parseFoodData,
  parseFoodDataArgs,
  AssociatedPropertiesFetchSuccess,
  AssociatedPropertiesFetchIsLoading,
  AssociatedPropertiesFetchHasErrored,
);

export const pauseFetchAssociatedPropertiesData = (pause, sectionIndex) => pauseFetchRequest(AssociatedPropertiesFetchPause, sectionIndex, pause);
