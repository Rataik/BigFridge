import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as svgIcons from '../svgIcons';

const Container = styled.div`    
  box-sizing: border-box;
  flex: 1 1 auto;
  height: ${props => props.height}px;  
  margin: 16px 40px;
  overflow: auto;          
  position: relative;
`;

const HomeLink = styled(Link)`
  display: flex;  
`;

const HeaderHeight = 45;
const Header = styled.div`
  color: #ffffff;
  display: block;
  font-size: 18px;
  font-weight: 600;
  height: ${HeaderHeight}px;  
  line-height: ${HeaderHeight}px;
`;

const TileContainer = styled.div`
  background-color: #fff;
  border-color: rgba(204,204,204,.8);    
  border-radius: 2px;
  box-shadow: none;
  color: #000;  
  position: absolute;  
  ${props => (
    `height: ${props.height}px;
    left: ${props.left}px;
    top: ${props.top}px;       
    width: ${props.width}px;`
  )}
`;

const TileLink = styled.a`  
  background-color: rgba(85,179,255,.2);
  display: block;  
`;

const Tile = styled.div`
  box-shadow: 0 2px 4px 0 rgba(0,0,0,.1);
  border-radius: 2px;
  box-sizing: border-box;
  color: #000;   
  font-size: 16px;
  font-weight: 400;
  height: 175px;
  overflow: hidden;
  padding: 15px;
  position: relative;  
`;

const TileContent = styled.div`
  align-items: center;
  display: flex;  
  flex-direction: column;
  height: 100%;
  justify-content: center;  
  text-align: center;
`;

const TileIconHolder = styled.div`
  display: block;
  height: 50px;
  width: 50px;
`;

const TileTitle = styled.div`
  color: rgb(0, 0, 0);
  display: block;  
  font-weight: 600;  
  text-align: center;  
  ${(props) => {
    if (props.noText && props.noIcon) {
      return (
        `font-size: 16px;
          height: 20px;
          margin-top: 0;`
      );
    }
    if (props.noText && !props.noIcon) {
      return (
        `font-size: 14px;
          height: 18px;
          margin-top: 10px;`
      );
    }
    return (
      `font-size: 12px;
        height: 16px;
        margin-top: 20px`
    );
  }}
`;

const TileText = styled.div`
  color: rgb(0, 0, 0);
  display: block;
  font-size: 12px;
  font-weight: 400;
  margin-top: 20px;
  text-align:center;
  width: ${props => props.width}px;
`;

function getTiles(page, headerHeight) {
  return page.tiles.map((pageTile) => {
    const SvgIcon = pageTile.svg && svgIcons[pageTile.svg.icon];

    const tile = (
      <Tile>
        <TileContent>
          {pageTile.svg && <TileIconHolder><SvgIcon /></TileIconHolder>}
          <TileTitle noText={!pageTile.content.text} noIcon={!pageTile.svg}>{pageTile.title}</TileTitle>
          {pageTile.content.text && <TileText width={pageTile.width - 80}>{pageTile.content.text}</TileText>}
        </TileContent>
      </Tile>
    );

    return (
      <TileContainer height={pageTile.height} key={pageTile.title} left={pageTile.left} top={Number(pageTile.top) + headerHeight} width={pageTile.width}>
        {pageTile.content.isLink ? <TileLink href={pageTile.content.Link}>{tile}</TileLink> : tile}
      </TileContainer>
    );
  });
}

const Home = ({ height, page }) => (
  <Container height={height} id="bf_home">
    <HomeLink to={`?page=${page.index}`}>
      <Header>{page.name}</Header>
    </HomeLink>
    {getTiles(page, HeaderHeight)}
  </Container>
);

export default Home;
