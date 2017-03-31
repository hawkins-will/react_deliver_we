import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom"
import axios from "axios"
import RestaurantBox from "./RestaurantBox"
import RestaurantForm from "./RestaurantForm"
import Restaurant from "./Restaurant"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/restaurants">Restaurant List</Link>
            <Link to="/new_restaurants">New Restaurant</Link>
          </nav>

          <Route exact path="/"
            render={() =>
              <h1>This is the Home Page</h1>
            }
          />

          <Route path="/restaurant/:name"
            component={Restaurant}
          />

          <Route path="/restaurants"
            render={() =>
              <RestaurantBox
              />
            }
          />

          <Route path="/new_restaurants"
            render={() =>
              <RestaurantForm />
            }
          />

        </div>
      </Router>
    );
  }
}

export default App;
