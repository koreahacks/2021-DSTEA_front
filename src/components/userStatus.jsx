import React, { useState } from 'react';
import styled from 'styled-components';

const Layout = styled.div`
  position: absolute;
  top: 80px;
  right: 20px;
  width: 180px;
  height: auto;
  display: flex;
  flex-direction: column;
  img {
    position: absolute;
    right: 0px;
    top: 0px;
    width: 40px;
    height: 40px;
  }
  img:active {
    position: absolute;
    right: -1px;
    top: -1px;
    width: 42px;
    height: 42px;
  }
  .users {
    position: relative;
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    .list {
      position: relative;
      margin-bottom: 50px;
      width: auto;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    h3 {
      margin: 0px;
      position: relative;
      text-align: center;
      color: #202020;
      border-bottom: 1px solid black;
    }
    p {
      font-weight: 500;
      position: relative;
      width: auto;
      margin: 5px 0px;
      display: inline-block;
      text-align: right;
      color: #303030;
    }
    p.admin::before{
      content: "";
      position: absolute;
      left: -17px;
      top: 50%;
      transform: translateY(-50%);
      background-image: url('/star.svg');
      width: 13px;
      height: 13px;
    }
  }
`;

const userStatus = ({ userInfo }) => {
  const [popUp, setPopUp] = useState(0);
  return (
    <Layout>
      <img
        src="/members.svg"
        alt="open user tab"
        onClick={() => { setPopUp(!popUp); }}
        style={{ cursor: 'pointer' }}
      />
      {popUp ? (
        <div className="users">
          <h3>Authorized Users</h3>
          <div className="list">
            {userInfo.map(({ username, type }) => {
              if (type === 'admin' || type === 'manager') {
                return <p className={type}>{username}</p>;
              }
              return null;
            })}
          </div>
          <h3>BoardMembers</h3>
          <div className="list">
            {userInfo.map(({ username, type }) => {
              if (type === 'guest') {
                return <p className={type}>{username}</p>;
              }
              return null;
            })}
          </div>
        </div>
      ) : null}
    </Layout>
  );
};

export default userStatus;
