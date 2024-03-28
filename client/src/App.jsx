import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import SideBar from './components/layouts/sidebar/SideBar'
import MainLayout from './components/layouts/sidebar/MainLayout'


function App() {
  const [count, setCount] = useState(0)
  const a=10

  return (
    <>
      {/* <Login/> */}
      {/* <SideBar/> */}
      <MainLayout/>
    </>
  )
}

export default App
