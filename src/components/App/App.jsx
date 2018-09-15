import { connect } from 'react-redux';
import {fetchFoodData} from '../../actions';
import React, { Component } from 'react';

class App extends Component {
  componentDidMount() {
    this.props.fetchData(
      ['https://jsonplaceholder.typicode.com/users',
        'https://jsonplaceholder.typicode.com/comments']);
  }

  render() {
    if (this.props.hasErrored) {
      return <h1>Sorry! There was an error loading the items</h1>;
    }

    if (this.props.isLoading) {
      return <h1>Loading…</h1>;
    }

    return (
      <ul>
        {this.props.foodItems.map((item, index) => (
          <li key={index}>
            {item.name}
          </li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    foodItems: state.foodItems,
    hasErrored: state.hasErrored,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchData: (urls) => dispatch(fetchFoodData(urls, ['quantity', 'Quantity', 'byDatePurchasedBucketedByFoodName']))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);