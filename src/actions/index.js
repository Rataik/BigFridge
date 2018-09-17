import {fetchData} from "./utilityActions";
import {
  AssociatedPropertiesFetchSuccess,
  AssociatedPropertiesFetchIsLoading,
  AssociatedPropertiesFetchHasErrored,
  ByPurchasedAfterExpirationBucketedByFoodFetchSuccess,
  ByPurchasedAfterExpirationBucketedByFoodFetchIsLoading,
  ByPurchasedAfterExpirationBucketedByFoodFetchHasErrored,
  ByMonthPurchasedBucketedByFoodFetchSuccess,
  ByMonthPurchasedBucketedByFoodFetchIsLoading,
  ByMonthPurchasedBucketedByFoodFetchHasErrored
  } from "../constants/actionTypes";
import {parseFoodData} from "./foodActions";

export const fetchByMonthPurchasedBucketedByFoodData = (urls, args) => fetchData(urls, parseFoodData, args, ByMonthPurchasedBucketedByFoodFetchSuccess, ByMonthPurchasedBucketedByFoodFetchIsLoading, ByMonthPurchasedBucketedByFoodFetchHasErrored);
export const fetchByPurchasedAfterExpirationBucketedByFoodData = (urls, args) => fetchData(urls, parseFoodData, args, ByPurchasedAfterExpirationBucketedByFoodFetchSuccess, ByPurchasedAfterExpirationBucketedByFoodFetchIsLoading, ByPurchasedAfterExpirationBucketedByFoodFetchHasErrored);
export const fetchAssociatedPropertiesData = (urls, args) => fetchData(urls, parseFoodData, args, AssociatedPropertiesFetchSuccess, AssociatedPropertiesFetchIsLoading, AssociatedPropertiesFetchHasErrored);
