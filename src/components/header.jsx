import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  width: 150px;
  display: flex;
  align-items: center;
  padding: 10px 15px;
  font-size: 37px;
  font-weight: 400;
  color: #505050;
  text-shadow: -1px 0 #ffffff, 0 1px #ffffff, 1px 0 #ffffff, 0 -1px #ffffff;
  font-family: 'Patrick Hand', cursive;
  z-index: 1;
`;

const Header = () => (
  <Wrapper>
    EveryBoard
  </Wrapper>
);

export default Header;
