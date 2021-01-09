import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { SVGDrawings, SVGDrawing } from 'src/components/svgDrawing/svg';

const MainBoard = ({ boardInfo, penInfo }) => {
  // 차후 svgdrawing에 사용할 ref
  const board = useRef();
  const drawingRef = useRef();
  useEffect(() => {
    if (drawingRef.current) return;
    if (!board.current) return;
    if (boardInfo && boardInfo.urls) {
      drawingRef.current = new SVGDrawings(board.current, boardInfo.urls.length * 2, {
        rendering: boardInfo.index.rendering,
        writing: boardInfo.index.writing,
      }, penInfo);
    } else {
      drawingRef.current = new SVGDrawing(board.current, penInfo);
      drawingRef.current.on();
    }
  });
  useEffect(() => {
    console.log(boardInfo.index.rendering, boardInfo.index.writing);
    if (boardInfo && boardInfo.index) {
      drawingRef.current.setRenderingIndex(boardInfo.index.rendering);
      drawingRef.current.setWritingIndex(boardInfo.index.writing);
      // drawingRef.current.getIndex();
    }
  }, [boardInfo]);
  useEffect(() => {
    if (penInfo) {
      // console.log(penInfo);
      drawingRef.current.setOpt(penInfo);
    }
  }, [penInfo]);
  return (
    <Layout>
      <svg
        ref={board}
      >
        {boardInfo && <Background src={boardInfo.urls[boardInfo.index.writing % boardInfo.urls.length]} />}
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
