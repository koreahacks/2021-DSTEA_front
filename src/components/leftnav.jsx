import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const sidenav = ({ boardInfo, setBoardInfo, navbar }) => {
  const len = boardInfo.urls.length;
  const [navWidth, setNavWidth] = useState(200);
  const threshold = 140;
  const resize = (e) => {
    e.preventDefault();
    const newWidth = e.clientX - navbar.current.offsetLeft;
    setNavWidth(newWidth);
  };
  const stopResize = (e) => {
    const newWidth = e.clientX - navbar.current.offsetLeft;
    if (newWidth < threshold) {
      setNavWidth(0);
    }
    navbar.current.removeEventListener('mousemove', resize, false);
    navbar.current.removeEventListener('mouseup', stopResize, false);
    navbar.current.removeEventListener('mouseleave', stopResize, false);
  };
  const initResize = () => {
    navbar.current.addEventListener('mousemove', resize, false);
    navbar.current.addEventListener('mouseup', stopResize, false);
    navbar.current.addEventListener('mouseleave', stopResize, false);
  };
  const setIndex = (index) => {
    const interval = (index - boardInfo.index.writing % len)
    const writing = boardInfo.index.writing + interval;
    const rendering = boardInfo.index.rendering.map((i) => {
      return i + interval;
    });
    setBoardInfo({
      ...boardInfo,
      index: {
        writing,
        rendering,
      },
    });
  };
  useEffect(() => {
    console.log(boardInfo.index);
  }, [boardInfo]);
  return (
    <Layout
      style={{
        width: `${navWidth}px`
      }}
    >
        <div className="sidenav">
          {boardInfo.urls.map((url, i) => (
            <div
              className={`thumbnail ${boardInfo.index.writing % len == i ? 'on' : ''}`}
            //    ${boardInfo.index.rendering.includes(i) ? 'on' : ''}
              key={i}
              onClick={() => {
                setIndex(i);
              }}
            >
              <img src={url} alt="thumbnail" />
            </div>
          ))}
        </div>
        <div
          className="draggable-bar"
          onMouseDown={initResize}
        >
          <img src={'/grab-handle.svg'} alt="grab-handle" />
        </div>
    </Layout>
  );
};

export default sidenav;

const Layout = styled.aside`
  position: relative;
  width: 100px;
  height: calc(100% - 120.8px);
  margin-top: 70.8px;
  margin-bottom: 30px;
  background-color: #f8f8f8;
  color: #ffffff;
  
  display: flex;
  flex-direction: column;

  .sidenav {
    position: relative;
    padding: 20px 20px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    border-top: 10px solid #e8e8e8;
    border-bottom: 10px solid #e8e8e8;


    .thumbnail {
      position: relative;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 120px;
      padding: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .thumbnail.on {
      background-color: #d0d0d0;
    }
    .thumbnail.public {
      background-color: #faebd7; /*beige: f7e7ce faebd7 skyblue: 84E4F7 */
    }
  }
  .sidenav::-webkit-scrollbar {
    width: 0px;
    background: transparent; /* make scrollbar transparent */
  }
  .draggable-bar {
    position: absolute;
    top: 0px;
    right: -11px;
    width: 11px;
    height: 100%;
    z-index: 100;
    cursor: col-resize;
    background-color: #e8e8e8;
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
