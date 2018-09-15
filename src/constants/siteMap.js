export const Pages = [{
  index: 'quantity',
  name: 'Quantity',
  sections: [
    {
      index: 'byDatePurchasedBucketedByFood',
      name: 'By Date Purchased Bucketed By Food',
      endpoint: 'https://jsonplaceholder.typicode.com/users',
      display: 'chart',
      fetchName: 'fetchFoodData',
      reducerName: 'quantity_byDatePurchasedBucketedByFoodName',
    },
    {
      index: 'purchasedAfterExpirationBucketedByFood',
      name: 'Purchased After Expiration Bucketed By Food',
      endpoint: 'https://jsonplaceholder.typicode.com/photos',
      display: 'chart',
      fetchName: 'fetchFoodData',
      reducerName: 'quantity_byExpirationDate',
    },
  ],
},
{
  index: 'list',
  name: 'List',
  sections: [
    {
      index: 'associatedProperties',
      name: '',
      endpoint: 'https://jsonplaceholder.typicode.com/comments',
      display: 'grid',
      fetchName: 'fetchFoodData',
      reducerName: 'list_associatedProperties'
    }
  ],
}];
