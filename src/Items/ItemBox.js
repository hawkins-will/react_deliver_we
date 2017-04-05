import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import MenuItemBoxPersonal from "../MenuItems/MenuItemBoxPersonal";

class ItemBox extends Component {
  constructor(props) {
    super(props);
    let personalOrder =  this.props.personalOrder
    let order = this.props.order
    let restaurant = this.props.restaurant
    this.state = {
      items: personalOrder.items,
      personalOrder: personalOrder,
      order: order,
      restaurant: restaurant
     };
  }

  handleNewItem(newItems){
    let order = this.state.order
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newItems }).then( res => {
      this.setState( {items: newItems });
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    let total = 0.00
    let items = this.props.personalOrder.items.map( (item, index) => {
      let pathname = `/item/${item.name}`
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
          <MenuItemBoxPersonal
            restaurant={this.state.restaurant} order={this.state.order} personalOrder={this.state.personalOrder} handleNewItem={(e) => this.handleNewItem(e)}
          />
      </div>
    )
  }
}

export default ItemBox;
