import React, { Component } from "react";
import './status-filters.css'
import { AssemblyStatuses, assemblyStatusesMap } from '../../enums/AssemblyStatuses'
import { ReviewStatuses, reviewStatusesMap } from '../../enums/ReviewStatuses'

interface IStatusFiltersProps {
  assemblyStatus: AssemblyStatuses | '',
  reviewStatus: ReviewStatuses | '',
  assemblyStatusChanged: (status: AssemblyStatuses | '') => void
  reviewStatusChanged: (status: ReviewStatuses | '') => void
}

interface IStatusFiltersState {
  assemblyStatus: AssemblyStatuses | '',
  reviewStatus: ReviewStatuses | ''
}

export class StatusFilters extends Component<IStatusFiltersProps, IStatusFiltersState> {

  constructor (props: IStatusFiltersProps) {
    super(props)

    this.state = {
      assemblyStatus: this.props.assemblyStatus,
      reviewStatus: this.props.reviewStatus
    }
  }

  public setAssemblyFilterStatus = (status: AssemblyStatuses | ''): () => void => {
    return () => {
      this.setState({
        assemblyStatus: status
      }, () => {
        this.props.assemblyStatusChanged(status)
      })
    }
  }

  private getAssemblyStatusClassNames = (status: AssemblyStatuses | ''): string => {
    const result = ['filter-name']
    if (status === this.state.assemblyStatus) {
      result.push('selected-filter')
    }
    return result.join(' ')
  }

  private setReviewFilterStatus = (status: ReviewStatuses | ''): () => void => {
    return () => {
      this.setState({
        reviewStatus: status
      }, () => {
        this.props.reviewStatusChanged(status)
      })
    }
  }

  private getReviewStatusClassNames = (status: ReviewStatuses | ''): string => {
    const result = ['filter-name']
    if (status === this.state.reviewStatus) {
      result.push('selected-filter')
    }
    return result.join(' ')
  }

  render() {
    return (
      <div className="status-filters-container">
        <h1 className="filters-title">Filters</h1>
        <div className="filters-group">
          <h2 className="filters-group-title">Assembly</h2>
          <ul className="filters-list">
            <li
              className={this.getAssemblyStatusClassNames('')}
              onClick={this.setAssemblyFilterStatus('')}
            >
              Any
            </li>
            {
              Object.keys(AssemblyStatuses).map((status: string, i: number) => {
                const keyOfEnum = status as keyof typeof AssemblyStatuses
                return <li
                  className={this.getAssemblyStatusClassNames(AssemblyStatuses[keyOfEnum])}
                  key={i}
                  onClick={this.setAssemblyFilterStatus(AssemblyStatuses[keyOfEnum])}
                >
                  {assemblyStatusesMap[AssemblyStatuses[keyOfEnum]]}
                </li>
              })
            }
          </ul>
        </div>

        <div className="filters-group">
          <h2 className="filters-group-title">Review</h2>
          <ul className="filters-list">
            <li
              className={this.getReviewStatusClassNames('')}
              onClick={this.setReviewFilterStatus('')}
            >
              Any
            </li>
            {
              Object.keys(ReviewStatuses).map((status: string, i: number) => {
                const keyOfEnum = status as keyof typeof ReviewStatuses
                return <li
                  className={this.getReviewStatusClassNames(ReviewStatuses[keyOfEnum])}
                  key={i}
                  onClick={this.setReviewFilterStatus(ReviewStatuses[keyOfEnum])}
                >
                  {reviewStatusesMap[ReviewStatuses[keyOfEnum]]}
                </li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}