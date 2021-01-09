import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MainBoard from 'src/components/mainBoard';
import Header from 'src/components/header';
import LeftNav from 'src/components/leftnav';

import RightNav from 'src/components/rightnav';

const Main = () => {
  const router = useRouter();
  const { boardID } = router.query;
  const navbar = useRef();

  const [boardInfo, setBoardInfo] = useState({
    type: 'ppt',
    index: {
      rendering: [0, 5],
      writing: 5,
      user: 0,
      admin: 1,
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
      username: 'Lovely Bbanjo',
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
        <LeftNav boardInfo={boardInfo} setBoardInfo={setBoardInfo} navbar={navbar} />
        <div className="main-wrapper">
          <MainBoard
            boardInfo={boardInfo}
            penInfo={penInfo}
          />
        </div>
        <RightNav
          penInfo={penInfo}
          setPenInfo={setPenInfo}
          boardInfo={boardInfo}
          setBoardInfo={setBoardInfo}
          userInfo={userInfo}
        />
        {/* <RightNav></RightNav> */}
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
