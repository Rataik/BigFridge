import styled from 'styled-components';

export const CellIconHolder = styled.div`  
  display: inline-block;  
  height: 21px;     
  width: 21px;
  ${props => (props.center ? 'margin: 0 auto;' : '')}
`;