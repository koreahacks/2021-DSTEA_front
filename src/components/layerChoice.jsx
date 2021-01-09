import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  width: 170px;
  position: absolute;
  bottom: 50px;
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
  ${(props) => props.on && css`
    color: #5eb9f5;
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

const layerChoice = ({ boardIndex, indexLength, renderingIndex, boardInfo, setBoardInfo }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [renderIndex, setRenderIndex] = useState(renderingIndex);
  const [writeIndex, setWriteIndex] = useState(boardIndex);
  const onClose = () => {
    setModalVisible(false);
  };
  const toggleRenderLayer = (layer) => {
    if (layer === 'Public') {
      if (renderIndex.includes(boardIndex + indexLength)) {
        if (writeIndex === boardIndex + indexLength) {
          setModalVisible(true);
        } else {
          setRenderIndex(renderIndex.filter((index) => (index !== boardIndex + indexLength)));
          setBoardInfo({
            ...boardInfo,
            index: {
              ...boardInfo.index,
              rendering: renderIndex.filter((index) => (index !== boardIndex + indexLength)),
            },
          });
        }
      } else {
        setRenderIndex([
          ...renderIndex,
          boardIndex + indexLength,
        ]);
        setBoardInfo({
          ...boardInfo,
          index: {
            ...boardInfo.index,
            rendering: renderIndex,
          },
        });
      }
    } else if (layer === 'Private') {
      if (renderIndex.includes(boardIndex)) {
        if (writeIndex === boardIndex) {
          setModalVisible(true);
        } else {
          setRenderIndex(renderIndex.filter((index) => (index !== boardIndex)));
          setBoardInfo({
            ...boardInfo,
            index: {
              ...boardInfo.index,
              rendering: renderIndex,
            },
          });
        }
      } else {
        setRenderIndex([
          ...renderIndex,
          boardIndex,
        ]);
        setBoardInfo({
          ...boardInfo,
          index: {
            ...boardInfo.index,
            rendering: renderIndex,
          },
        });
      }
    }
  };
  const toggleWriteLayer = (layer, index) => {
    if (writeIndex === index) {
      setWriteIndex(undefined);
      setBoardInfo({
        ...boardInfo,
        index: {
          ...boardInfo.index,
          writing: writeIndex,
        },
      });
    } else {
      setWriteIndex(layer === 'Private' ? boardIndex : boardIndex + indexLength);
      setBoardInfo({
        ...boardInfo,
        index: {
          ...boardInfo.index,
          writing: writeIndex,
        },
      });
    }
    console.log('write', writeIndex);
  };
  const ToggleSwitch = ({ index, onClick }) => (
    <ToggleContainer on={renderIndex.includes(index) ? 1 : 0} onClick={onClick}>
      <ToggleCircle on={renderIndex.includes(index) ? 1 : 0} />
    </ToggleContainer>
  );
  return (
    <>
      <Modal visible={modalVisible} onClose={onClose} />
      <Wrapper>
        <RowWrapper>
          <ToggleWriteLayer
            writeIndex={writeIndex}
            index={boardIndex + indexLength}
            text="Public"
            onClick={() => { toggleWriteLayer('Public', boardIndex + indexLength); }}
          />
          <ToggleSwitch index={boardIndex + indexLength} onClick={() => { toggleRenderLayer('Public'); }} />
        </RowWrapper>
        <RowWrapper>
          <ToggleWriteLayer
            writeIndex={writeIndex}
            index={boardIndex}
            text="Private"
            onClick={() => { toggleWriteLayer('Public', boardIndex); }}
          />
          <ToggleSwitch index={boardIndex} onClick={() => { toggleRenderLayer('Private'); }} />
        </RowWrapper>
      </Wrapper>
    </>
  );
};

export default layerChoice;
