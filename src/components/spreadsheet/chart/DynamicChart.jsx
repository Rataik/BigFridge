import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

class DynamicChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return;
  }
}

export default withRouter(connect(null, null)(DynamicChart));
