import { Component } from 'react';
import { Router } from 'react-router';

class Main extends Component {
  render() {
    const { history, routes } = this.props;
    return (
      <div>
        <Router routes={routes} history={history} />
      </div>
    );
  }
}

export default Main;
