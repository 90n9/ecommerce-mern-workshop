import { Route, Switch } from "react-router-dom";
import asyncComponent from "../util/asyncComponent";
import Header from "../components/masterpage/Header";
import Footer from "../components/masterpage/Footer";
import "../assets/style";

function App({ match }) {
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="flex-shrink-0">
          <div className="container">
            <Switch>
              <Route exact path={`${match.url}`} component={asyncComponent(() => import("./routes/home"))} />
              <Route exact path={`${match.url}mycart`} component={asyncComponent(() => import("./routes/mycart"))} />
              <Route exact path={`${match.url}order`} component={asyncComponent(() => import("./routes/order"))} />
              <Route component={asyncComponent(() => import("../components/error/Error404"))} />
            </Switch>
            <div style={{ display: "block", position: "relative", clear: "both" }}></div>
          </div>
        </main>
      </div>
      <Footer />
    </>

  );
}

export default App;
