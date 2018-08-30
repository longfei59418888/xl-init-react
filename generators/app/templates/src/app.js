import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import configureStore from './store';
import App from './containers/index';

alert(1);
const store = configureStore();
const renderApp = Root => {
  render(
    <AppContainer>
      <Router>
        <Provider store={store}>
          <Root />
        </Provider>
      </Router>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(App);

if (module.hot) {
  // Debugger;
  module.hot.accept(() => renderApp(App));
}
