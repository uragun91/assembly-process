import React from 'react';
import './App.css';
import { ListItem } from './components/list-item/list-item';
import { AssemblyProcess } from './models/AssemblyProcess';
import dataService from './data.service';
import { SvgIcons } from './components/svg-icons/svg-icons';
import { timer, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators'
import { SortOrders } from './enums/SortOrders';
import { AssemblyStatuses } from './enums/AssemblyStatuses';
import { ReviewStatuses } from './enums/ReviewStatuses';

interface IAppState {
  items: AssemblyProcess[]
}

class App extends React.Component<{}, IAppState> {

  public titleFilter: string = ''
  public sortOrder: SortOrders = SortOrders.DESC
  public assemblyStatusFilter: AssemblyStatuses | '' = ''
  public reviewStatusFilter: ReviewStatuses | '' = ''

  public searchSubject: Subject<string> = new Subject()
  public debounceSearch$ = this.searchSubject.pipe(debounce(() => timer(400)))

  get isDesc(): boolean {
    return this.sortOrder === SortOrders.DESC
  }

  public UNSAFE_componentWillMount(): void {
    this.setState({items: []})
    this.initSubscribers()
    dataService.getAssemblyProcesses(this.assemblyStatusFilter, this.reviewStatusFilter, this.titleFilter, this.sortOrder)
  }

  private initSubscribers(): void {
    dataService.assemblyProcesses$.subscribe((processes: AssemblyProcess[]) => {
      this.setState({items: processes})
    })

    this.debounceSearch$.subscribe((filterVal: string) => {
      dataService.getAssemblyProcesses(this.assemblyStatusFilter, this.reviewStatusFilter, filterVal, this.sortOrder)
    })
  }

  public handleSearchInputChange = (event: any) => {
    this.titleFilter = event.target.value
    this.searchSubject.next(this.titleFilter)
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
              <div className="sort-switcher">
                <label className="switcher-label">
                  <input type="checkbox" className="switcher-checkbox" defaultChecked={this.isDesc} />
                  <div className="switcher-slider"></div>
                </label>
                <span className="switcher-value">Lates First</span>
                <span className="switcher-value">Oldest First</span>
              </div>
            </div>
            <div className="search">
              <input type="text" defaultValue={this.titleFilter} onChange={this.handleSearchInputChange}/>
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
