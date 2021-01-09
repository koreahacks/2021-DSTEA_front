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

`;

export default Main;
