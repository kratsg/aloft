import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/black-dashboard-react.css';
import 'assets/css/nucleo-icons.css';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import Provider from 'react-redux/es/components/Provider';
import store from './store';

ReactDOM.render(
  <FirebaseContext.Provider value={ new Firebase() }>
    <Provider store={ store }>
      <App />
    </Provider>
  </FirebaseContext.Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
