import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { BACKEND_URL, BACKEND_PORT } from 'config';
import axios from 'axios';
import { useEffect } from 'react/cjs/react.development';

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
const Button = ({ isAuthorized, onClick, text }) => <Container isAuthorized={isAuthorized} onClick={onClick}>{text}</Container>;

const AuthReqButton = ({ isAuthorized, onClick, text }) => <Button isAuthorized={isAuthorized} onClick={onClick} text={text} />;

const AuthWindow = ({ user, boardID, sessionid }) => {
  // const [isAdmin, setIsAdmin] = useState(user.type);
  // const [isAuthorized, setIsAuthorized] = useState(undefined);
  const [authReqUser, setAuthReqUser] = useState([{}]);
  const [ws, setWs] = useState(null);
  const socketUrl = `ws://${BACKEND_URL}/auth/${boardID}/${sessionid}`;
  useEffect(() => {
    const wsClient = new WebSocket(socketUrl);
    wsClient.onopen = () => {
      console.log('web socket open');
      setWs(wsClient);
    };
    wsClient.onclose = () => console.log('web socket close');
    return () => {
      wsClient.close();
    };
  }, []);
  const jsonSend = (msg) => {
    ws.send(JSON.stringify(msg));
  };
  useEffect(() => {
    ws.onmessage = (e) => {
      const msg = JSON.stringify(e.data);
      if (msg.action === 'res') {
        setAuthReqUser([
          ...authReqUser,
          {
            session_id: sessionid,
            nickname: user.nickname,
          },
        ]);
      }
      console.log('e', msg);
    };
  }, [ws]);
  const AuthReqPopUp = ({ userr, sessionID, onClickk, id }) => {
    const [visible, setVisible] = useState(true);
    const onClick = (bool) => {
      setVisible(false);
      onClickk({ action: 'res', session_id: sessionID, nickname: userr.nickname, accept: bool });
    };
    return (
      visible && (
      <PopUp index={id}>
        <PopUpText><Bold>{userr.nickname}</Bold> requested an authority.</PopUpText> {/* user.nickname */}
        <PopUpButton onClick={() => onClick(true)}>Yes</PopUpButton>
        <PopUpButton onClick={() => onClick(false)}>No</PopUpButton>
      </PopUp>
      )
    );
  };
  return (
    <>
      {
        user.type === 'admin' ? (authReqUser.users.map((userr, idx) => (
          <AuthReqPopUp
            key={userr.session_id}
            sessionid={sessionid}
            id={idx}
            user={userr}
            onClick={jsonSend}
          />
        ))
        )
          : (<AuthReqButton isAuthorized={isAuthorized} onClick={() => jsonSend({ action: 'req' })} text={'Request Authority'} />)
      }
    </>
  );
};

export default AuthWindow;
