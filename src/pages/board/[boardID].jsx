import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MainBoard from 'src/components/mainBoard';
import Header from 'src/components/header';
import LeftNav from 'src/components/leftnav';
import PopUp from 'src/components/popup';
import RightNav from 'src/components/rightnav';

const Main = () => {
  const router = useRouter();
  const { boardID } = router.query;
  const navbar = useRef();

  const [boardInfo, setBoardInfo] = useState({
    type: 'none',
    index: {
      rendering: [0, 1],
      writing: 0,
      user: 0,
      admin: 0,
      current: 'user',
    },
    urls: [
      'https://picsum.photos/500/600?random=0',
      'https://picsum.photos/500/600?random=1',
      'https://picsum.photos/500/600?random=2',
      'https://picsum.photos/500/600?random=3',
      'https://picsum.photos/500/600?random=4',
    ],
  });
  const [penInfo, setPenInfo] = useState({
    type: 'pen',
    'stroke-width': 3,
    stroke: 'rgba(132, 228, 247, 1.0)',
  });

  const [userInfo, setUserInfo] = useState([
    {
      username: 'ReactkingKojin',
      type: 'admin',
    }, {
      username: 'BbanjowholovesJW',
      type: 'manager',
    }, {
      username: 'DesignSlaveUKth',
      type: 'guest',
    }, {
      username: 'ToeicKing Taeho',
      type: 'guest',
    }, {
      username: 'L0Z1KtheCB_Lover',
      type: 'guest',
    }, {
      username: 'ComputerInstallerHanch',
      type: 'guest',
    },
  ]);

  return (
    <Layout>
      <Header />
      <section ref={navbar}>
        {boardInfo.type !== 'none' ? <LeftNav boardInfo={boardInfo} setBoardInfo={setBoardInfo} navbar={navbar} /> : ''}
        {boardInfo.type !== 'none' ? (
          <div className="main-wrapper">
            <MainBoard
              boardInfo={boardInfo}
              penInfo={penInfo}
            />
          </div>
        ) : (
          <div className="main-wrapper">
            <PopUp handleFile={(file) => {
              alert(file[0].name);
            }}
            >
              <MainBoard
                boardInfo={boardInfo}
                penInfo={penInfo}
              />
            </PopUp>
          </div>
        )}
        <RightNav
          penInfo={penInfo}
          setPenInfo={setPenInfo}
          boardInfo={boardInfo}
          setBoardInfo={setBoardInfo}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          boardID={boardID}
        />
      </section>
    </Layout>
  );
};

const Layout = styled.div`
  section {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100vh;
    .main-wrapper {
      margin-left: 11px;
      position: relative;
      height: 100%;
      width: auto;
      background-color: white;
      flex-grow: 1;
    }
    img {
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -o-user-select: none;
      user-select: none;
    }
  }
`;

export default Main;
