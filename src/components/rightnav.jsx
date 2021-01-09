import React from 'react';
import styled from 'styled-components';
import ColorSelector from 'src/components/colorSelector';
import LayerChoice from 'src/components/layerChoice';

const SHAPE_BORDER = '0.8px solid #000000';
const BOX_BORDER = '1px solid #000000';
const BORDER_RADIUS = '4px';

const RightNav = styled.div`
  position: relative;
  width: 200px;
  background-color: #ffffff;
`;

const PenWrapper = styled.div`
  z-index: 1;
  background-color: #ffffff;
  position: absolute;
  right: 0px;
  top: 10px;
  padding: 0 15px;
  display: flex;
`;

const PenBox = styled.div`
  margin: 0 5px;
  padding: 2px;
  height: 28px;
  width: 28px;
  border: ${BOX_BORDER};
  border-radius: ${BORDER_RADIUS};
  cursor: pointer;
`;

const ColorBox = styled.div`
  margin: 0 5px;
  padding: 5px;
  border: ${BOX_BORDER};
  border-radius: ${BORDER_RADIUS};
`;

const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="24"
    viewBox="0 0 24 24"
  >
    <path d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
  </svg>
);

const CircleIcon = styled.div`
    padding: 11px;
    margin: 2px;
    border-radius: 11px;
    border: ${SHAPE_BORDER};
    cursor: pointer;
`;

const RectIcon = styled.div`
    padding: 10px;
    margin: 3px;
    border: ${SHAPE_BORDER};
    cursor: pointer;
`;

const rightnav = ({ penInfo, setPenInfo, boardInfo, setBoardInfo }) => (
  <RightNav>
    <PenWrapper>
      <PenBox onClick={() => {
        setPenInfo({
          ...penInfo,
          type: 'pen1',
          'stroke-width': 1,
        });
      }}
      >
        <PencilIcon />
      </PenBox>
      <PenBox>
        <CircleIcon onClick={() => {
          setPenInfo({
            ...penInfo,
            type: 'circle',
            'stroke-width': 1,
          });
        }}
        />
      </PenBox>
      <PenBox>
        <RectIcon onClick={() => {
          setPenInfo({
            ...penInfo,
            type: 'polygon',
            'stroke-width': 1,
          });
        }}
        />
      </PenBox>
      <ColorBox><ColorSelector penInfo={penInfo} setPenInfo={setPenInfo} /></ColorBox>
    </PenWrapper>
    {/* <UserStatus></UserStatus> */}
    <LayerChoice
      boardIndex={boardInfo.index.writing}
      renderingIndex={boardInfo.index.rendering}
      indexLength={boardInfo.urls.length}
      boardInfo={boardInfo}
      setBoardInfo={setBoardInfo}
    />
  </RightNav>
);

export default rightnav;
