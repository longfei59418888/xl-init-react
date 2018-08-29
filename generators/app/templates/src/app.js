import React from 'react';
import {render} from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "./store";
import {AppContainer} from 'react-hot-loader'
import App from './containers/index';

let store = configureStore();

const renderApp = App => {
	render(
		<AppContainer>
			<Router>
                {/*<Provider store={store}>*/}
                  <App/>
                {/*</Provider>*/}
			</Router>
		</AppContainer>,
		document.getElementById("app")
	);
};

renderApp(App);

if (module.hot) {
		// debugger;
      module.hot.accept(() => renderApp(App));
}