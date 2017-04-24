import React, { Component } from "react";
import marked from "marked";
// import axios from "axios";
import OrderForm from "../Orders/OrderForm"
import MenuItemBox from "../MenuItems/MenuItemBox"
import "./Restaurant.css"



class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurant: this.props.location.state.active
    }
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  handleOrderAdded(){
    this.props.location.props.handleOrderAdded()
  }

  render() {
    return(
      <div className="restaurantPage">
        <div className="restaurantHeader">
          <h1><img className="restaurantLogo" src={this.state.restaurant.logo} alt={this.state.restaurant.name} /> {this.state.restaurant.name}</h1>
          <p><span>Delivery Fee</span>${this.state.restaurant.deliveryFee.toFixed(2)}</p>
          <p><span>Minimum</span>${this.state.restaurant.deliveryMin.toFixed(2)}</p>
            <OrderForm
              restaurant={this.state.restaurant}
              handleOrderAdded={() => this.handleOrderAdded()}
            />
        </div>

        <MenuItemBox
          restaurant={this.state.restaurant}
        />
      </div>
    )
  }
}

export default Restaurant;
