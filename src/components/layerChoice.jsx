import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: abolute;
  bottom: 50px;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const RowWrapper = styled.div`
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
  transition: all 0.2s ease-out;
  ${(props) => props.on && css`
    transform: translateX(10px);
  `};
`;
const ToggleWriteContainer = styled.span`
  cursor: pointer;
`;

const Modal = ({ visible, onClose }) => {
  const Div = styled.div`
    display: flex;
  `;
  const Button = styled.button`
    border-radius: 4px;
    background-color: #ffffff;
    padding: 5px;
  `;
  return (
    visible && (
    <>
      <Div>
        Can&apos;t do that
      </Div>
      <Button onClick={onClose}>close</Button>
    </>
    )
  );
};

const ToggleWriteLayer = ({ writeIndex, index, onClick, text }) => {
  if (writeIndex === index) {
    return <ToggleWriteContainer onClick={onClick}>{text}</ToggleWriteContainer>;
  }
  return <ToggleWriteContainer onClick={onClick}>{text}</ToggleWriteContainer>;
};

const layerChoice = ({ boardIndex, user, indexLength }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [renderIndex, setRenderIndex] = useState([]);
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
        }
      } else {
        setRenderIndex([
          ...renderIndex,
          boardIndex + indexLength,
        ]);
      }
    } else if (layer === 'Private') {
      if (renderIndex.includes(boardIndex)) {
        if (writeIndex === boardIndex) {
          setModalVisible(true);
        } else {
          setRenderIndex(renderIndex.filter((index) => (index !== boardIndex)));
        }
      } else {
        setRenderIndex([
          ...renderIndex,
          boardIndex,
        ]);
      }
    }
  };
  const toggleWriteLayer = (layer) => {
    if (writeIndex === boardIndex) {
      setWriteIndex(undefined);
    } else if (writeIndex === boardIndex + indexLength) {
      setWriteIndex(undefined);
    } else {
      setWriteIndex(layer === 'Private' ? boardIndex : boardIndex + indexLength);
    }
  };
  const ToggleSwitch = ({ layer, onClick }) => (
    <ToggleContainer on={layer === 'Public' && renderIndex.includes(boardIndex + indexLength) ? 1 : 0} onClick={onClick}>
      <ToggleCircle on={layer === 'Public' && renderIndex.includes(boardIndex + indexLength) ? 1 : 0} />
    </ToggleContainer>
  );
  return (
    <>
      <Modal visible={modalVisible} onClose={onClose} />
      <Wrapper>
        <RowWrapper>
          <ToggleWriteLayer writeIndex={writeIndex} index={boardIndex + indexLength} text="Public" onClick={() => { toggleWriteLayer('Public'); }} />
          <ToggleSwitch layer="Public" onClick={() => { toggleRenderLayer('Public'); }} />
        </RowWrapper>
        <RowWrapper>
          <ToggleWriteLayer writeIndex={writeIndex} index={boardIndex} text="Private" onClick={() => { toggleWriteLayer('Private'); }} />
          <ToggleSwitch layer="Private" onClick={() => { toggleRenderLayer('Private'); }} />
        </RowWrapper>
      </Wrapper>
    </>
  );
};

export default layerChoice;
