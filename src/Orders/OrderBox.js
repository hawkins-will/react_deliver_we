import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import OrderForm from "./OrderForm"

class OrderBox extends Component {
  constructor(props) {
    super(props);
    this.state = { orders: [] };
  }
  componentDidMount(){
    axios.get("http://localhost:3001/api/orders").then((response) => {
      this.setState({
        orders: response.data
      })
    })
  }

  render() {
    let orders = this.state.orders.map( (order, index) => {
      let pathname = `/order/${order.name}`
      return(
        <li key={index}>
          <Link to={{
            pathname,
            state: {active: order }
          }}>
            {order.name}
          </Link>
        </li>
      )
    })
    return(
      <div>
        <h2>Orders:</h2>
          <ol>
            {orders}
          </ol>
          <OrderForm />
      </div>
    )
  }
}

export default OrderBox;
