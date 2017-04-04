import React, { Component } from "react";
import axios from "axios";

class ItemForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      price: "",
      description: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePriceChange = this.handlePriceChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    let order = this.props.order;
    let personalOrder = this.props.personalOrder;
    let personalId = this.props.personalOrder._id;
    let newArray = order.personalOrders.filter((personalOrder) => {
      return personalOrder._id !== personalId
    })
    let name = this.state.name.trim();
    let price = this.state.price.trim();
    let description = this.state.description.trim();
    personalOrder.items.push( {name: name, price: price, description: description })
    newArray.unshift(personalOrder);
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newArray }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: "", price: "", description: "" })
    })
  }

  render(){
    let order = this.props.order;
    return(
      <div>
        <form onSubmit={ this.handleSubmit }>
          <input type="text" placeholder="Name..." value={ this.state.name } onChange={ this.handleNameChange } />
          <input type="text" placeholder="Price..." value={ this.state.price } onChange={ this.handlePriceChange } />
          <input type="text" placeholder="Description..." value={ this.state.description } onChange={ this.handleDescriptionChange } />
          <input type="submit" value="Add Item" />
        </form>
      </div>
    )
  }
}

export default ItemForm;
