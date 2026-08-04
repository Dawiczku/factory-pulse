// 1. Podstawowe typy pomocnicze
export interface MetricValue<T = number> {
  value: T;
  unit: string | null;
}

export type MachineStatus = "running" | "idle" | "stopped" | "error";

// 2. Wspólna baza dla wszystkich maszyn
interface BaseMachinePayload {
  machineId: string;
  timestamp: string;
  status: MachineStatus;
  statusReason: string | null;
  production: {
    count: number;
    rejects: number;
  };
}

// 3. Specyficzne metryki dla poszczególnych maszyn
export interface LifterPayload extends BaseMachinePayload {
  machineType: "lifter";
  metrics: {
    motorSpeed: MetricValue;
    vibration: MetricValue;
  };
}

export interface SorterPayload extends BaseMachinePayload {
  machineType: "sorter";
  metrics: {
    speed: MetricValue;
    infeedsActivated: MetricValue;
  };
}

export interface ConveyorPayload extends BaseMachinePayload {
  machineType: "conveyor";
  metrics: {
    speed: MetricValue;
    productsOnConveyor: MetricValue;
  };
}

// 4. Główny typ – unia dyskryminowana
export type MachinePayload = LifterPayload | SorterPayload | ConveyorPayload;
