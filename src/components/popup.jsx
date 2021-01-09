import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Popup = ({ children, handleFile, intro, setIntro, loadState, setLoadState }) => {
  const dragWrapper = useRef();
  const defaultBehavior = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrag = (e) => {
    defaultBehavior(e);
  };
  const handleDrop = (e) => {
    setIntro(false);
    setLoadState('loading');
    console.log('loading');
    defaultBehavior(e);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  const handleDragOut = (e) => {
    defaultBehavior(e);
    const { current } = dragWrapper;
    current.removeEventListener('dragleave', handleDragOut);
    current.removeEventListener('dragover', handleDrag);
    current.removeEventListener('drop', handleDrop);
  };

  const handleDragIn = (e) => {
    defaultBehavior(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const { current } = dragWrapper;
      current.addEventListener('dragleave', handleDragOut);
      current.addEventListener('dragover', handleDrag);
      current.addEventListener('drop', handleDrop);
    }
  };

  const Content = () => {
    if (intro || loadState === 'waiting') {
      return (
        <>
          <div
            className="popup"
          >
            <p align="center" className="text">
              {'To upload file, Drag & Drop it'}
              <br />
              {'You can click the board to start without file'}
            </p>
            <img src="/dnd.svg" alt="Drag And Drop The File" />
          </div>
          <div
            className="popup"
            onDrop={handleDrop}
            onClick={() => {
              setIntro(false);
              setLoadState('complete');
            }}
          />
        </>
      );
    }
    if (loadState === 'loading') {
      return (<div id="loading" />);
    }
    return null;
  };

  return (
    <Layout>
      <div
        className="drag-wrapper"
        ref={dragWrapper}
        onDragEnter={handleDragIn}
      >
        <Content />
        {children}
      </div>
    </Layout>
  );
};
const Layout = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  flex-grow: 1;

  @import url(https://fonts.googleapis.com/css?family=Roboto:100);


  #loading {
    display: inline-block;
    position: relative;
    width: 50px;
    height: 50px;
    left: calc(50% - 25px);
    top: calc(50% - 40px);
    border: 5px solid #c3e7ff;
    border-radius: 50%;
    border-top-color: #5eb9f5;
    animation: spin 1s ease-in-out infinite;
    -webkit-animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }
  @-webkit-keyframes spin {
    to { -webkit-transform: rotate(360deg); }
  }

  .drag-wrapper {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .popup {
    background-color: rgba(99, 99, 99, 0.1);
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    > * {
      z-index: 1;
    }
    p {
      font-size: 20px;
      position: absolute;
      left: 50%;
      top: calc(50% - 45px);
      transform: translate(-50%, -50%);
    }
    img {
      position: absolute;
      width: 50px;
      left: 50%;
      top: calc(50% + 30px);
      transform: translate(-50%, -50%);
    }
  }
`;

export default Popup;
