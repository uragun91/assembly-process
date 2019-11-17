import React from 'react';
import './App.css';
import { ListItem } from './components/list-item/list-item';
import { AssemblyProcess } from './models/AssemblyProcess';
import { ReviewStatuses } from './enums/ReviewStatuses';
import { AssemblyStatuses } from './enums/AssemblyStatuses';

const App: React.FC = () => {

  const assemblyProcesses: AssemblyProcess[] = [1, 2, 3, 4, 5].map((num: number) => {
    return AssemblyProcess.build({
      _id: num.toString(),
      title: `Assembly Process ${num}`,
      reviewStatus: ReviewStatuses.draft,
      assemblyStatus: AssemblyStatuses.inReview
    })
  })

  return (
    <div className="App">
      <div className="App-header">
        <span className="title">Assembly Processes</span>
        <span className="badge">{assemblyProcesses.length}</span>
      </div>
      {
        assemblyProcesses.map((process: AssemblyProcess) => {
          return <ListItem key={process._id} item={process}></ListItem>
        })
      }
    </div>
  );
}

export default App;
