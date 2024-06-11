import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import './css/style.css';
import './css/satoshi.css';
import 'jsvectormap/dist/css/jsvectormap.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Provider } from "react-redux";
import { HashRouter } from 'react-router-dom';
import {store} from "./redux/Store";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <Provider store={store}>
    <HashRouter>
      {/* <Router> */}
      <App />
      <Toaster/>
      {/* </Router> */}
    </HashRouter>
  </Provider>

);
