import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

import RightNav from 'src/components/rightnav';

const Main = () => {
  const router = useRouter();
  const { boardID } = router.query;
  const [penInfo, setPenInfo] = useState({
    'stroke-width': 3,
    stroke: 'rgba(132, 228, 247, 1.0)',
  });

  return (
    <Layout>
      {/* <Header /> */}
      <section>
        {/* <LeftNav></LeftNav> */}
        {/* <MainBoard></MainBoard> */}
        <RightNav
          penInfo={penInfo}
          setPenInfo={setPenInfo}
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
