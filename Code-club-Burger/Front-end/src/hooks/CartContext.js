import React, { createContext, useContext, useEffect, useState } from 'react'

import PropTypes from 'prop-types'

const CartContext = createContext({})

export const CartProvider = ({ children }) => {
  const [cartProducts, setCartProducts] = useState([])

  const updateLocalStorage = async (products) => {
    await localStorage.setItem('codeburger:cartInfo', JSON.stringify(products))
  }
  // Função que grava os dados do usuario
  const putProductInCart = async product => {
    // SE o produto ja esta na lista vamos apenas aumentar a quantidade dele
    const cartIndex = cartProducts.findIndex(prd => prd.id === product.id)

    let newCartProduct = []
    // SE o produto já existe no carrinha/array
    if (cartIndex >= 0) {
      newCartProduct = cartProducts

      newCartProduct[cartIndex].quantity = newCartProduct[cartIndex].quantity + 1 // aumentando o valor de "quantity" dele

      setCartProducts(newCartProduct)
    } else {
      product.quantity = 1 // Adicionando um campo de quantidade no objeto "produto"
      newCartProduct = [...cartProducts, product]
      setCartProducts(newCartProduct) // Adicionando esse produto no nosso array
    }

    // Slavando nosso array no navegador
    await localStorage.setItem(
      'codeburger:cartInfo',
      JSON.stringify(newCartProduct)
    )
  }

  // Função de almentar a quantidade de um determinado item no carrinho
  const increaseProducts = async productId => {
    // Pegando iten por iten
    const newCart = cartProducts.map(product => {
      // SE o produto.id for igual ao produto que estavindo por parametro, vamos deixar ele igual e apena pegar a quantidade atual e acreçentar mais 1
      return product.id === productId ? { ...product, quantity: product.quantity + 1 } : product
    })

    setCartProducts(newCart)

    updateLocalStorage(newCart)
  }

  const deleteProducts = async productId => {
    // Filtrando todos os produtos e pegando apenas os que tem id diferente do productId que esta chegando por parametro
    const newCart = cartProducts.filter(product => product.id !== productId)

    setCartProducts(newCart)
    updateLocalStorage(newCart)
  }

  // Função de diminui a quantidade de um determinado item no carrinho
  const decreaseProducts = async productId => {
    // Assin que ele encontrar um produto como o mesmo id do produto que recebemos ele vai guardar nessa varivel
    const cartIndex = cartProducts.findIndex(pd => pd.id === productId)

    // SE a quantidade do produto for maior que 1
    if (cartProducts[cartIndex].quantity > 1) {
      // Pegando iten por iten
      const newCart = cartProducts.map(product => {
        // SE o produto.id for igual ao produto que estavindo por parametro, vamos deixar ele igual e apena pegar a quantidade atual e subtrai 1
        return product.id === productId ? { ...product, quantity: product.quantity - 1 } : product
      })

      setCartProducts(newCart)
      updateLocalStorage(newCart)
    } else {
      // Deletando o produto caso o valor de quantity for menor que 1
      deleteProducts(productId)
    }
  }

  // Sera chamado toda vez que a aplicação inicia e servirá para fazer o load dos produtos
  useEffect(() => {
    const loadUserData = async () => {
      const clientCartData = await localStorage.getItem('codeburger:cartInfo')

      if (clientCartData) {
        // Recuperando os dados e ja deixando ele em frormato Json
        setCartProducts(JSON.parse(clientCartData))
      }
    }

    loadUserData()
  }, [])

  // Em value vamo colocar tudo que queremos que fique disponivel para a aplicaçã toda
  return (
    <CartContext.Provider value={{ putProductInCart, cartProducts, increaseProducts, decreaseProducts, deleteProducts }}>
        {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)

  if (!context) {
    throw new Error('useCart must be used with UserContext')
  }

  return context
}

CartProvider.propTypes = {
  children: PropTypes.node
}
