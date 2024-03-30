import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { useNavigate } from 'react-router-dom'

import Offers from '../../assets/offers.png'
import { useCart } from '../../hooks/CartContext'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Container, OffersImg, ContainerItens, Image, Button } from './styles'

export function OffersCarousel () {
  const { putProductInCart } = useCart()
  const navigate = useNavigate()
  const [offers, setOffers] = useState([])

  // Redirecinar ele para o carrinho e adicionando um produto
  const redirect = (product) => {
    navigate('/carrinho', putProductInCart(product))
  }

  // Importando das as categorias quando a pagina carregar
  useEffect(() => {
    async function loadOffers () {
      const { data } = await api.get('products')

      // Filtrando apenas os itens em oferta
      const onlyOffers = data.filter(product => product.offer).map(product => {
        // Fazendo um map para que os preços fiquem formatados como moedas Ex:R$10,00
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })
      setOffers(onlyOffers)
    }

    loadOffers()
  }, [])

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 400, itemsToShow: 2 },
    { width: 600, itemsToShow: 3 },
    { width: 900, itemsToShow: 4 },
    { width: 1300, itemsToShow: 5 }
  ]

  return (
    <Container>
        <OffersImg src={Offers} alt='logo-da-oferta'/>
        <Carousel
        itemsToShow={5}
        style={{ width: '90%' }}
        breakPoints={breakPoints}>
            {
                // SE categories tiver algum valor vai chamar o map
               offers && offers.map(product => (
                <ContainerItens key={product.id}>
                    <Image src={product.url} alt='foto-da-categoria'/>
                    <p>{product.name}</p>
                    <p>{product.formatedPrice}</p>
                    <Button onClick={() => redirect(product)}>Peça agora</Button>
                </ContainerItens>
               ))
            }
        </Carousel>
    </Container>
  )
}
