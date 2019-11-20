import React from 'react';
import './order-direction-switcher.css';
import { SortOrders } from '../../enums/SortOrders';

interface IOrderDirectionSwitcherProps {
  valueChanged: (order: SortOrders) => void
  initialSortingOrder: SortOrders
}

interface IOrderDirectionSwitcherState {
  selectedSortingOrder: SortOrders
}

class OrderDirectionSwitcher extends React.Component<IOrderDirectionSwitcherProps, IOrderDirectionSwitcherState> {

  constructor(props: IOrderDirectionSwitcherProps) {
    super(props)

    this.state = {
      selectedSortingOrder: this.props.initialSortingOrder
    }
  }

  private handleRadioButtonChange = (event: any) => {
    const sortingOrder = event.target.value
    this.setState({ selectedSortingOrder: sortingOrder }, () => {
      setTimeout(() => { // to make switch transition smoother
        this.props.valueChanged(this.state.selectedSortingOrder)
      }, 200)
    })

  }

  render(){

    return (<div className="switch switch-blue">
        <input
          type="radio"
          className="switch-input"
          name="sort-order"
          value={SortOrders.DESC}
          id="sort-order-desc"
          onChange={this.handleRadioButtonChange}
          checked={this.state.selectedSortingOrder === SortOrders.DESC}
        />
        <label htmlFor="sort-order-desc" className="switch-label switch-label-off">Latest first</label>

        <input
          type="radio"
          className="switch-input"
          name="sort-order"
          value={SortOrders.ASC}
          id="sort-order-asc"
          onChange={this.handleRadioButtonChange}
          checked={this.state.selectedSortingOrder === SortOrders.ASC}
        />
        <label htmlFor="sort-order-asc" className="switch-label switch-label-on">Old first</label>

        <span className="switch-selection"></span>
      </div>
    )
  }
}

export default OrderDirectionSwitcher;
