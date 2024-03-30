import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Logo from '../../assets/Logo.png'
import { Button, ErrorMessage } from '../../components'
import { useUser } from '../../hooks/UserContext'
import api from '../../services/api'
import {
  Container,
  LogoImage,
  ContainerItens,
  Label,
  Input,
  SignInLink
} from './styles'

export function Login () {
  const navigate = useNavigate()
  const { putUserData } = useUser()

  const schema = Yup.object().shape({
    email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória').min(6, 'A senha deve ter pelo menos 6 dígitos')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  // Conecção com o back-end
  const onSubmit = async clientData => {
    try {
      const { data } = await api.post('sessions', {
        email: clientData.email,
        password: clientData.password
      })

      // mensagem de sucesso
      toast.success('Logado com sucesso!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })

      // Gravar dados no navegador
      putUserData(data)

      //= ===== Dando um tempo de espera de 1 segundo ======
      setTimeout(() => { // Redirecinando ele para a home
        if (data.admin) {
          navigate('/pedidos')
        } else {
          navigate('/')
        }
      }, 1000) // <= milesegundos (1000ms = 1s)
      //= ==================================================
    } catch (err) {
      // mensagem de erro
      toast.error('Email ou senha incorretos!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  return (
    <Container>
      <LogoImage>
        <img src={Logo} alt="logo-image" />
      </LogoImage>
      <ContainerItens>
        <img />
        <h1>LOGIN
          <br/>
          <p>Welcome Back!</p>
        </h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>

          <Label htmlFor="email">Email ID</Label>
          <Input type='email' {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label htmlFor="password">Password</Label>
          <Input type='password' {...register('password')} error={errors.password?.message}/>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Button type='submit' style={{ marginTop: 0, marginBottom: 0 }}>SignIn</Button>
        </form>

        <SignInLink>
          Não possui conta? <Link to='/cadastro'>SignUp</Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
