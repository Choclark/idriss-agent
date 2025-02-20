import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/electron-vite.animate.svg'
import './App.css'
import Sidebar from './Component/section/sidebar';

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
  
  return (
    <div className='grid grid-rows-[35px_1fr_20px] h-screen w-full min-h-full '>
        <div className="bg-red-500 w-full header">Header (35px)</div>
        <div className="bg-green-500 w-full middle-section">
          <Sidebar />
          <div className="main bg-yellow-500"></div>
        </div>
        <div className="bg-red-500 w-full">Footer (20px)</div>
    </div>
  )
}

export default App
