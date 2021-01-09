import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MainBoard from 'src/components/mainBoard';
import Header from 'src/components/header';

import RightNav from 'src/components/rightnav';

const Main = () => {
  const router = useRouter();
  const { boardID } = router.query;
  const [boardInfo, setBoardInfo] = useState({
    type: 'ppt',
    index: {
      rendering: [0, 6],
      writing: 0,
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

  return (
    <Layout>
      <Header />
      <section>
        {/* <LeftNav></LeftNav> */}
        {/* <MainBoard></MainBoard> */}
        <div className="main-wrapper">
          <MainBoard
            boardInfo={boardInfo}
            penInfo={penInfo}
          />
        </div>
        <RightNav
          penInfo={penInfo}
          setPenInfo={setPenInfo}
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
