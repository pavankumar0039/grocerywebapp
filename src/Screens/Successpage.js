import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Successpage = () => {
    let user=useSelector(state=>state.user)
    const navigate=useNavigate()
   
   
  return (
    <div>
       <h1>successfull payment</h1>
    </div>
  )
}

export default Successpage
