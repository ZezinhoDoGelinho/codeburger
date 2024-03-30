import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Button } from '../Button'
import { Container } from './styles'

export function CartResume () {
  const [finalPrice, setFinalPrice] = useState(0)
  const [deliveryTax] = useState(5)

  const { cartProducts } = useCart()

  // Função que vai somar o valor de todos os itens + a taxa de entrega
  useEffect(() => {
    const sumAllItens = cartProducts.reduce((acc, current) => {
      return current.price * current.quantity + acc
    }, 0)

    setFinalPrice(sumAllItens)
  }, [cartProducts, deliveryTax])

  const submitOrder = async () => {
    const order = cartProducts.map(product => {
      return { id: product.id, quantity: product.quantity }
    })

    try {
      await api.post('orders', { products: order })

      // mensagem de sucesso
      toast.success('Pedido efetuado com sucesso!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    } catch (erro) {
      // mensagem de sucesso
      toast.error('Fala ao realizar seu pedido, tente novamenta mais tarde!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  return (
    <div>
      <Container>
        <div className='container-top'>
          <h2 className='title'>Resumo do pedido</h2>
          <p className='items'>Itens</p>
          <p className='items-price'>{formatCurrency(finalPrice)}</p>
          <p className='delivery-tax'>Taxa de entrega</p>
          <p className='delivery-tax-price'>{formatCurrency(deliveryTax)}</p>
        </div>
        <div className='container-bottom'>
          <p>Total</p>
          <p>{formatCurrency(finalPrice + deliveryTax)}</p>
        </div>
      </Container>
        <Button style={{ width: '100%', marginTop: 30 }} onClick={submitOrder}>Finalizar pedido</Button>
    </div>
  )
}
