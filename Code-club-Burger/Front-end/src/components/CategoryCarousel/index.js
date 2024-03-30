import React, { useEffect, useState } from 'react'
import Carousel from 'react-elastic-carousel'
import { useNavigate } from 'react-router-dom'

import Category from '../../assets/category.png'
import api from '../../services/api'
import { Container, CategoryImg, ContainerItens, Image, Button } from './styles'

export function CategoryCarousel () {
  const navigate = useNavigate()

  // Redirecinar ele pra produtor com o id da categoria que ele escolheu
  const handleRedirect = (categoryId) => {
    navigate('/produtos', { state: { categoryId } })
  }

  const [categories, setCategories] = useState([])
  // Importando das as categorias quando a pagina carregar
  useEffect(() => {
    async function loadCategories () {
      const { data } = await api.get('/categories')

      setCategories(data)
    }

    loadCategories()
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
        <CategoryImg src={Category} alt='logo-da-home'/>
        <Carousel
        itemsToShow={5}
        style={{ width: '90%' }}
        breakPoints={breakPoints}>
            {
                // SE categories tiver algum valor vai chamar o map
               categories && categories.map(category => (
                <ContainerItens key={category.id}>
                    <Image src={category.url} alt='foto-da-categoria'/>
                    <Button onClick={() => { handleRedirect(category.id) }}>
                      {category.name}
                    </Button>
                </ContainerItens>
               ))
            }
        </Carousel>
    </Container>
  )
}
