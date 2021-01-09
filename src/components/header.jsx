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
    font-family: 'Patrick Hand', cursive;
`;

const Header = () => (
  <Wrapper>
    EveryBoard
  </Wrapper>
);

export default Header;
