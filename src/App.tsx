import React from 'react';
import './App.css';
import { ListItem } from './components/list-item/list-item';
import { AssemblyProcess } from './models/AssemblyProcess';
import dataService from './data.service';
import { SvgIcons } from './components/svg-icons/svg-icons';
import { timer, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators'

interface IAppState {
  items: AssemblyProcess[]
}

class App extends React.Component<{}, IAppState> {

  public searchFilterValue: string = ''
  public searchSubject: Subject<string> = new Subject()
  public debounceSearch$ = this.searchSubject.pipe(debounce(() => timer(400)))

  public UNSAFE_componentWillMount() {
    this.setState({items: []})

    dataService.assemblyProcesses$.subscribe((processes: AssemblyProcess[]) => {
      this.setState({items: processes})
    })

    dataService.getAssemblyProcesses()

    this.debounceSearch$.subscribe((filterVal: string) => {
      dataService.getAssemblyProcesses(filterVal)
    })
  }

  public handleSearchInputChange = (event: any) => {
    this.searchFilterValue = event.target.value
    this.searchSubject.next(this.searchFilterValue)
  }

  render(){

    return (
      <div className="App">
        <SvgIcons></SvgIcons>
        <div className="App-header">
          <span className="title">
            Assembly Processes
            <span className="badge">{this.state.items.length}</span>
          </span>

          <div className="list-items-controller">
            <div className="sort">

            </div>
            <div className="search">
              <input type="text" defaultValue={this.searchFilterValue} onChange={this.handleSearchInputChange}/>
            </div>
          </div>

        </div>
        {
          this.state.items.map((process: AssemblyProcess) => {
            return <div className="assembly-process-container" key={process._id}>
              <ListItem key={process._id} item={process}></ListItem>
            </div>
          })
        }
      </div>
    )
  }
}

export default App;
