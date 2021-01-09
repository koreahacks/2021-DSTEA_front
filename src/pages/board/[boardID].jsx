import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const Main = () => {
  const router = useRouter();
  const { boardID } = router.query;

  return (
    <Layout>
      {/* <Header /> */}
      <section>
        {/* <LeftNav></LeftNav> */}
        {/* <MainBoard></MainBoard> */}
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
