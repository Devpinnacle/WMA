import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from './pages/Login'

function App() {
  const router=createBrowserRouter([
    {
      path:"/"
    }
  ])
  return (
    <>
      <Login/>
    </>
  )
}

export default App
