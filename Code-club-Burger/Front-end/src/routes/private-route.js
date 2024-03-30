import React from 'react'
import { Navigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { Header } from '../components'

// Configurando rotas privadas
function PrivateRoute ({ element, isAdmin, ...rest }) {
  // verifica se o user esta logado
  const user = localStorage.getItem('codeburger:userData')

  if (!user) {
    return <Navigate to='/login'/>
  }

  // SE a tela for de admin mas o usuario nao for admin ele sera redirecionado
  if (isAdmin && !JSON.parse(user).admin) {
    return <Navigate to='/'/>
  }

  // SE o user for true ele navega pra o element, se nao ele vai pra o login
  return <>{!isAdmin && <Header/>}{element}</>
}

export default PrivateRoute

PrivateRoute.propTypes = {
  element: PropTypes.oneOfType([PropTypes.func, PropTypes.element]),
  isAdmin: PropTypes.bool
}
