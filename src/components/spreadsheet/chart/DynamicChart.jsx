import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';

class DynamicChart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <div>Dynamic Chart</div>
  }
}

export default withRouter(connect(null, null)(DynamicChart));
