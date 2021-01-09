import React,  {useEffect } from 'react';
import styled from 'styled-components';
import ColorSelector from 'src/components/colorSelector';
import LayerChoice from 'src/components/layerChoice';
import UserStatus from 'src/components/userStatus';
import AuthReq from 'src/components/authReq';


const SHAPE_BORDER = '2px solid #303030';
const BOX_BORDER = '2px solid #e4e4e4';
const BORDER_RADIUS = '4px';

const RightNav = styled.div`
  position: relative;
  width: 200px;
  /* background-color: #ffffff; */
`;

const PenWrapper = styled.div`
  z-index: 1;
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
  background-color: #e4e4e4;
  box-shadow: rgba(0, 0, 0, 0.1) 0 6px 9px 0;
  border: ${BOX_BORDER};
  border-radius: ${BORDER_RADIUS};
  :active {
    outline: none;
    background-color: #d8d8d8;
    border: 2px solid #d8d8d8;
  }
  cursor: pointer;
`;

const ColorBox = styled.div`
  margin: 0 5px;
  padding: 5px;
  background-color: #ffffff;
  border: ${BOX_BORDER};
  border-radius: ${BORDER_RADIUS};
  box-shadow: rgba(0, 0, 0, 0.1) 0 6px 9px 0;
  :active {
    outline: none;
    border: 2px solid #c0c0c0;
  }
`;

// const PencilIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     width="28"
//     height="24"
//     viewBox="0 0 24 24"
//   >
//     <path fill = "#303030" d="M7.127 22.564l-7.126 1.436 1.438-7.125 5.688 5.689zm-4.274-7.104l5.688 5.689 15.46-15.46-5.689-5.689-15.459 15.46z" />
//   </svg>
// );

const PencilIcon = () => (
  <img
    src="/pencil.svg"
    alt="open user tab"
    style={{ cursor: 'pointer' }}
  />
);

const PenIcon = () => (
  <img
    src="/pen.svg"
    alt="open user tab"
    style={{ cursor: 'pointer' }}
  />
);

const CircleIcon = styled.div`
    padding: 11px;
    margin: 2px;
    border-radius: 13px;
    border: ${SHAPE_BORDER};
    cursor: pointer;
`;

const RectIcon = styled.div`
    padding: 10px;
    margin: 3px;
    border: ${SHAPE_BORDER};
    cursor: pointer;
`;

const rightnav = ({ penInfo, setPenInfo, boardInfo, setBoardInfo, userInfo, boardID, myInfo }) => {
  useEffect(() => {
    if (myInfo.user === undefined) return;
  })
  return (
  <RightNav>
    <PenWrapper>
      <PenBox onClick={() => {
        setPenInfo({
          ...penInfo,
          type: 'pencil',
          'stroke-width': 1,
        });
      }}
      >
        <PencilIcon />
      </PenBox>
      {/* <PenBox>
        <CircleIcon onClick={() => {
          setPenInfo({
            ...penInfo,
            type: 'circle',
            'stroke-width': 5,
          });
        }}
        />
      </PenBox> */}
      <PenBox>
        <RectIcon onClick={() => {
          setPenInfo({
            ...penInfo,
            type: 'erase',
            'stroke-width': 1,
          });
        }}
        />
      </PenBox>
      <ColorBox><ColorSelector penInfo={penInfo} setPenInfo={setPenInfo} /></ColorBox>
    </PenWrapper>
    {/* <UserStatus></UserStatus> */}
    <AuthReq user={myInfo} boardID={boardID} />
    <LayerChoice
      boardIndex={boardInfo.index[boardInfo.index.current]}
      renderIndex={boardInfo.index.rendering}
      indexLength={boardInfo.urls.length}
      boardInfo={boardInfo}
      setBoardInfo={setBoardInfo}
    />
    {/* <UserStatus userInfo={userInfo} /> */}
  </RightNav>
);}

export default rightnav;
