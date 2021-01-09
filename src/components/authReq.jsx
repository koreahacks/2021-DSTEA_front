import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const PopUp = styled.div`
    position: fixed;
    width: 180px;
    right: 15px;
    bottom: 130px;
    padding: 10px 10px 10px 10px;
    border: 2px solid #606060;
    background-color: #ffffff;
    border-radius: 4px;
    ${(props) => props.index && css`
    z-index: ${100 - props.index};
    `};
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

const PopUpButton = styled.button`
    cursor: pointer;
    position: relative;
    margin-right: 5px;
    right: -100px;
    background-color: #f8f8f8;
    border: 1px solid #606060;
    border-radius: 1px;
`;

const Wrapper = styled.div`
    position: fixed;
    width: 100px;
    bottom: 50px;
    right: 15px;
    z-index: 2;
`;

const Container = styled.button`
    border-radius: 5px;
    border: 1px solid red;
    align-items: center;
    text-align: center;
    cursor: pointer;
    ${(props) => props.isAuthorized === true && css`
        background-color: green;
    `};
    ${(props) => props.isAuthorized === false && css`
        background-color: red;
    `};
`;

const AuthReqPopUp = ({ nickname, id }) => {
  const [visible, setVisible] = useState(true);
  const onClick = (text) => {
    // request something
    setVisible(false);
  };
  return (
    visible && (
    <PopUp index={id}>
      <PopUpText><Bold>{nickname}</Bold> requested an authority.</PopUpText> {/* user.nickname */}
      <PopUpButton onClick={() => onClick('Yes')}>Yes</PopUpButton>
      <PopUpButton onClick={() => onClick('No')}>No</PopUpButton>
    </PopUp>
    )
  );
};

const Button = ({ isAuthorized, onClick, text }) => <Container isAuthorized={isAuthorized} onClick={onClick}>{text}</Container>;

const AuthReqButton = ({ isAuthorized, onClick, text }) => <Button isAuthorized={isAuthorized} onClick={onClick} text={text} />;

const AuthWindow = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(undefined);
  const [authReqUser, setAuthReqUser] = useState({
    users: [
      { id: 1, nickname: 'WebKing' },
      { id: 2, nickname: 'bbangjo' },
    ],
  });

  const reqAuthority = () => {
    // send request
    // 테스트로 setIsAuthorized 씀
    setIsAuthorized(!isAuthorized);
  };

  return (
    <>
      {
        isAdmin ? (authReqUser.users.map((user) => <AuthReqPopUp key={user.id} id={user.id} nickname={user.nickname} />))
          : (<AuthReqButton isAuthorized={isAuthorized} onClick={() => reqAuthority()} text={'권한 신청'} />)
      }
    </>
  );
};

export default AuthWindow;
