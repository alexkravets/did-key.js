import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import ReactGA from "react-ga";
import * as serviceWorker from "./serviceWorker";
import createStore from "./store/create";
import { routes } from "./pages";
import { NotFound } from "./pages/errors/404";

const { store, persistor, history } = createStore();

ReactGA.initialize("UA-117945399-11");

history.listen((location) => {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
});

const App = () => {
  React.useEffect(() => {
    ReactGA.pageview(window.location.pathname);
  }, []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ConnectedRouter history={history}>
          <Switch>
            {routes.map(({ exact, path, component }) => (
              <Route
                key={path}
                exact={exact}
                path={path}
                component={component}
              />
            ))}
            <Route path="*" render={() => <NotFound />} />
          </Switch>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

console.log(
  `
Hello Developer 🧙‍♂️! 
Checkout our corporate website if you are interested in working with us: 
✨ https://www.transmute.industries/
`
);
