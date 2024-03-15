import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Signin from './Signin.tsx'
import './index.css'
import {Routes, BrowserRouter, Route } from 'react-router-dom'
import Signup from './Signup.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/" element = {<App />} />

        {/* <Route path = "/blog/:id" element = {<Blog />}></Route> */}
      </Routes>
    </BrowserRouter>
)
