import React, { Component } from "react";
import './list-item.css'
import { AssemblyProcess } from "../../models/AssemblyProcess";

interface IListItemProps {
  item: AssemblyProcess
}

export class ListItem extends Component<IListItemProps> {
  render() {
    return (
      <div className="list-item">
        <div className="list-item__image"></div>
        <div className="list-item__description">
          <h1 className="list-item__title">{this.props.item.title}</h1>
          <div className="list-item__review-status">
            <span className="list-item__description-label">Review Status</span>
            <span className="list-item__filler"></span>
            <span className="list-item__description-value">{this.props.item.reviewStatus}</span>
          </div>
          <div className="list-item__last-update">
            <span className="list-item__description-label">Last Update</span>
            <span className="list-item__filler"></span>
            <span className="list-item__description-value">{
              new Intl.DateTimeFormat('en-GB').format(this.props.item.updatedAt)
            }</span>
          </div>
        </div>
        <div className="list-item__actions">
          <div className="list-items__rest-actions">
            <span>Rename</span>
            <span>Delete</span>
          </div>
          <button className="btn">View Process</button>
        </div>
      </div>
    );
  }
}