import styled from 'styled-components';

export const SidebarButton = styled.button` 
  align-items: center; 
  background-color: initial;
  border: 0;
  color: inherit;  
  cursor: pointer;
  display: flex;
  height: 28px;
  padding: 0 10px 0 15px;  
  width: 100%;
  
  &:hover {
    background-color: rgba(128,128,128,.15);
  }
`;

export default SidebarButton;
