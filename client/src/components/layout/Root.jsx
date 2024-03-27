import React from 'react'
import { useSelector } from 'react-redux'

const Root = () => {
    const { alertType, alertMsg } = useSelector((state) => state.user);
    
  return (
    <div>Root</div>
  )
}

export default Root