import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import OrderForm from "../Orders/OrderForm"
import MenuItemBox from "../MenuItems/MenuItemBox"
import "./Restaurant.css"



class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurant: this.props.location.state.active
    }
    this.handleLogoChange = this.handleLogoChange.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  handleLogoChange(e) {
    this.setState( { logo: e.target.value });
  }

  updateRestaurant(e) {
    e.preventDefault();
    let logo = this.state.logo.trim();
    axios.put(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/restaurants/${this.state.restaurant._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { logo: logo }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ logo: undefined })
    })
  }

  deleteRestaurant(e) {
    axios.delete(`https://api.mlab.com/api/1/databases/heroku_02sq48jf/collections/restaurants/${this.state.restaurant._id.$oid}?apiKey=9hEnHZ_LOgxiq5ZD1LDfKVMAWxyFCaBa`, { name: name }).then( res => {
      console.log("Restaurant Deleted");
    })
    .catch(err => {
      console.error(err);
    })
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
            <button onClick={ this.deleteRestaurant }>Delete</button>
        </div>
        <MenuItemBox
          restaurant={this.state.restaurant}
        />
      </div>
    )
  }
}

export default Restaurant;
