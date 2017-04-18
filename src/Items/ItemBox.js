import React, { Component } from "react";
import axios from "axios"
import { Link } from "react-router-dom"
import MenuItemBoxPersonal from "../MenuItems/MenuItemBoxPersonal";
import "./ItemBox.css"

class ItemBox extends Component {
  constructor(props) {
    super(props);
    let personalOrder =  this.props.personalOrder
    let order = this.props.order
    let restaurant = this.props.restaurant
    this.state = {
      items: personalOrder.items,
      personalOrder: personalOrder,
      order: order,
      restaurant: restaurant
     };
  }

  handleNewItem(newItems){
    let order = this.state.order
    axios.put(`http://localhost:3001/api/orders/${order._id}`, { personalOrders: newItems }).then( res => {
      this.setState( {items: newItems });
    })
    .catch(err => {
      console.log(err)
    })
  }

  showModal(index) {
    document.getElementById("remove" + index).style.display='flex'
  }

  closeModal(index){
    document.getElementById("remove" + index).style.display='none'
  }

  render() {
    let personalTotal = 0.00
    let personalTip = 5/this.props.order.personalOrders.length
    let personalFee = this.props.order.deliveryFee/this.props.order.personalOrders.length
    personalTotal = personalFee
    let items = this.props.personalOrder.items.map( (item, index) => {
      let pathname = `/item/${item.name}`
      personalTotal = personalTotal + item.price
        return(
          <div>
          <p className="personalOrderItem" key={index}>
            <span>
              <span className="deleteItem" onClick={() => this.showModal(index) }>
              X
              </span>
              {item.name}
            </span>
            <span>{item.price.toFixed(2)}</span>


          </p>
          <div id={"remove" + index.toString()} className="modal">
            <div className="modalContent">
              <span className="close" onClick={() => this.closeModal(index) }>&times;</span>
              <div className="innerModal">
                <p>Remove <span className="modalMenuItem">{item.name}</span> from your order?</p>
                <div className="confirmButton" onClick={ () => {
                  let order = this.state.order;
                  let personalOrder = this.state.personalOrder;
                  let itemId = item._id;
                  let newArray = personalOrder.items.filter((personalOrderItem) => {
                    return personalOrderItem._id !== itemId
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
                  }).then(() => {
                    this.setState({items: newArray})
                  })
                  this.closeModal(index)
                }}>Confirm</div>
                </div>
              </div>
            </div>
          </div>
        )
    })
    let personalTax = personalTotal*(this.props.order.tax/100)
    personalTotal = personalTotal + personalTax + personalTip
    return(
      <div className="itemBox">
        <div className="itemBoxLeft">
          <MenuItemBoxPersonal
            restaurant={this.state.restaurant} order={this.state.order} personalOrder={this.state.personalOrder} handleNewItem={(e) => this.handleNewItem(e)}
          />
        </div>
        <div className="itemBoxRight">
          <h2>{this.state.personalOrder.name}s Bill</h2>
          <hr />
          {items}
          <div className="personalOrderBoxFees">
            <p className="personalOrderItem">Portion of Fee <span>{personalFee.toFixed(2)}</span></p>
            <p className="personalOrderItem">Tax <span>{personalTax.toFixed(2)}</span></p>
            <p className="personalOrderItem">Portion of Tip <span>{personalTip.toFixed(2)}</span></p>
          </div>
          <p className="personalOrderTotal personalOrderItem">Personal Total <span>${personalTotal.toFixed(2)}</span></p>
        </div>
      </div>
    )
  }
}

export default ItemBox;
