import React, { Component } from "react";
import marked from "marked";
import axios from "axios";

class PersonalOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      personalOrder: this.props.location.state.active,
      order: this.props.location.state.order,
      name: ""
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updatePersonalOrder = this.updatePersonalOrder.bind(this);
    this.deletePersonalOrder = this.deletePersonalOrder.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }


  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  updatePersonalOrder(e) {
    e.preventDefault();
    let order = this.state.order;
    let personalId = this.state.personalOrder._id;
    let newArray = order.personalOrders.filter((personalOrder) => {
      return personalOrder._id !== personalId
    })
    let selectedPersonalOrder = order.personalOrders.filter((personalOrder) => {
      return personalOrder._id == personalId
    })
    selectedPersonalOrder[0].name = this.state.name
    newArray.unshift(selectedPersonalOrder[0])
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newArray }).then( res => {
      console.log("Personal Order Update");
    })
    .catch(err => {
      console.error(err);
    })
  }

  deletePersonalOrder(e) {
    let order = this.state.order;
    let personalId = this.state.personalOrder._id;
    let newArray = order.personalOrders.filter((personalOrder) => {
      return personalOrder._id !== personalId
    })
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newArray }).then( res => {
      console.log("Personal Order Deleted");
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return(
      <div>
        <p>{this.state.personalOrder.name} Page</p>
        <form onSubmit={ this.updatePersonalOrder }>
          <input type="text" placeholder={ this.state.personalOrder.name } onChange={ this.handleNameChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deletePersonalOrder }>Delete</button>
      </div>
    )
  }
}

export default PersonalOrder;
