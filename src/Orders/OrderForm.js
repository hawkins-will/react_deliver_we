import React, { Component } from "react";
import axios from "axios";

class OrderForm extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  handleSubmit(e) {
    let name = this.state.name.trim();
    axios.post("http://localhost:3001/api/orders", { name: name }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: "" })
    })
  }

  render(){
    return(
      <form onSubmit={ this.handleSubmit }>
        <input type="text" placeholder="Order Name..." value={ this.state.name } onChange={ this.handleNameChange } />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

export default OrderForm;
