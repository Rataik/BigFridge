import { EndpointPlaceholder } from '../../../../constants';

export const Section = {
  order: 10,
  index: 'byPurchasedAfterExpirationBucketedByFood',
  name: 'By Purchased After Expiration Bucketed By Food',
  fetch: {
    name: 'fetchByPurchasedAfterExpirationBucketedByFoodData',
    url: {
      base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/${EndpointPlaceholder}.json`,
      endpoints: ['purchasedAfterExpirationBucketedByFood'],
    },
    delay: 1000,
  },
  display: 'chart',
  reducerName: 'quantityByPurchasedAfterExpirationBucketedByFood',
  svg: {
    icon: 'SectionIcon',
  },
};
