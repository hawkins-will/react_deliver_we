import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import "./OrderBox.css"

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

  handleOrderDeleted(){
    this.props.handleOrderDeleted()
  }

  handlePersonalOrderDeleted(){
    this.props.handlePersonalOrderDeleted()
  }

  render() {
    let orders = this.state.orders.map( (order, index) => {
      let pathname = `/order/${order.restaurant}`
      return(
        <div className="orderDiv" key={index}>
          <Link to={{
            pathname,
            state: {active: order},
            props: {
              handleOrderDeleted: () => this.handleOrderDeleted(),
              handlePersonalOrderDeleted: () => this.handlePersonalOrderDeleted()
            }

          }}>
            <p>Order from "{order.restaurant}"</p>
          </Link>
          <div className="orderInfoContainer">
            <img />
            <div className="orderInfo">
              <p className="orderInfoTitle">Delivery Fee</p>
              <p>${order.deliveryFee.toFixed(2)}</p>
            </div>
            <div className="orderInfo">
              <p className="orderInfoTitle">Minimum</p>
              <p>${order.deliveryMin.toFixed(2)}</p>
            </div>
          </div>
        </div>
      )
    })
    return(
      <div>
        {orders}
      </div>
    )
  }
}

export default OrderBox;
