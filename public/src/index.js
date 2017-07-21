import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// Components
import App from './components/app';

const Root = props => {
  return (
    <Provider store={store}>
      <BrowserRouter history={history}>
        <div>
          <Switch>
            <Route exact path="/" component={App} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

ReactDOM.render(<Root />, document.getElementById('root'));