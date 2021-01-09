import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from 'config';

const Register = async () => {
  try {
    const {
      data,
    } = await axios.get(`${BACKEND_URL}:${BACKEND_PORT}/api/new_board`, { withCredentials: true });
    return data;
  } catch (error) {
    console.log('register error', error);
    return false;
  }
};

const Main = () => {
  const router = useRouter();
  useEffect(() => {
    try {
      Register().then((res) => {
        router.push(`/board/${res.board}`);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>Loading...</div>
  );
};

export default Main;
