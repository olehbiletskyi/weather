import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from 'store/store'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ReduxProvider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </ReduxProvider>,
)

reportWebVitals()
