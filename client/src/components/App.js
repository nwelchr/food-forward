import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing.jsx';
import NonprofitDashboardContianer from './NonprofitDashboardContainer';
import BuyerContainer from './buyer/BuyerContainer';

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
              <Route path="/nonprofit_dashboard" component={CompanyContainer} />

              {/* TIFFANY AND JON JUST CHANGE THIS*/}
              <Route path="/user_dashboard" component={UserDashboard} />
              
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
