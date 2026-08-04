import { useMachineStatus } from './hooks/useMachineStatus';
import './App.css';

function App() {
  const [machines, isConnectionActive] = useMachineStatus();

  return (
    <>
      {isConnectionActive ? (
        Object.values(machines).map((machine) => (
          <div key={machine.machineId}>
            <p>{`Typ: ${machine.machineType}, status:${machine.status}`}</p>
          </div>
        ))
      ) : (
        <p>{'Nothing'}</p>
      )}
    </>
  );
}

export default App;
