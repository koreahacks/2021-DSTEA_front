import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.header`
  position: absolute;
  top: 0;
  width: 150px;
  display: flex;
  align-items: center;
  padding: 15px 15px;
  font-size: 30px;
  font-weight: 400;
  color: #505050;
  font-family: 'Patrick Hand', cursive;
  z-index: 1;
`;

const Header = () => (
  <Wrapper>
    EveryBoard
  </Wrapper>
);

export default Header;
