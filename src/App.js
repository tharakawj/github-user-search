import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import SearchPage from "./containers/SearchPage";
import UserPage from "./containers/UserPage";
import NotFoundPage from "./containers/NotFoundPage";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store} >
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={SearchPage}/>
              <Route path="/user/:id" component={UserPage}/>
              <Route component={NotFoundPage}/>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
