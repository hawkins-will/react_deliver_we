import React, { Component } from "react";
import marked from "marked";
import axios from "axios";

class Restaurant extends Component {
  constructor(props){
    super(props)
    this.state = {
      restaurant: this.props.location.state.active,
    }
    this.handleNameChange = this.handleNameChange.bind(this);
    this.updateRestaurant = this.updateRestaurant.bind(this);
    // this.deleteRestaurant = this.deleteRestaurant.bind(this);
  }
  rawMarkup() {
    let rawMarkup = marked(this.props.children.toString());
    return { __html: rawMarkup };
  }


  handleNameChange(e) {
    this.setState( { name: e.target.value });
  }

  updateRestaurant(e) {
    e.preventDefault();
    let name = this.state.name.trim();
    axios.put(`http://localhost:3001/api/restaurants/${this.state.restaurant._id}`, { name: name }).then( res => {
      this.setState( {data: res });
    })
    .catch(err => {
      console.log(err)
    })
    .then(() => {
      this.setState({ name: "" })
    })
  }


  render() {
    return(
      <div>
        <p>{this.state.restaurant.name} Page</p>
        <form onSubmit={ this.updateRestaurant }>
          <input type="text" placeholder={ this.state.restaurant.name } value={ this.state.name } onChange={ this.handleNameChange } />
          <input type="submit" value="Post" />
        </form>
        
      </div>
    )
  }
}

export default Restaurant;
