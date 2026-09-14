export interface MetricValue {
  value: number;
  unit: string;
}

export interface MachinePayload {
  machineId: string;
  machineType: "lifter" | "sorter" | "conveyor";
  timestamp: string;
  status: "running" | "warning" | "error";
  statusReason: string | null;
  production: { count: number; rejects: number };
  metrics: Record<string, MetricValue>;
}

export type Machines = Record<string, MachinePayload>;
