import React, { Component } from "react";
import marked from "marked";
import axios from "axios";

class Item extends Component {
  constructor(props){
    super(props)
    this.state = {
      item: this.props.location.state.active,
      personalOrder: this.props.location.state.personalOrder,
      order: this.props.location.state.order,
      name: "",
      price: "",
      description: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }


  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handlePriceChange(e) {
    this.setState( { price: e.target.value });
  }

  handleDescriptionChange(e) {
    this.setState( { description: e.target.value });
  }

  updateItem(e) {
    e.preventDefault();
    let order = this.state.order;
    let personalOrder = this.state.personalOrder;
    let itemId = this.state.item._id;
    let newArray = personalOrder.items.filter((item) => {
      return item._id !== itemId
    })
    let selectedItem = personalOrder.items.filter((item) => {
      return item._id === itemId
    })
    selectedItem[0].name = this.state.name
    selectedItem[0].price = this.state.price
    selectedItem[0].description = this.state.description
    newArray.unshift(selectedItem[0])
    personalOrder.items = newArray;
    let personalId = personalOrder._id;
    let newPersonalOrdersArray = order.personalOrders.filter((personalOrder) => {
      return personalOrder._id !== personalId
    })
    newPersonalOrdersArray.push(personalOrder)
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newPersonalOrdersArray }).then( res => {
      console.log("Item Updated");
    })
    .catch(err => {
      console.error(err);
    })
  }

  deleteItem(e) {
    let order = this.state.order;
    let personalOrder = this.state.personalOrder;
    let itemId = this.state.item._id;
    let newArray = personalOrder.items.filter((item) => {
      return item._id !== itemId
    })
    personalOrder.items = newArray;
    let personalId = personalOrder._id;
    let newPersonalOrdersArray = order.personalOrders.filter((personalOrder) => {
      return personalOrder._id !== personalId
    })
    newPersonalOrdersArray.push(personalOrder)
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newPersonalOrdersArray }).then( res => {
      console.log("Item Deleted");
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return(
      <div>
        <p>{this.state.item.name} Page</p>
        <p>${this.state.item.price}</p>
        <p>{this.state.item.description}</p>
        <form onSubmit={ this.updateItem }>
          <input type="text" placeholder={ this.state.item.name } onChange={ this.handleNameChange } />
          <input type="text" placeholder={ this.state.item.price } onChange={ this.handlePriceChange } />
          <input type="text" placeholder={ this.state.item.description } onChange={ this.handleDescriptionChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deleteItem }>Delete</button>
      </div>
    )
  }
}

export default Item;
