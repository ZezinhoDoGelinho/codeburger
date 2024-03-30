import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Logo from '../../assets/Logo.png'
import { Button, ErrorMessage } from '../../components'
import api from '../../services/api'
import {
  Container,
  LogoImage,
  ContainerItens,
  Label,
  Input,
  SignInLink
} from './styles'

export function Register () {
  const schema = Yup.object().shape({
    name: Yup.string()
      .required('O seu nome é obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail válido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter pelo menos 6 dígitos'),
    confirmPassword: Yup.string()
      .required('Confirme sua senha')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  // Conecção com o back-end
  const onSubmit = async clientData => {
    try {
      const { status } = await api.post('users', {
        name: clientData.name,
        email: clientData.email,
        password: clientData.password
      },
      { validateStatus: () => true } // dizendo para ele retornar o status code do back-end
      )

      if (status === 201 || status === 200) {
        // mensagem de sucesso
        toast.success('Cadastrado com sucesso!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      } else if (status === 409) {
        // mensagem de erro
        toast.error('Usuario já registrado!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      } else {
        throw new Error()
      }
    } catch (erro) {
      toast.error('Falha no sistema! Tente novamente mais tarde', {
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
        <h1>SIGN UP
          <br/>
          <p>Create your account today!</p>
        </h1>

        <form noValidate onSubmit={handleSubmit(onSubmit)}>

          <Label>Name</Label>
          <Input type='text' {...register('name')} error={errors.name?.message} />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label>Email</Label>
          <Input type='email' {...register('email')} error={errors.email?.message} />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label htmlFor="password">Password</Label>
          <Input type='password' id="password" {...register('password')} error={errors.password?.message}/>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <Label>Confirmar Senha</Label>
          <Input type='password' {...register('confirmPassword')} error={errors.confirmPassword?.message}/>
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type='submit' style={{ marginTop: 0, marginBottom: 0 }}>SignUp</Button>
        </form>

        <SignInLink>
          You already have an account? <Link to='/login'>Login here</Link >
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}
