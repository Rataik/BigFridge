import React from 'react';
import styled from 'styled-components';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import Home from '../page/Home';
import Page from '../page/Page';
import {AppName} from "../../constants/constants";
import Header1 from "../header/Header1";

const Container = styled.div`   
  flex: 1 1 auto;      
  height: ${props => props.height}px;
  overflow: hidden;         
`;

const Panorama = ({ height, page, section }) => {
  const breadcrumbHeight = 28;
  const headerHeight = 44;
  const pageHeight = height - breadcrumbHeight - headerHeight;

  return (
    <Container id="bf_panorama" height={height}>
      {page.isHome && <Home height={pageHeight} page={page} />}
      {!page.isHome && <Breadcrumb height={breadcrumbHeight} page={page} section={section} />}
      {!page.isHome && <Header1 height={headerHeight} subTitle={AppName} title={page.name} />}
      {!page.isHome && <Page height={pageHeight} page={page} section={section} />}
    </Container>
  );
};

export default Panorama;
