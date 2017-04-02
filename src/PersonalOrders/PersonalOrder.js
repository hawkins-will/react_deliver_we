import React, { Component } from "react";
import marked from "marked";
import axios from "axios";

class PersonalOrder extends Component {
  constructor(props){
    super(props)
    this.state = {
      personalOrder: this.props.location.state.active,
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
    let name = this.state.name.trim();
    axios.put(`http://localhost:3001/api/personal_orders/${this.state.personalOrder._id}`, { name: name }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: "" })
    })
  }

  deletePersonalOrder(e) {
    axios.delete(`http://localhost:3001/api/personal_orders/${this.state.personalOrder._id}`, { name: name }).then( res => {
      console.log("Personal Order Deleted");
    })
    .catch(err => {
      console.error(err);
    })
  }

  render() {
    return(
      <div>
        <p>Hi</p>
        <p>{this.state.personalOrder.name} Page</p>
        <form onSubmit={ this.updatePersonalOrder }>
          <input type="text" placeholder={ this.state.personalOrder.name } value={ this.state.name } onChange={ this.handleNameChange } />
          <input type="submit" value="Update" />
        </form>
        <button onClick={ this.deletePersonalOrder }>Delete</button>
      </div>
    )
  }
}

export default PersonalOrder;
