import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './assets/CSS/index.css'
import './assets/CSS/bootstrap.css'
import './assets/CSS/sidebar.css'
import './assets/CSS/style.css'
import './assets/CSS/dropdownmenu.css'
import './assets/CSS/animate.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </React.StrictMode>,
)
