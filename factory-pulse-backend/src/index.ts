import mqtt from 'mqtt';
import type { MachinePayload } from './types';

const client = mqtt.connect('mqtt://localhost:1883');

client.on('connect', () => {
  console.log('Połączono z Mosquitto');
  client.subscribe('factory/machine1/status', (err) => {
    if (!err) console.log('Subskrybuję factory/machine1/status');
  });
});

client.on('message', (topic, message) => {

  try{
    const payload: MachinePayload = JSON.parse(message.toString());
    console.log(`Otrzymano wiadomość z tematu ${topic}:`, `Status: ${payload.status}, Temperatura: ${payload.temp}`);
  } catch (err) {
    console.error('Błąd parsowania wiadomości:', err);
  }
});