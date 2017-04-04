import React, { Component } from "react";
// import axios from "axios"
import { Link } from "react-router-dom"

class ItemBox extends Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    let items = this.props.personalOrder.items.map( (item, index) => {
      let pathname = `/item/${item._id}`
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
          <ol>
            {items}
          </ol>
      </div>
    )
  }
}

export default ItemBox;
