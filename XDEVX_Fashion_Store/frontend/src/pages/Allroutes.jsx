import React from 'react'
import {  Routes, Route } from "react-router-dom";
import Home from './Home'
import Kids from './Kids';
import Login from './Login';
import Men from './Men';
import Reg from './Reg';
import Women from './Women';
import Createproduct from './Createproduct';
const Allroutes = () => {
  return (
     
        
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/kids' element={<Kids/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/men' element={<Men/>}/>
                <Route path='/reg' element={<Reg/>}/>
                <Route path='/women' element={<Women/>}/>
                <Route path='/createproduct' element={<Createproduct/>}/>
            </Routes>
        
     
  )
}

export default Allroutes
