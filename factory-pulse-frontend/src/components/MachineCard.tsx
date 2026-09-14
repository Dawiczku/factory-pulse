import type { MachinePayload } from '@/types';
import { MachineIcon } from './MachineIcon';

interface Props {
  machine: MachinePayload;
  isOffline: boolean;
}

const statusLabel: Record<string, string> = {
  running: 'Pracuje',
  warning: 'Ostrzeżenie',
  error: 'Awaria',
};

export function MachineCard({ machine, isOffline }: Props) {
  const statusClass = isOffline ? 'offline' : machine.status;

  return (
    <div className={`machine-card ${statusClass}`}>
      <div className="machine-card__header">
        <MachineIcon type={machine.machineType} />
        <div>
          <h3>{machine.machineId}</h3>
          <span className="machine-card__type">{machine.machineType}</span>
        </div>
        <span className={`status-pill ${statusClass}`}>
          {isOffline ? 'OFFLINE' : statusLabel[machine.status]}
        </span>
      </div>

      <div className="machine-card__body">
        <div className="stat">
          <span className="stat__label">Produkcja</span>
          <span className="stat__value">{machine.production.count}</span>
        </div>
        <div className="stat">
          <span className="stat__label">Odrzuty</span>
          <span className="stat__value">{machine.production.rejects}</span>
        </div>
        {Object.entries(machine.metrics).map(([key, metric]) => (
          <div className="stat" key={key}>
            <span className="stat__label">{key}</span>
            <span className="stat__value">
              {metric.value} {metric.unit}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
