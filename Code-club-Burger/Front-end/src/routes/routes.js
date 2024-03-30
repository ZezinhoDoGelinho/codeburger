import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Paginas
import paths from '../constants/paths'
import { Home, Login, Products, Register, Cart, Admin } from '../containers'
import PrivateRoute from './private-route'
function Rotas () {
  return (
        <Router>
            <Routes>
                <Route path="/" element={<PrivateRoute element={<Home/>}/>}/>
                <Route path="/produtos" element={<PrivateRoute element={<Products/>}/>}/>
                <Route path="/carrinho" element={<PrivateRoute element={<Cart/>}/>}/>
                <Route path="/login" element={<Login/>} />
                <Route path="/cadastro" element={<Register/>}/>

                <Route path={paths.Order} element={<PrivateRoute element={<Admin path={paths.Order}/>} isAdmin/>}/>
                <Route path={paths.Products} element={<PrivateRoute element={<Admin path={paths.Products}/>} isAdmin/>}/>
                <Route path={paths.NewProduct} element={<PrivateRoute element={<Admin path={paths.NewProduct}/>} isAdmin/>}/>
                <Route path={paths.EditProduct} element={<PrivateRoute element={<Admin path={paths.EditProduct}/>} isAdmin/>}/>
            </Routes>
        </Router>
  )
}

export default Rotas
