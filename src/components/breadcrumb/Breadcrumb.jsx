import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { HomepageName, HomepageIndex } from '../../constants/siteMap/SiteMap';

const Container = styled.div`    
  background-color: #ffffff;  
  box-shadow: inset 0 16px 5px -5px rgba(0,0,0,.05);
  border-bottom-style: solid;
  border-color: rgba(204,204,204,.8);
  border-bottom-width: 1px;  
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 400;  
  padding: 0 25px;
  ${props => (
    `height: ${props.height}px;
    line-height: ${props.height - 1}px`
  )};                 
`;

const BreadcrumbLink = styled(Link)`
  display: inline-block;  
`;

const BreadcrumbText = styled.div`
  color: ${props => (props.isLast ? '#000000;' : '#015cda')};  
  display: inline-block; 
  padding: 0 3px;
`;

const getBreadcrumb = (page, section) => {
  const crumbs = [{
    name: HomepageName,
    link: `?page=${HomepageIndex}`,
  }, {
    name: page && page.name,
    link: page && `?page=${page.index}`,
  }, {
    name: section && section.name,
    link: section && `?page=${page.index}&section=${section.index}`,
  }];

  return (
    crumbs
      .filter(crumb => crumb.name)
      .map((crumb, index, arr) => {
        const isLast = index === arr.length - 1;
        if (!isLast) {
          return (
            <BreadcrumbLink key={crumb.name} to={crumb.link}>
              <BreadcrumbText>{crumb.name}</BreadcrumbText>
            </BreadcrumbLink>
          );
        }
        return <BreadcrumbText isLast key={crumb.name}>{crumb.name}</BreadcrumbText>;
      })
      .reduce((r, a) => r.concat(a, (<BreadcrumbText isLast key={`sep_${r.length}`}>{'>'}</BreadcrumbText>)), [])
      .slice(0, -1)
  );
};

const BreadCrumb = ({ height, page, section }) => (
  <Container id="bf_breadcrumb" height={height}>
    {getBreadcrumb(page, section)}
  </Container>
);

export default BreadCrumb;
