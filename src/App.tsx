import React from 'react';
import './App.css';
import { ListItem } from './components/list-item/list-item';
import { AssemblyProcess } from './models/AssemblyProcess';
import dataService from './data.service';
import { SvgIcons } from './components/svg-icons/svg-icons';
import { timer, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators'
import { SortOrders } from './enums/SortOrders';
import { AssemblyStatuses, assemblyStatusesMap } from './enums/AssemblyStatuses';
import { ReviewStatuses, reviewStatusesMap } from './enums/ReviewStatuses';
import OrderDirectionSwitcher from './components/state-switcher/order-direction-switcher';

interface IAppState {
  items: AssemblyProcess[],
  sortingOrder: SortOrders
  queryString: string
}

class App extends React.Component<{}, IAppState> {

  public assemblyStatusFilter: AssemblyStatuses | '' = ''
  public reviewStatusFilter: ReviewStatuses | '' = ''

  public searchSubject: Subject<string> = new Subject()
  public debounceSearch$ = this.searchSubject.pipe(debounce(() => timer(400)))

  constructor(props = {}) {
    super(props)
    this.state = {
      items: [],
      sortingOrder: SortOrders.DESC,
      queryString: ''
    }
  }

  public UNSAFE_componentWillMount(): void {
    this.initSubscribers()
    dataService.getAssemblyProcesses(this.assemblyStatusFilter, this.reviewStatusFilter, this.state.queryString, this.state.sortingOrder)
  }

  public onSortingDirectionValueChanged = (order: SortOrders): void => {
    this.setState({sortingOrder: order})
    dataService.getAssemblyProcesses(this.assemblyStatusFilter, this.reviewStatusFilter, this.state.queryString, this.state.sortingOrder)
  }

  private initSubscribers(): void {
    dataService.assemblyProcesses$.subscribe((processes: AssemblyProcess[]) => {
      this.setState({items: processes})
    })

    this.debounceSearch$.subscribe((filterVal: string) => {
      dataService.getAssemblyProcesses(this.assemblyStatusFilter, this.reviewStatusFilter, filterVal, this.state.sortingOrder)
    })
  }

  public handleSearchInputChange = (event: any) => {
    this.setState({queryString: event.target.value})
    this.searchSubject.next(this.state.queryString)
  }

  render(){

    return (
      <div className="App">
        <SvgIcons></SvgIcons>
        <div className="status-filters-container">
          <h1 className="filters-title">Filters</h1>
          <div className="filters-group">
            <h2 className="filters-group-title">Assembly</h2>
            <ul className="filters-list">
              <li className="filter-name selected-filter">Any</li>
              {
                Object.keys(AssemblyStatuses).map((status: string, i: number) => {
                  const typedStatus = status as keyof typeof AssemblyStatuses
                  return <li className="filter-name" key={i}>{assemblyStatusesMap[AssemblyStatuses[typedStatus]]}</li>
                })
              }
            </ul>
          </div>

          <div className="filters-group">
            <h2 className="filters-group-title">Review</h2>
            <ul className="filters-list">
              <li className="filter-name selected-filter">Any</li>
              {
                Object.keys(ReviewStatuses).map((status: string, i: number) => {
                  const typedStatus = status as keyof typeof ReviewStatuses
                  return <li className="filter-name" key={i}>{reviewStatusesMap[ReviewStatuses[typedStatus]]}</li>
                })
              }
            </ul>
          </div>
        </div>
        <div className="container">

          <div className="App-header">
            <span className="title">
              <span className="title-text">Assembly Processes</span>
              <span className="badge">{this.state.items.length}</span>
            </span>

            <div className="list-items-controller">
              <span className="show">Show</span>
              <div className="sort">
                <OrderDirectionSwitcher initialSortingOrder={this.state.sortingOrder} valueChanged={this.onSortingDirectionValueChanged}></OrderDirectionSwitcher>
              </div>
              <div className="search">
                <svg className="search-icon" width="20" height="34">
                  <use xlinkHref="#icon-search" />
                </svg>
                <input className="search-field" type="text" defaultValue={this.state.queryString} onChange={this.handleSearchInputChange}/>
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
      </div>
    )
  }
}

export default App;
