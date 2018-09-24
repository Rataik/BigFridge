import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import DynamicChart from './DynamicChart';

class Chart extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return;
  }
}

export default withRouter(connect(null, null)(Chart));
