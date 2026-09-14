import type { MachinePayload } from '@/types';

interface MachineCardProps {
  machine: MachinePayload;
  isOffline: boolean;
}

// Mapa statusów na kolory
const statusColors: Record<string, string> = {
  running: '#22c55e', // zielony
  warning: '#eab308', // żółty
  error: '#ef4444', // czerwony
};

export function MachineCard({ machine, isOffline }: MachineCardProps) {
  const borderColor = isOffline
    ? '#6b7280'
    : (statusColors[machine.status] ?? '#6b7280');

  return (
    <div
      style={{
        border: `2px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '16px',
        margin: '8px',
        minWidth: '250px',
        opacity: isOffline ? 0.5 : 1, // przygaszona karta, jeśli offline
      }}
    >
      <h3>
        {machine.machineId} ({machine.machineType})
      </h3>
      <p>Status: {isOffline ? 'OFFLINE' : machine.status}</p>
      {machine.statusReason && <p>Powód: {machine.statusReason}</p>}
      <p>
        Produkcja: {machine.production.count} (odrzuty:{' '}
        {machine.production.rejects})
      </p>
      <p>
        Prędkość silnika: {machine.metrics.motorSpeed.value}{' '}
        {machine.metrics.motorSpeed.unit}
      </p>
      <p>
        Wibracje: {machine.metrics.vibration.value}{' '}
        {machine.metrics.vibration.unit}
      </p>
    </div>
  );
}
