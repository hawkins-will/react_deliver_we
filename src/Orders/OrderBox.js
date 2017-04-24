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
    axios.get("https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/orders?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa").then((response) => {
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
          <div className="orderInfoName">
            <img className="orderBoxLogo" src={order.logo} alt={order.name}/>
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
          </div>
          <div className="orderInfo">
            <p className="orderInfoTitle">Will Be Placed At</p>
            <p>{order.time}</p>
          </div>
          <div className="orderInfo">
            <p className="orderInfoTitle">Delivery Fee</p>
            <p>${order.deliveryFee.toFixed(2)}</p>
          </div>
          <div className="orderInfo">
            <p className="orderInfoTitle">Minimum</p>
            <p>${order.deliveryMin.toFixed(2)}</p>
          </div>
        </div>
      )
    })
    if (orders.length === 0) {
      return(
        <div className="noOrders">
          <p>No Orders are Currently in Progress</p>
          <Link to="/restaurants">
            <div>Start One</div>
          </Link>
        </div>
      )
    } else {
      return(
        <div>
          <div className="restaurantBoxHeader">
            <p>Join One of these Orders Already in Progress</p>
          </div>
          {orders}
        </div>
      )
    }
  }
}

export default OrderBox;
