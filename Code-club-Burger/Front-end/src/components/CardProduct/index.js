import React from 'react'
import { useNavigate } from 'react-router-dom'

import PropTypes from 'prop-types'

import { useCart } from '../../hooks/CartContext'
import { Button } from '../Button'
import { Container, Image, ProductName, ProductPrice } from './styles'

export function CardProduct ({ product }) {
  const navigate = useNavigate()
  const { putProductInCart } = useCart()

  const redirect = (product) => {
    navigate('/carrinho', putProductInCart(product))
  }
  return (
    <Container>
        <Image src={product.url} alt='imagem do produto'/>
        <div>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.formatedPrice}</ProductPrice>
            <Button onClick={() => redirect(product)}>Adicionar</Button>
        </div>

    </Container>
  )
}

CardProduct.propTypes = {
  product: PropTypes.object
}
