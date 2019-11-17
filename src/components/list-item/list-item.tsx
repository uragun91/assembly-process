import React, { Component } from "react";
import { AssemblyProcess } from "../../models/AssemblyProcess";

interface IListItemProps {
  item: AssemblyProcess
}

export class ListItem extends Component<IListItemProps> {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <pre>{ JSON.stringify(this.props) }</pre>
      </div>
    );
  }
}