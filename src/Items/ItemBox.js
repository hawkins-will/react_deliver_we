import React, { Component } from "react";
// import axios from "axios"
import { Link } from "react-router-dom"

class ItemBox extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    let total = 0.00
    let items = this.props.personalOrder.items.map( (item, index) => {
      let pathname = `/item/${item._id}`
      total = total + item.price
        return(
          <li key={index}>
            <Link to={{
              pathname,
              state: {
                active: item,
                personalOrder: this.props.personalOrder,
                order: this.props.order
               }
            }}>
              {item.name}
            </Link>
          </li>
        )
    })
    return(
      <div>
        <h2>Items:</h2>
        <p>Total: ${total.toFixed(2)}</p>
          <ol>
            {items}
          </ol>
      </div>
    )
  }
}

export default ItemBox;
