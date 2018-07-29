import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';


import Landing from './Landing.jsx';
import CompanyContainer from './company_container';
import BuyerContainer from "./buyer/BuyerContainer";

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
              <Route path="/nonprofit_dashboard" component={CompanyContainer} />
              <Route path="/user_dashboard" component={BuyerContainer} />
              <Route path="/" component={Landing} />
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
