import type { MachinePayload } from '../types';
import { useState, useEffect } from 'react';

export const useMachineStatus = () => {
  const socketUrl = 'ws://localhost:8080';
  const [machineData, setMachineData] = useState<MachinePayload>();
  const [isConnectionActive, setIsConnectionActive] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(socketUrl);
    socket.onopen = () => {
      setIsConnectionActive(true);
    };
    socket.onerror = () => {
      setIsConnectionActive(false);
      console.log('Błąd');
    };
    socket.onmessage = (e) => {
      try {
        const parsedData: MachinePayload = JSON.parse(e.data);
        setMachineData(parsedData);
        console.log(parsedData);
      } catch (err) {
        console.error(err);
      }
    };
    socket.onclose = () => {
      setIsConnectionActive(false);
    };
    return () => {
      socket.close();
    };
  }, []);

  return [machineData, isConnectionActive] as const;
};
