import type { MachinePayload, Machines } from '../types';
import { useState, useEffect } from 'react';

export const useMachineStatus = () => {
  const socketUrl = 'ws://localhost:8080';
  const [machines, setMachines] = useState<Machines>({});
  const [isConnectionActive, setIsConnectionActive] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket(socketUrl);
    socket.onopen = () => {
      setIsConnectionActive(true);
    };
    socket.onerror = (e) => {
      setIsConnectionActive(false);
      console.log(e);
    };
    socket.onmessage = (e) => {
      try {
        const parsedData: MachinePayload = JSON.parse(e.data);
        setMachines((prevMachines) => ({
          ...prevMachines,
          [parsedData.machineId]: parsedData,
        }));
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

  return [machines, isConnectionActive] as const;
};
