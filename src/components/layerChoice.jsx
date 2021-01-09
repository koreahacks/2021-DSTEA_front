import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 110px;
  position: absolute;
  bottom: 30px;
  right: 15px;
  z-index: 2;
`;
const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  background-color: #8f8f8f;
  width: 20px;
  padding: 7px 3px;
  border-radius: 25px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  ${(props) => props.on && css`
    background-color: #5EB9F5;
  `};
`;
const ToggleCircle = styled.div`
  position: absolute;
  border-radius: 15px;
  padding: 5px;
  background-color: #ffffff;
  transition: all 0.3s ease-out;
  ${(props) => props.on && css`
    transform: translateX(10px);
  `};
`;
const ToggleWriteContainer = styled.span`
  cursor: pointer;
  margin-top: 2px;
  ${(props) => props.on && css`
    color: #5eb9f5;
    font-weight: 650;
  `};
`;

const Modal = ({ visible, onClose }) => {
  const Div = styled.div`
    width: 300px;
    height: 100px;
    position: fixed;
    top: 50%;
    left: 50%;
    display: flex;
    z-index: 3;
    background-color: #ffffff;
    border-radius: 4px;
  `;
  const Button = styled.button`
    border-radius: 4px;
    background-color: #ffffff;
    padding: 5px;
  `;
  return (
    visible && (
      <Div>
        <div>Can&apos;t do that</div>
        <Button onClick={onClose}>close</Button>
      </Div>
    )
  );
};

const ToggleWriteLayer = ({ writeIndex, index, onClick, text }) => {
  if (writeIndex === index) {
    return <ToggleWriteContainer on={1} onClick={onClick}>{text}</ToggleWriteContainer>;
  }
  return <ToggleWriteContainer on={0} onClick={onClick}>{text}</ToggleWriteContainer>;
};

const layerChoice = ({ boardInfo, setBoardInfo }) => {
  const boardIndex = boardInfo.index[boardInfo.index.current];
  const indexLength = boardInfo.type !== 'none' ? boardInfo.urls.length : 1;
  const renderIndex = boardInfo.index.rendering;

  const toggleRender = (index) => {
    let { writing, rendering } = boardInfo.index;
    if (writing === index) {
      writing = null;
    }
    if (rendering.includes(index)) {
      rendering = rendering.filter((i) => i !== index);
    } else {
      rendering.push(index);
    }
    setBoardInfo({
      ...boardInfo,
      index: {
        ...boardInfo.index,
        rendering,
        writing,
      },
    });
  };
  const toggleWrite = (index) => {
    const writing = index;
    const { rendering } = boardInfo.index;
    if (writing !== null) {
      if (!rendering.includes(writing)) {
        rendering.push(writing);
      }
    }
    setBoardInfo({
      ...boardInfo,
      index: {
        ...boardInfo.index,
        writing,
        rendering,
      },
    });
  };

  const toggleIndex = (type, index) => {
    if (type === 'write') toggleWrite(index);
    else if (type === 'render') toggleRender(index);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const ToggleSwitch = ({ index, onClick }) => (
    <ToggleContainer on={renderIndex.includes(index) ? 1 : 0} onClick={onClick}>
      <ToggleCircle on={renderIndex.includes(index) ? 1 : 0} />
    </ToggleContainer>
  );
  return (
    <>
      <Modal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
        }}
      />
      <Wrapper>
        <RowWrapper>
          <ToggleWriteLayer
            writeIndex={boardInfo.index.writing}
            index={boardIndex + indexLength}
            text="Public"
            onClick={() => { toggleIndex('write', boardInfo.index.writing === boardIndex + indexLength ? null : boardIndex + indexLength); }}
          />
          <ToggleSwitch index={boardIndex + indexLength} onClick={() => { toggleIndex('render', boardIndex + indexLength); }} />
        </RowWrapper>
        <RowWrapper>
          <ToggleWriteLayer
            writeIndex={boardInfo.index.writing}
            index={boardIndex}
            text="Private"
            onClick={() => { toggleIndex('write', boardInfo.index.writing === boardIndex ? null : boardIndex); }}
          />
          <ToggleSwitch index={boardIndex} onClick={() => { toggleIndex('render', boardIndex); }} />
        </RowWrapper>
      </Wrapper>
    </>
  );
};

export default layerChoice;
