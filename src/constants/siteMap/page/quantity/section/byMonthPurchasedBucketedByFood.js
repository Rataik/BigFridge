import { EndpointPlaceholder } from '../../../../constants';

export const Section = {
  order: 0,
  index: 'byMonthPurchasedBucketedByFood',
  name: 'By Month Purchased Bucketed By Food',
  fetch: {
    name: 'fetchByMonthPurchasedBucketedByFoodData',
    url: {
      base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/${EndpointPlaceholder}.json`,
      endpoints: ['byMonthPurchasedBucketedByFoodName'],
    },
  },
  display: 'chart',
  reducerName: 'quantityByMonthPurchasedBucketedByFood',
  svg: {
    icon: 'SectionIcon',
  },
};
