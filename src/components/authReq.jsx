import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BACKEND_URL, BACKEND_PORT } from 'config';
import axios from 'axios';

const PopUp = styled.div`
    position: fixed;
    width: 180px;
    right: 15px;
    bottom: 100px;
    padding: 10px 10px 10px 10px;
    border: 2px solid #f4f4f4;
    background-color: #f4f4f4;
    border-radius: 4px;
    ${(props) => props.index && css`
    z-index: ${100 - props.index};
    `};
    box-shadow: rgba(0, 0, 0, 0.1) 0 6px 9px 0;
`;

const PopUpText = styled.div`
    height: 50px;
    color: #404040;
    font-family: 'arial', cursive;
    position: relative;
`;

const Bold = styled.span`
    font-weight: 600;
`;
// (props) => props.on
const PopUpButton = styled.button`
    cursor: pointer;
    position: relative;
    margin-right: 5px;
    right: -100px;
    background-color: #ffffff;
    /* border: 1px solid #606060; */
    border: none;
    border-radius: 1px;
    :active {
        outline: none;
        background-color: #e8e8e8;
    }
`;

const Container = styled.button`
    position: absolute;
    bottom: 85px;
    right: 18px;
    padding: 5px 5px;
    background-color: #f0f0f0; /**/
    outline: none;
    border: none;
    align-items: center;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.09) 0 6px 9px 0;
    cursor: pointer;
    ${(props) => props.isAuthorized === true && css`
        background-color: #86ff86;
    `};
    ${(props) => props.isAuthorized === false && css`
        background-color: #ff8686;
    `};
    :active {
        outline: none;
        background-color: #e8e8e8;
    }
`;

const AuthReqPopUp = ({ nickname, id }) => {
  const [visible, setVisible] = useState(true);
  const onClick = () => {
    // request something
    // {
    // "board": "board_id",  url에서 가져옴
    // "user": "session_id", cookie에서 가져옴
    // "accept": True, # False
    // }
    setVisible(false);
  };
  return (
    visible && (
    <PopUp index={id}>
      <PopUpText><Bold>{nickname}</Bold> requested an authority.</PopUpText> {/* user.nickname */}
      <PopUpButton onClick={() => onClick(true)}>Yes</PopUpButton>
      <PopUpButton onClick={() => onClick(false)}>No</PopUpButton>
    </PopUp>
    )
  );
};

const Button = ({ isAuthorized, onClick, text }) => <Container isAuthorized={isAuthorized} onClick={onClick}>{text}</Container>;

const AuthReqButton = ({ isAuthorized, onClick, text }) => <Button isAuthorized={isAuthorized} onClick={onClick} text={text} />;

const AuthWindow = ({ user }) => {
  // const [isAdmin, setIsAdmin] = useState(user.type);
  const [isAuthorized, setIsAuthorized] = useState(undefined);
  const [authReqUser, setAuthReqUser] = useState({
    users: [
      { id: 1, nickname: 'WebKing' },
      { id: 2, nickname: 'bbangjo' },
    ],
  });

  return (
    <>
      {
        user.type === 'admin' ? (authReqUser.users.map((user) => <AuthReqPopUp key={user.id} id={user.id} nickname={user.nickname} />))
          : (<AuthReqButton isAuthorized={isAuthorized} onClick={() => reqAuthority(boardID)} text={'Request Authority'} />)
      }
    </>
  );
};

export default AuthWindow;
