import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import SearchPage from "./containers/SearchPage";
import ProfilePage from "./containers/ProfilePage";
import NotFoundPage from "./containers/NotFoundPage";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Switch>
              <Route path="/" exact component={SearchPage} />
              <Route path="/users/:login" component={ProfilePage} />
              <Route component={NotFoundPage} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
