import React, { createContext, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {
  const [userData, setUseData] = useState({})

  // Função que grava os dados do usuario
  const putUserData = async userInfo => {
    setUseData(userInfo)

    // Gravar as informações do usuario no navegador como "string"
    await localStorage.setItem('codeburger:userData', JSON.stringify(userInfo))
  }

  // Função de deslogar
  const logout = async () => {
    await localStorage.removeItem('codeburger:userData')
  }

  // Sera chamado toda vez que a aplicação inicia
  useEffect(() => {
    const loadUserData = async () => {
      const clientInfo = await localStorage.getItem('codeburger:userData')

      if (clientInfo) {
        // Recuperando os dados e ja deixando ele em frormato Json
        setUseData(JSON.parse(clientInfo))
      }
    }

    loadUserData()
  }, [])

  // Em value vamo colocar tudo que queremos que fique disponivel para a aplicaçã toda
  return (
    <UserContext.Provider value={{ putUserData, userData, logout }}>
        {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)

  if (!context) {
    throw new Error('dou ruin no UserContext')
  }

  return context
}

UserProvider.propTypes = {
  children: PropTypes.node
}
