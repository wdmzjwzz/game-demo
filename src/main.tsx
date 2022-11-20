import React, { Component } from 'react'
import ReactDOM from 'react-dom/client'
import MainScene from './views/Scences/MainScene'
import './index.css'
import rootStateManager from './StateManager'
import { Provider } from 'mobx-react' 
class App extends Component {
  render() {
    return <MainScene />
  }
}
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider {...rootStateManager}>
      <App />
    </Provider> 
  </React.StrictMode>
)
