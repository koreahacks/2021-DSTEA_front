import React, { useState, useRef } from 'react';
import styled from 'styled-components';

const Popup = ({ children, handleFile }) => {
  const [visible, setVisible] = useState(true);
  const dragWrapper = useRef();
  const defaultBehavior = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };
  const handleDrag = (e) => {
    defaultBehavior(e);
  };
  const handleDrop = (e) => {
    defaultBehavior(e);
    setVisible(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };
  const handleDragOut = (e) => {
    defaultBehavior(e);
    // setVisible(false);
    const { current } = dragWrapper;
    current.removeEventListener('dragleave', handleDragOut);
    current.removeEventListener('dragover', handleDrag);
    current.removeEventListener('drop', handleDrop);
  };

  const handleDragIn = (e) => {
    defaultBehavior(e);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setVisible(true);
      const { current } = dragWrapper;
      current.addEventListener('dragleave', handleDragOut);
      current.addEventListener('dragover', handleDrag);
      current.addEventListener('drop', handleDrop);
    }
  };

  return (
    <Layout>
      <div
        className="drag-wrapper"
        ref={dragWrapper}
        onDragEnter={handleDragIn}
      >
        {children}
        {visible
          ? (
            <>
              <div
                className="popup"
              >
                <p className="text">
                  {'To upload file, Drag & Drop it'}
                </p>
                <img src="/dnd.svg" alt="Drag And Drop The File" />
              </div>
              <div className="popup" onDrop={handleDrop} onClick={() => setVisible(false)} />
            </>
          )
          : null}
      </div>
    </Layout>
  );
};
const Layout = styled.div`
  position: relative;
  height: 100%;
  width: auto;
  flex-grow: 1;
  .drag-wrapper {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  .popup {
    background-color: rgba(99, 99, 99, 0.25);
    position: absolute;
    top: 0px;
    width: 100%;
    height: 100%;
    z-index: 2;
    > * {
      z-index: 1;
    }
    p {
      position: absolute;
      left: 50%;
      top: calc(50% - 30px);
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
