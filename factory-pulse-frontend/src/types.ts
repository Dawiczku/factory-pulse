// Wspólna baza dla wszystkich maszyn
export interface MachinePayload {
  machineId: string;
  machineType: string;
  timestamp: string;
  status: 'running' | 'warning' | 'error';
  statusReason: string | null;
  production: {
    count: number;
    rejects: number;
  };
  metrics: {
    motorSpeed: { value: number; unit: string };
    vibration: { value: number; unit: string };
  };
}

export type Machines = Record<string, MachinePayload>;
