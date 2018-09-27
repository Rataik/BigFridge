import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as querystring from 'querystring';
import styled from 'styled-components';
import * as fetchActions from '../../actions';
import Pages from '../../constants/SiteMap';
import { EndpointPlaceholder } from '../../constants/constants';
import Banner from '../banner/Banner';
import Dashboard from '../dashboard/Dashboard';
import '../../styles/global';

function getPageAndSectionFromUrl(props, state) {
  const url = querystring.parse(props.location.search.substring(1));

  const pageIndexFromUrl = url.page || state.pages.find(page => page.isHome).index;
  const pageFromUrl = state.pages.find(page => page.index === pageIndexFromUrl) || {};

  const sectionIndexFromUrl = url.section;
  const sectionsFromUrl = pageFromUrl.sections || [];
  const sectionFromUrl = sectionsFromUrl.find(section => section.index === sectionIndexFromUrl);

  return {
    pageFromUrl,
    sectionFromUrl,
  };
}

function loadData(props, state) {
  const { pageFromUrl, sectionFromUrl } = getPageAndSectionFromUrl(props, state);

  if (pageFromUrl.sections) {
    pageFromUrl.sections.forEach((section) => {
      if (((sectionFromUrl && section.index === sectionFromUrl.index) || !sectionFromUrl) && props[section.fetch.name] && section && section.fetch.url) {
        const urls = section.fetch.url.endpoints.map(endpoint => section.fetch.url.base.replace(EndpointPlaceholder, endpoint));
        props[section.fetch.name](urls, [section.index, section.name]);
      }
    });
  }
}

const BigFridge = styled.div` 
`;

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      height: window.innerHeight,
      pages: Pages,
    };
  }

  componentDidMount() {
    loadData(this.props, this.state);
  }

  render() {
    const { height, pages } = this.state;
    const { pageFromUrl, sectionFromUrl } = getPageAndSectionFromUrl(this.props, this.state);

    return (
      <BigFridge id="bigFridge">
        <Banner />
        <Dashboard height={height} menuItems={pages} page={pageFromUrl} section={sectionFromUrl} />
      </BigFridge>
    );
  }
}

export default withRouter(connect(null, fetchActions)(App));
