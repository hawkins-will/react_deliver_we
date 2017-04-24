import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import ItemBox from "../Items/ItemBox";
import "./PersonalOrder.css"

class PersonalOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      personalOrder: this.props.location.state.active,
      order: this.props.location.state.order,
      name: undefined,
      restaurant: undefined
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updatePersonalOrder = this.updatePersonalOrder.bind(this);
    this.deletePersonalOrder = this.deletePersonalOrder.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  componentWillMount(){
    axios.get(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/restaurants/${this.props.location.state.order.restaurantId}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`).then((response) => {
      this.setState({
        restaurant: response.data
      })
    })
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  updatePersonalOrder(e) {
    e.preventDefault();
    let order = this.state.order;
    let restaurant = this.state.order.restaurant;
    let restaurantId = this.state.order.restaurantId;
    let deliveryFee = this.state.order.deliveryFee;
    let deliveryMin = this.state.order.deliveryMin;
    let tax = this.state.order.tax;
    let time = this.state.order.time;
    let logo = this.state.order.logo;
    let personalId = this.state.personalOrder.id;
    let newArray = order.personalOrders.filter((personalOrder) => {
      return personalOrder.id !== personalId
    })
    let selectedPersonalOrder = order.personalOrders.filter((personalOrder) => {
      return personalOrder.id === personalId
    })
    if (this.state.name){
      selectedPersonalOrder[0].name = this.state.name
    }
    newArray.unshift(selectedPersonalOrder[0])
    axios.put(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/restaurants/${order._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { restaurant, restaurantId, deliveryFee, deliveryMin, tax, time, logo, personalOrders: newArray }).then( res => {
      console.log("Personal Order Update");
    })
    .catch(err => {
      console.error(err);
    })
  }

  deletePersonalOrder(e) {
    let order = this.state.order;
    let restaurant = this.state.order.restaurant;
    let restaurantId = this.state.order.restaurantId;
    let deliveryFee = this.state.order.deliveryFee;
    let deliveryMin = this.state.order.deliveryMin;
    let tax = this.state.order.tax;
    let time = this.state.order.time;
    let logo = this.state.order.logo;
    let personalId = this.state.personalOrder.id;
    let newArray = order.personalOrders.filter((personalOrder) => {
      return personalOrder.id !== personalId
    })
    axios.put(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/orders/${order._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { restaurant, restaurantId, deliveryFee, deliveryMin, tax, time, logo, personalOrders: newArray }).then( res => {
      console.log("Personal Order Deleted");
    })
    .catch(err => {
      console.error(err);
    }).then(() => {
      this.props.location.props.handlePersonalOrderDeleted()
    })
  }

  showModal(e) {
    document.getElementById('myModal').style.display='flex'
  }

  closeModal(e){
    document.getElementById('myModal').style.display='none'
  }

  render() {
    if (this.state.restaurant === undefined) {
      console.log("Not Yet Loaded");
      return(
        <div>Loading Data</div>
      )
    } else {
      return(
        <div className="personalOrderPage">
          <p className="personalOrderTitle">{this.state.personalOrder.name}s Order <span className="cancelOrder" onClick={ this.showModal }> cancel</span></p>
          <ItemBox
            order={this.state.order} personalOrder={this.state.personalOrder} restaurant={this.state.restaurant} handleDeleteItem={(e) => this.handleDeleteItem(e)}
          />

          <div id="myModal" className="modal">
            <div className="modalContent">
              <span className="close" onClick={this.closeModal}>&times;</span>
              <div className="innerModal">
              <p>Are you sure you want to cancel this personal order?</p>
              <p>This will only cancel your order</p>
              <div className="confirmButton" onClick={ this.deletePersonalOrder }>Confirm</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default PersonalOrder;
