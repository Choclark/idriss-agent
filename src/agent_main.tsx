import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import AgentApp from './AgentApp'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AgentApp/>
  </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})
