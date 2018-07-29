import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing.jsx';
import NonprofitDashboardContianer from './NonprofitDashboardContainer';
import BuyerContainer from './buyer/BuyerContainer';
import ShoppingListContainer from "./ShoppingListContainer";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            {/* <Header /> */}
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route path="/nonprofit_dashboard" component={NonprofitDashboardContianer} />

              {/* TIFFANY AND JON JUST CHANGE THIS*/}
              <Route path="/user_dashboard" component={BuyerContainer} />
              <Route path="/shoppingList" component={ShoppingListContainer}/>
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
