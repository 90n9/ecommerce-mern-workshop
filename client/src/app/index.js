import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import asyncComponent from "../util/asyncComponent";
import Header from "../components/masterpage/Header";
import Footer from "../components/masterpage/Footer";
import "../assets/style";

// import { } from "../actions";

class App extends Component {

  render() {
    const { match } = this.props;
    return (
      <>
        <div className="wrapper">
          <Header />
          <Switch>
            <Route exact path={`${match.url}`} component={asyncComponent(() => import("./routes/home"))} />
            <Route exact path={`${match.url}mycart`} component={asyncComponent(() => import("./routes/mycart"))} />
            <Route exact path={`${match.url}order`} component={asyncComponent(() => import("./routes/order"))} />
            <Route component={asyncComponent(() => import("../components/error/Error404"))} />
          </Switch>
          <div style={{ display: "block", position: "relative", clear: "both" }}></div>
        </div>
        <Footer />
      </>

    );
  }
}

const mapStateToProps = ({ }) => {
  return {};
};

export default connect(
  mapStateToProps,
  {}
)(App);
