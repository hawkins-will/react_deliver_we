import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import RestaurantBox from "./Restaurants/RestaurantBox"
import Restaurant from "./Restaurants/Restaurant"
import OrderBox from "./Orders/OrderBox"
import Order from "./Orders/Order"
import "./App.css"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <h1>DeliverWe</h1>
            <span className="link">
              <Link to="/">Home</Link>
            </span>

            <span className="link">
              <Link to="/orders">Orders</Link>
            </span>

            <span className="link">
              <Link to="/restaurants">Restaurants</Link>
            </span>
          </nav>

          <Route exact path="/"
            render={() =>
              <div>
                <span className="link">
                  <Link to="/orders">Orders</Link>
                </span>

                <span className="link">
                  <Link to="/restaurants">Restaurants</Link>
                </span>
              </div>
            }
          />

          <Route path="/orders"
            render={() =>
              <OrderBox
              />
            }
          />

          <Route path="/order/:name"
            component={Order}
          />

          <Route path="/restaurants"
            render={() =>
              <RestaurantBox
              />
            }
          />

          <Route path="/restaurant/:name"
            component={Restaurant}
          />

        </div>
      </Router>
    );
  }
}

export default App;
