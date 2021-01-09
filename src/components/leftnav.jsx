import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const sidenav = ({ boardInfo, setBoardInfo, navbar }) => {
  const len = boardInfo.urls.length;
  const [navWidth, setNavWidth] = useState(160);
  const minWidth = 80, maxWidth = 190;

  const resize = (e) => {
    e.preventDefault();
    const newWidth = e.clientX - navbar.current.offsetLeft;
    if (newWidth > maxWidth) {
      setNavWidth(maxWidth);
    } else {
      setNavWidth(newWidth);
    }
  };
  const stopResize = (e) => {
    const newWidth = e.clientX - navbar.current.offsetLeft;
    if (newWidth < minWidth) {
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
    const interval = (index - boardInfo.index[boardInfo.index.current] % len)
    const writing = boardInfo.index.writing !== null ? boardInfo.index.writing + interval : null;
    const rendering = boardInfo.index.rendering.map((i) => {
      return i + interval;
    });
    setBoardInfo({
      ...boardInfo,
      index: {
        ...boardInfo.index,
        writing,
        rendering,
        user: index,
        current: 'user',
      },
    });
  };
  return (
    <Layout
      style={{
        width: `${navWidth}px`
      }}
    >
        <div className="sidenav">
          {boardInfo.urls.map((url, i) => (
            <div
              className={`thumbnail ${boardInfo.index.user === i ? 'on' : boardInfo.index.admin === i ? 'public' : ''}`}
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

// const LEFTNAV_BORDER = '#e6f9ff';
// const LEFTNAV_BG = '#e6f9ff';

const LEFTNAV_BORDER = '#f3f3f3';
const LEFTNAV_BG = '#f3f3f3';

const Layout = styled.aside`
  position: relative;
  width: 100px;
  height: calc(100% - 120.8px);
  margin-top: 73px;
  margin-bottom: 30px;
  background-color: ${LEFTNAV_BG};/*f8f8f8  e8e8e8*/
  color: #ffffff;

  box-shadow: rgba(0, 0, 0, 0.09) 10px 6px 9px 0;
  
  display: flex;
  flex-direction: column;

  .sidenav {
    position: relative;
    padding: 20px 20px;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    border-top: 10px solid ${LEFTNAV_BORDER};
    border-bottom: 10px solid ${LEFTNAV_BORDER};


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
      background-color: #e4e4e4;
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
    box-shadow: rgba(0, 0, 0, 0.05) 6px 0px 9px 0;
    /* border-left: 2px solid #ffffff; */
    cursor: col-resize;
    background-color: ${LEFTNAV_BORDER};
    img {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;
