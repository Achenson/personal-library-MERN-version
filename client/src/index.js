import React from 'react';
import ReactDOM from 'react-dom';
import store from './store';
import {Provider} from 'react-redux';

import AppContainer from './App';
import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>, document.getElementById('root'),
);

//ReactDOM.render(
//<Provider>
  //<AppContainer />, document.getElementById('root'));
//</Provider>


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
