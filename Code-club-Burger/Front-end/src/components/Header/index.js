import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import Cart from '../../assets/cart.svg'
import Person from '../../assets/person.svg'
import { useUser } from '../../hooks/UserContext'
import { Container, ContainerLeft, PageLink, ContainerRight, ContainerText, Line, PageLinkExit } from './styles'

export function Header () {
  const { logout, userData } = useUser()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const logoutUser = () => {
    logout()
    navigate('/login')
  }

  return (
    <Container>
      <ContainerLeft>
        <PageLink onClick={() => navigate('/') } isActive={pathname === '/'}>home</PageLink>
        <PageLink onClick={() => navigate('/produtos') } isActive={pathname.includes('produtos')}>Ver Produtos</PageLink>
      </ContainerLeft>

      <ContainerRight>
        <PageLink onClick={() => navigate('/carrinho') }>
          <img src={Cart} alt='carrinho'/>
        </PageLink>
        <Line></Line>
        <PageLink>
          <img src={Person} alt='logo-pessoa'/>
        </PageLink>
        <ContainerText>
          <p>Olá, {userData.name}</p>
          <PageLinkExit onClick={logoutUser}>Sair</PageLinkExit>
        </ContainerText>
      </ContainerRight>

    </Container>
  )
}
