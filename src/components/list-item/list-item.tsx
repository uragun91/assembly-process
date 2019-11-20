import React, { Component } from "react";
import './list-item.css'
import { AssemblyProcess } from "../../models/AssemblyProcess";
import { ReviewStatuses } from "../../enums/ReviewStatuses";

interface IListItemProps {
  item: AssemblyProcess
}

export class ListItem extends Component<IListItemProps> {

  private previewStatusesMapper: {[key in ReviewStatuses]: string} = {
    DRAFT: 'Draft',
    SIMULATION_NEGATIVE: 'Simulation Negative',
    SIMULATION_POSITIVE: 'Simulation Positive',
    SIMULATION_REQUESTED: 'Simulation Requested',
    SOLVED: 'Solved'
  }

  private getReviewStatusClassNames(reviewStatus: ReviewStatuses): string {
    const classes = ['list-item__description-value']
    if (reviewStatus === ReviewStatuses.simulationNegative) {
      classes.push('negative')
    } else if (reviewStatus === ReviewStatuses.simulationPositive) {
      classes.push('positive')
    }

    return classes.join(' ')
  }

  render() {
    return (
      <div className="list-item">
        <div className="list-item__image"></div>
        <div className="list-item__description">
          <h1 className="list-item__title">{this.props.item.title}</h1>
          <div className="list-item__review-status">
            <span className="list-item__description-label">Review</span>
            <span className="list-item__filler"></span>
            <span className={this.getReviewStatusClassNames(this.props.item.reviewStatus)}>{this.previewStatusesMapper[this.props.item.reviewStatus]}</span>
          </div>
          <div className="list-item__last-update">
            <span className="list-item__description-label">Last Update</span>
            <span className="list-item__filler"></span>
            <span className="list-item__description-value">{
              new Intl.DateTimeFormat('en-GB').format(this.props.item.updated)
            }</span>
          </div>
        </div>
        <div className="list-item__actions">
          <div className="list-item__rest-actions">
            <svg className="list-item__rest-action" width="17" height="17">
              <use xlinkHref='#icon-edit' />
            </svg>
            <svg className="list-item__rest-action" width="17" height="17">
              <use xlinkHref='#icon-delete' />
            </svg>
          </div>
          <button className="list-item__btn">View Process</button>
        </div>
      </div>
    );
  }
}