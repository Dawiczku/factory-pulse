import type { MachinePayload } from './types';
import mqtt from 'mqtt';
import { WebSocketServer } from 'ws';

const client = mqtt.connect('mqtt://localhost:1883');
const wss = new WebSocketServer({ port: 8080 });

client.on('connect', () => {
  console.log('Połączono z Mosquitto');
  client.subscribe('factory/machine1/status', (err) => {
    if (!err) console.log('Subskrybuję factory/machine1/status');
  });
});

wss.on('connection' , (ws) => {
  console.log('Połączono z klientem WebSocket');  
  ws.on('close', () => {
    console.log('Klient WebSocket rozłączony');
    })
})

client.on('message', (topic, message) => {

  try{
    const payload: MachinePayload = JSON.parse(message.toString());
    wss.clients.forEach((ws) => {
      if (ws.readyState === ws.OPEN) {
        ws.send(JSON.stringify(payload));
      }
    });
  } catch (err) {
    console.error('Błąd parsowania wiadomości:', err);
  }
});