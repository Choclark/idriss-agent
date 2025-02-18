import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/electron-vite.animate.svg'
import './App.css'

declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        invoke: (channel: string, ...args: any[]) => Promise<any>
      };
      startMicStream: () => void,
      onSpeechResult: (callback: Function|null) => void,
    };
  }
}

function App() {
  // useEffect(() => {
  //   Test main-process message.
  //   const fetch = async () => {
  //     const response = await window.electron.ipcRenderer.invoke("run-agent", "Open me the file dialog i need to select a project folder")
      
  //     console.log(response)
  //   }
  //   fetch()
  // }, [])
  
  return (
    <>
      
    </>
  )
}

export default App
