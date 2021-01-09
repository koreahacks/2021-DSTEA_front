import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { BACKEND_URL, BACKEND_PORT } from 'config';

const Main = () => {
  const router = useRouter();
  const Register = async () => {
    try {
      const {
        data,
      } = await axios.get(`${BACKEND_URL}:${BACKEND_PORT}/api/new_board`, { withCredentials: true });
      router.push(`/board/${data.board}`);
      return data;
    } catch (error) {
      console.log('register error', error);
      return false;
    }
  };
  useEffect(() => {
    try {
      Register();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>Loading...</div>
  );
};

export default Main;
