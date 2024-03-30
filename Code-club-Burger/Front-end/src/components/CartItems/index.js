import React from 'react'

import Trash from '../../assets/trash.png'
import { useCart } from '../../hooks/CartContext'
import formatCurrency from '../../utils/formatCurrency'
import { Container, Header, Body, EmptyCart, TrashButton } from './styles'

export function CartItems () {
  const { cartProducts, increaseProducts, decreaseProducts, deleteProducts } = useCart()

  return (
    <Container>
      <Header>
        <p></p>
        <p>Itens</p>
        <p>Preço</p>
        <p style={{ paddingRight: 30 }}>quantidade</p>
        <p>Total</p>
      </Header>
      {cartProducts && cartProducts.length > 0
        ? cartProducts.map(product => (

        <Body key={product.id}>
          <img src={product.url}/>
          <p>{product.name}</p>
          <p>{formatCurrency(product.price)}</p>
          <div className='quantityContainer'>
            <button onClick={() => decreaseProducts(product.id)}>-</button>
            <p>{product.quantity}</p>
            <button onClick={() => increaseProducts(product.id)}>+</button>
          </div>
          <p>{formatCurrency(product.quantity * product.price)}</p>
          <TrashButton onClick={() => deleteProducts(product.id)}><img src={Trash} alt='icone-de-lixeira'/></TrashButton>
        </Body>
        ))
        : (
          <EmptyCart>Carrinho Vazio</EmptyCart>
          )
    }
    </Container>
  )
}
