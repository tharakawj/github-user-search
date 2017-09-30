import React, { Component } from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from "styled-components";

import SearchPage from "./containers/SearchPage";
import ProfilePage from "./containers/ProfilePage";
import NotFoundPage from "./containers/NotFoundPage";
import Footer from "./components/Footer";
import store from "./store";

const Container = styled.div`
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;
  height: 100%;

  @media (min-width: 768px) {
    max-width: 730px;
  }

  @media (min-width: 1200px) {
    width: 1170px;
  }
`;

const Header = styled.div`
  border-bottom: 1px solid #999;
  margin-bottom: 40px;
  overflow: hidden;

  @media (min-width: 768px) {
    padding-right: 0;
    padding-left: 0;
  }
`;

const H1 = styled.h1`margin: 30px 5px 10px 5px;`;

const Content = styled.div`min-height: calc(100vh - 195px);`;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Container>
            <Header>
              <H1>Github User Search</H1>
            </Header>
            <Content>
              <Switch>
                <Route path="/" exact component={SearchPage} />
                <Route path="/users/:login" component={ProfilePage} />
                <Route component={NotFoundPage} />
              </Switch>
            </Content>
            <Footer />
          </Container>
        </Router>
      </Provider>
    );
  }
}

export default App;
