import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App'
import './index.css'
import SpecApp from "./SpecsApp"
import './SpecObject.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SpecApp/>
  </React.StrictMode>
)
