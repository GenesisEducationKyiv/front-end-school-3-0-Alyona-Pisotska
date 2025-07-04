import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { API_BASE_URL } from '@/lib/constants/constants';

import type { Track } from '@/lib/types/types';

type ActiveTrack = {
  title: Track['title'];
};

const useActiveTrack = () => {
  const [activeTrack, setActiveTrack] = useState('');

  useEffect(() => {
    const socket = io(API_BASE_URL);

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server for active track updates!');
    });

    socket.on('active-track:update', (data: ActiveTrack) => {
      setActiveTrack(data.title);
    });

    socket.on('disconnect', () => {
      setActiveTrack('');
    });

    socket.on('connect_error', () => {
      setActiveTrack('');
    });

    return () => {
      socket.disconnect();
      console.log('Socket.IO client for active track disconnected on cleanup.');
    };
  }, []);

  return { activeTrack };
};

export { useActiveTrack };
