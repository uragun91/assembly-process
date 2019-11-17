import React from 'react';
import './App.css';
import { ListItem } from './components/list-item/list-item';
import { AssemblyProcess } from './models/AssemblyProcess';

const App: React.FC = () => {

  const assemblyProcesses: AssemblyProcess[] = [1, 2, 3, 4, 5].map((num: number) => {
    return AssemblyProcess.build({_id: num.toString(), title: `Assembly Porcess ${num}`})
  })

  return (
    <div className="App">
      {assemblyProcesses.map((process: AssemblyProcess) => {
        return <ListItem key={process._id} item={process}></ListItem>
      })}

    </div>
  );
}

export default App;
