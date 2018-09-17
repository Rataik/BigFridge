import {EndpointPlaceholder} from "./constants";

export const Pages = [{
  index: 'quantity',
  name: 'Quantity',
  sections: [
    {
      index: 'byMonthPurchasedBucketedByFood',
      name: 'By Month Purchased Bucketed By Food',
      fetch: {
        name: 'fetchByMonthPurchasedBucketedByFoodData',
        url: {
          base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/${EndpointPlaceholder}.json`,
          endpoints: ['byMonthPurchasedBucketedByFoodName'],
        }
      },
      display: 'chart',
      reducerName: 'quantityByMonthPurchasedBucketedByFood',
    },
    // {
    //   index: 'byPurchasedAfterExpirationBucketedByFood',
    //   name: 'By Purchased After Expiration Bucketed By Food',
    //   fetch: {
    //     name: 'fetchByPurchasedAfterExpirationBucketedByFoodData',
    //     url: {
    //       base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/${EndpointPlaceholder}.json`,
    //       endpoints: ['purchasedAfterExpirationBucketedByFood'],
    //     }
    //   },
    //   display: 'chart',
    //   reducerName: 'quantityByPurchasedAfterExpirationBucketedByFood',
    // },
  ],
},
{
  index: 'list',
  name: 'List',
  sections: [
    {
      index: 'associatedProperties',
      name: '',
      fetch: {
        name: 'fetchAssociatedPropertiesData',
        url: {
          base: `https://raw.githubusercontent.com/Rataik/BigFridge/master/data/associatedProperties-${EndpointPlaceholder}.json`,
          endpoints: ['0', '1'],
        }
      },
      display: 'grid',
      reducerName: 'listAssociatedProperties'
    }
  ],
}];
