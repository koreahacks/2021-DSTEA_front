import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import MainBoard from 'src/components/mainBoard';
import Header from 'src/components/header';
import LeftNav from 'src/components/leftnav';
import PopUp from 'src/components/popup';
import RightNav from 'src/components/rightnav';
import axios from 'axios';
import { BACKEND_URL } from 'config';

const Main = () => {
  const router = useRouter();
  const { boardID } = router.query;
  const navbar = useRef();
  const [intro, setIntro] = useState(true);
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
    ],
  });
  const [penInfo, setPenInfo] = useState({
    type: 'pen',
    'stroke-width': 3,
    stroke: 'rgba(132, 228, 247, 1.0)',
  });

  // const [userInfo, setUserInfo] = useState([]);
  const [myInfo, setMyInfo] = useState({});
  const [loadState, setLoadState] = useState("waiting");

  const getUsersInfo = async () => {
    try {
      const {
        data,
      } = await axios.get(`${BACKEND_URL}/api/${boardID}/user`, { withCredentials: true });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const getMyInfo = async () => {
    try {
      const { data } = await axios.get(`${BACKEND_URL}/api/${boardID}`, { withCredentials: true });
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (boardID) {
      getMyInfo().then((res) => {
        setMyInfo(res);
      });        
    }
  }, [boardID]);
  // useEffect(() => {
  //   if (Object.keys(myInfo) > 0) {
  //     getUsersInfo().then((res) => {
  //       setUserInfo(res.user_info);
  //     });  
  //   }
  // }, [myInfo]);
  const fileUpload = async (file) => {
    const formData = new FormData();
    try {
      const res = await axios.get(`${BACKEND_URL}/api/${boardID}/file_upload`);
      const div = document.createElement('div');
      div.innerHTML = res.data.trim();
      const csrf = div.firstChild.getAttribute('value');

      formData.append('file', file);
      const {
        data,
      } = await axios.post(`${BACKEND_URL}/api/${boardID}/file_upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRFToken': csrf,
        },
      }, { withCredentials: true });
      return data;
    } catch (err) {
      console.log(err);
      return false;
    }
  };
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
              boardID={boardID}
              myInfo={myInfo}
            />
          </div>
        ) : (
          <div className="main-wrapper">
            <PopUp handleFile={(file) => {
              fileUpload(file[0]).then((res) => {
                setLoadState('complete');
                setIntro(false);
                console.log(res);
                setBoardInfo({
                  ...boardInfo,
                  type: file[0].type.substring(12),
                  urls: res.pages.sort().map(x => `${BACKEND_URL}/static/upload/${boardID}/${x}`),
                  index: {
                    rendering: [0, res.pages.length],
                    writing: 0,
                    user: 0,
                    admin: 0,
                    current: 'user',
                  },
                });
              }).catch((err) => console.log(err));
            }}
            intro={intro}
            setIntro={setIntro}
            loadState={loadState}
            setLoadState={setLoadState}
            >
              <MainBoard
                boardInfo={boardInfo}
                penInfo={penInfo}
                boardID={boardID}
                myInfo={myInfo}
              />              
            </PopUp>
          </div>
        )}
        {myInfo && !intro && loadState === 'complete' || boardInfo.type !== 'none' ? 
          <RightNav
            penInfo={penInfo}
            setPenInfo={setPenInfo}
            boardInfo={boardInfo}
            setBoardInfo={setBoardInfo}
            // userInfo={userInfo}
            // setUserInfo={setUserInfo}
            boardID={boardID}
            myInfo={myInfo}
          />
        : null }
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
      margin-left: 0px;
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
