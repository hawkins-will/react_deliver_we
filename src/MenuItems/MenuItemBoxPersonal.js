import React, { Component } from "react";
import "./MenuItemBoxPersonal.css"
// import axios from "axios"
// import { Link } from "react-router-dom"

class MenuItemBoxPersonal extends Component {
  constructor(props) {
    super(props);
    let restaurant = this.props.restaurant;
    let order = this.props.order;
    let personalOrder = this.props.personalOrder;
    let tempArray = []
    this.props.personalOrder.items.forEach(function(item) {
      tempArray.push(item.id);
    })
    tempArray = tempArray.sort();
    let temporaryId = 0
    if (tempArray.length > 0) {
      temporaryId = tempArray[tempArray.length - 1] + 1;
    }
    this.state = {
      restaurant: restaurant,
      order: order,
      personalOrder: personalOrder,
      temporaryId: temporaryId
    }
  }

  showModal(index) {
    document.getElementById("add" + index).style.display='flex'
  }

  closeModal(index){
    document.getElementById("add" + index).style.display='none'
  }

  render() {
    let temporaryId = this.state.temporaryId
    let restaurant = this.props.restaurant;
    let menuItems = this.props.restaurant.menuItems.map( (menuItem, index) => {
      return(
        <div>
          <div className="personalMenuItemDiv" key={index} onClick={ () => this.showModal(index) }>
            <p className="personalMenuItemHeader"><span className="personalMenuItemName">{menuItem.name}</span> ${menuItem.price.toFixed(2)}</p>
            <p className="personalMenuDescription">{menuItem.description}</p>
          </div>
          <div id={"add" + index.toString()} className="modal">
            <div className="modalContent">
              <span className="close" onClick={() => this.closeModal(index) }>&times;</span>
              <div className="innerModal">
              <p>Add <span className="modalMenuItem">{menuItem.name}</span> to your order?</p>
              <p>${menuItem.price.toFixed(2)}</p>
              <div className="confirmButton" onClick={ () => {
                let order = this.props.order;
                let personalOrder = this.props.personalOrder;
                let personalId = this.props.personalOrder.id;
                let newArray = order.personalOrders.filter((personalOrder) => {
                  return personalOrder.id !== personalId
                })
                let name = menuItem.name
                let price = menuItem.price
                let description = menuItem.description
                personalOrder.items.push( {name: name, price: price, description: description, id: temporaryId })
                temporaryId = temporaryId + 1
                this.setState({ temporaryId })
                newArray.unshift(personalOrder);
                this.props.handleNewItem(newArray)
                this.closeModal(index)
              }}>Confirm</div>
              </div>
            </div>
          </div>
        </div>
      )
    })
    return(
      <div className="menuItemBoxPersonal">
        <h2>{restaurant.name} Menu</h2>
        <div className="personalOrderMenu">
          {menuItems}
        </div>
      </div>
    )
  }
}

export default MenuItemBoxPersonal;
