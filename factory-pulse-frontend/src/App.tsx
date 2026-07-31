import { useMachineStatus } from './hooks/useMachineStatus';
import './App.css';

function App() {
  const [machineData, isConnectionActive] = useMachineStatus();

  return (
    <>
      {isConnectionActive ? (
        <p>{`Status: ${machineData?.status} with temp: ${machineData?.temp}`}</p>
      ) : (
        <p>{'No connection yet'}</p>
      )}
    </>
  );
}

export default App;
