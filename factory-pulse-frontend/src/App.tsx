import { useMachineStatus } from './hooks/useMachineStatus';
import { MachineCard } from './components/MachineCard';
import './App.css';

function App() {
  const [machines, isConnectionActive, offlineMachines] = useMachineStatus();

  return (
    <div className="app">
      <header className="app-header">
        <svg
          viewBox="0 0 24 24"
          width="28"
          height="28"
          stroke="#22c55e"
          strokeWidth="2"
          fill="none"
        >
          <path
            d="M3 12h4l2-7 4 14 2-7h6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <h1>Factory Pulse</h1>
        <span className={`conn-indicator ${isConnectionActive ? 'on' : 'off'}`}>
          {isConnectionActive ? 'Połączono' : 'Brak połączenia'}
        </span>
      </header>

      <main className="machine-grid">
        {Object.values(machines).map((machine) => (
          <MachineCard
            key={machine.machineId}
            machine={machine}
            isOffline={offlineMachines.has(machine.machineId)}
          />
        ))}
      </main>
    </div>
  );
}

export default App;
