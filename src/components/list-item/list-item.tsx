import React, { Component } from "react";
import './list-item.css'
import { AssemblyProcess } from "../../models/AssemblyProcess";
import { ReviewStatuses, reviewStatusesMap } from "../../enums/ReviewStatuses";

interface IListItemProps {
  item: AssemblyProcess,
  itemTitleChanged: (id: string, newTitle: string) => void
  saveButtonClicked: (id: string) => void
}

interface IListItemState {
  isEditingName: boolean
}

export class ListItem extends Component<IListItemProps, IListItemState> {

  constructor(props: IListItemProps) {
    super(props)

    this.state = {
      isEditingName: false
    }
  }

  private handleEditClick = (event: any) => {
    if (!this.state.isEditingName) {
      this.setState({isEditingName: true})
    }
  }

  private handleSaveClick = (event: any) => {
    this.setState({isEditingName: false})
    this.props.saveButtonClicked(this.props.item._id)
  }

  private handlePropNameChanged = (event: any) => {
    this.props.item.title = event.target.value
    this.props.itemTitleChanged(this.props.item._id, event.target.value)
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
          {
            this.state.isEditingName &&
            <span>
              <input type="text" value={this.props.item.title} onChange={this.handlePropNameChanged} />
              <button onClick={this.handleSaveClick}>Save</button>
            </span>
          }
          {
            !this.state.isEditingName &&
            <h1 className="list-item__title">{this.props.item.title}</h1>
          }
          <div className="list-item__review-status">
            <span className="list-item__description-label">Review</span>
            <span className="list-item__filler"></span>
            <span className={this.getReviewStatusClassNames(this.props.item.reviewStatus)}>{reviewStatusesMap[this.props.item.reviewStatus]}</span>
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
            <svg className="list-item__rest-action" width="17" height="17" onClick={this.handleEditClick}>
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