import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as fetchActions from '../../actions';
import React, {Component} from 'react';
import * as siteMap from '../../constants/siteMap';
import * as querystring from 'querystring';
import {EndpointPlaceholder, HomePage} from "../../constants/constants";

function loadData(props: any, state: any) {
  const url = querystring.parse(props.location.search.substring(1));

  const pageIndexFromUrl = url.page || HomePage.toLowerCase();
  const pageFromUrl = state.pages.find((page: any) => page.index === pageIndexFromUrl) || {};

  const sectionIndexFromUrl = url.section;
  const sectionsFromUrl = pageFromUrl.sections || [];
  const sectionFromUrl = sectionsFromUrl.find((section: any) => section.index === sectionIndexFromUrl);

  if (pageFromUrl.sections) {
    pageFromUrl.sections.forEach((section: any) => {
      if ((section.index === sectionIndexFromUrl || !sectionFromUrl) && props[section.fetch.name] && section && section.fetch.url) {
        const urls = section.fetch.url.endpoints.map((endpoint) => section.fetch.url.base.replace(EndpointPlaceholder, endpoint))
        props[section.fetch.name](urls, [section.index, section.name]);
      }
    });
  }
}

class App extends Component {
  constructor() {
    super();

    this.state = {
      scrollY: 0,
      hideFilters: false,
      width: window.innerWidth,
      height: window.innerHeight,
      pages: siteMap.Pages,
    };
  }

  componentDidMount() {
    loadData(this.props, this.state);
  }

  componentDidUpdate(prevProps: any) {
    const newUrl = querystring.parse(this.props.location.search.substring(1));
    const oldUrl = querystring.parse(prevProps.location.search.substring(1));

    if (newUrl.section !== oldUrl.section || newUrl.page !== oldUrl.page) {
      loadData(this.props, this.state);
    }
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
    foodItems: [],
    hasErrored: false,
    isLoading: false
  };
};

const mapDispatchToProps = fetchActions;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));