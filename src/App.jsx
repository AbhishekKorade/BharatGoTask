import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'

import Login from './component/Login'
import AllProduct from './component/AllProduct'
import { Route, Routes } from 'react-router-dom'
import Cloths from './component/Cloths'
import Electronic from './component/Electronic'
import Furniture from './component/Furniture'
import Toys from './component/Toys'
import MyAccount from './component/MyAccount'
import ViewDetails from './component/ViewDetails'
import MyOrder from './component/MyOrder'
import Register from './component/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<AllProduct/>}/>
      <Route path='/all' element={<AllProduct/>}/>
      <Route path='/clothes' element={<Cloths/>}/>
      <Route path='/electronics' element={<Electronic/>}/>
      <Route path='/furnitures' element={<Furniture/>}/>
      <Route path='/toys' element={<Toys/>}/>
      <Route path='/account' element={<MyAccount/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/viewdetails/:id' element={<ViewDetails/>}/>
      <Route path='/orders' element={<MyOrder/>}/>
    </Routes>
    <Navbar/>

    </>
  )
}

export default App
