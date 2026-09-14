import { useMachineStatus } from '@/hooks/useMachineStatus';
import { MachineCard } from '@/components/MachineCard';
import '@/App.css';

function App() {
  const [machines, isConnectionActive, offlineMachines] = useMachineStatus();

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {isConnectionActive ? (
        Object.values(machines).map((machine) => (
          <MachineCard
            key={machine.machineId}
            machine={machine}
            isOffline={offlineMachines.has(machine.machineId)}
          />
        ))
      ) : (
        <p>Brak połączenia...</p>
      )}
    </div>
  );
}

export default App;
