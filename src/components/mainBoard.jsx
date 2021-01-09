import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const MainBoard = ({ boardInfo, penInfo }) => {
  // 차후 svgdrawing에 사용할 ref
  const board = useRef();
  const len = boardInfo.urls.length;
  // const drawingRef = useRef();
  return (
    <Layout>
      <svg
        ref={board}
      >
        <Background src={boardInfo.urls[boardInfo.index.writing % len]} />
      </svg>
    </Layout>
  );
};

const Background = ({ src }) => (
  <g className="background">
    <defs>
      <pattern id={src} patternUnits="userSpaceOnUse" width="100%" height="100%">
        <image xlinkHref={src} x="0" y="0" width="100%" height="100%" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill={`url(#${src})`} />
  </g>
);

const Layout = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: white;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  svg {
    position: absolute;
    width: 100%;
    height: 100%;
    .background {
      z-index: -1;
    }
  }
  .pin {
    position: absolute;
    top: 50px;
    right: 50px;
    width: 100px;
    height: 50px;
    background-color: #6a6a6a;
    div {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
    }
  }
`;

export default MainBoard;
