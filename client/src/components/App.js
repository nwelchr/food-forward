import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing.jsx';
import Dashboard from './Dashboard';
// import BlogNew from './blogs/BlogNew';
// import BlogShow from './blogs/BlogShow';
import CompanyContainer from "./company_container";

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
              <Route path="/" component={Landing} /> 
              <Route path="/org"  component={CompanyContainer} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
