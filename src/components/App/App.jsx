import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import * as fetchActions from '../../actions';
import React, {Component} from 'react';
import * as siteMap from '../../constants/siteMap';
import * as querystring from 'querystring';
import {EndpointPlaceholder, HomePage} from "../../constants/constants";
import styled from 'styled-components';

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

const BigFridge = styled.div`    
  height: 100vh;    
`;

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
    <BigFridge id="bigFridge">

    </BigFridge>
  }
}

const mapStateToProps = null
const mapDispatchToProps = fetchActions;

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));