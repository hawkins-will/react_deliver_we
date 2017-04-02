import React, { Component } from "react";
import marked from "marked";
import axios from "axios";
import PersonalOrderForm from "../PersonalOrders/PersonalOrderForm"

class Order extends Component {
  constructor(props){
    super(props)
    this.state = {
      order: this.props.location.state.active
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updateOrder = this.updateOrder.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }

  componentDidMount(){
    axios.get("http://localhost:3001/api/personal_orders").then((response) => {
      this.setState({
        personalOrders: response.data
      })
    })
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  updateOrder(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    axios.put(`http://localhost:3001/api/orders/${this.state.order._id}`, { name: name }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: "" })
    })
  }

  deleteOrder(e) {
    axios.delete(`http://localhost:3001/api/orders/${this.state.order._id}`, { name: name }).then( res => {
      console.log("Order Deleted");
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    let personalOrders = this.state.personalOrders.map( (personalOrder, index) => {
      return(
        <li key={index}>
            {personalOrder.name}
        </li>
      )
    })
    return(
      <div>
        <p>Order from {this.state.order.restaurant}</p>

        <form onSubmit={ this.updateOrder }>
          <input type="text" placeholder={ this.state.order.name } value={ this.state.name } onChange={ this.handleNameChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deleteOrder }>Delete</button>
        <ol>{personalOrders}</ol>
        <PersonalOrderForm
          orderId={this.state.order._id}
        />
      </div>
    )
  }
}

export default Order;
