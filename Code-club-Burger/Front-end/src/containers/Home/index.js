import React from 'react'

// Imagens
import HomeLogo from '../../assets/home-logo.svg'
import { CategoryCarousel, OffersCarousel } from '../../components'
import { Container, HomeImg } from './styles'

// COmponentes

export function Home () {
  return (
    <Container>
      <HomeImg src={HomeLogo} alt='logo-da-home' />
      <CategoryCarousel />
      <OffersCarousel/>
    </Container>
  )
}
