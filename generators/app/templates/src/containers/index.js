import React from 'react';
import { Route } from 'react-router-dom';
import LazyRoute from 'lazy-route';

require('./index.scss');

class Home extends React.Component {
  render() {
       return (
         <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
           <Route
             exact
             path="/home"
             render={props => (<LazyRoute {...props} component={import('./home')} />)} />

         </div>
);
  }
}
export default Home;
