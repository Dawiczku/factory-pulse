import type { MachinePayload, Machines } from '../types';
import { useState, useEffect } from 'react';

const OFFLINE_THRESHOLD_MS = 15000; // jeśli brak wiadomości przez 15s, uznajemy za offline

export const useMachineStatus = () => {
  const socketUrl = 'ws://localhost:8080';
  const [machines, setMachines] = useState<Machines>({});
  const [isConnectionActive, setIsConnectionActive] = useState<boolean>(false);
  // Nowość: mapa "kiedy ostatnio widzieliśmy każdą maszynę"
  const [lastSeen, setLastSeen] = useState<Record<string, number>>({});
  // Nowość: zbiór ID maszyn, które uznajemy za offline TERAZ
  const [offlineMachines, setOfflineMachines] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const socket = new WebSocket(socketUrl);
    socket.onopen = () => setIsConnectionActive(true);
    socket.onerror = (e) => {
      setIsConnectionActive(false);
      console.log(e);
    };
    socket.onmessage = (e) => {
      try {
        const parsedData: MachinePayload = JSON.parse(e.data);
        setMachines((prev) => ({
          ...prev,
          [parsedData.machineId]: parsedData,
        }));
        // za każdym razem, gdy przychodzi wiadomość, aktualizujemy "ostatnio widziano"
        setLastSeen((prev) => ({
          ...prev,
          [parsedData.machineId]: Date.now(),
        }));
      } catch (err) {
        console.error(err);
      }
    };
    socket.onclose = () => setIsConnectionActive(false);
    return () => socket.close();
  }, []);

  // Osobny useEffect - niezależny "zegar" sprawdzający co sekundę,
  // czy któraś maszyna nie zamilkła zbyt długo
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const stillOffline = new Set<string>();
      Object.entries(lastSeen).forEach(([machineId, ts]) => {
        if (now - ts > OFFLINE_THRESHOLD_MS) {
          stillOffline.add(machineId);
        }
      });
      setOfflineMachines(stillOffline);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastSeen]);

  return [machines, isConnectionActive, offlineMachines] as const;
};
