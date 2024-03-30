import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import CancelIcon from '@mui/icons-material/Cancel'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import paths from '../../../constants/paths'
import api from '../../../services/api'
import formatCurrency from '../../../utils/formatCurrency'
import { Container, Img, EditIconStyles } from './styles'

function ListProducts () {
  const navigate = useNavigate()
  const [products, setProducts] = useState()

  useEffect(() => {
    async function loadOrders () {
      const { data } = await api.get('products')

      // Gravando eles no ordes
      setProducts(data)
    }

    loadOrders()
  }, [])

  function isOffer (offerStatus) {
    if (offerStatus) {
      return <CheckBoxIcon style={{ color: '#228b22' }}/>
    }
    return <CancelIcon style={{ color: '#cc1717' }}/>
  }

  function editProduct (product) {
    navigate(paths.EditProduct, { state: product })
  }

  return (
    <Container>
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Produto</TableCell>
            <TableCell>Preço</TableCell>
            <TableCell align='center'>Produto em oferta</TableCell>
            <TableCell >Imagem do Produto</TableCell>
            <TableCell >Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products &&
            products.map(product => (
            <TableRow
              key={product.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product.name}
              </TableCell>
              <TableCell >{formatCurrency(product.price)}</TableCell>
              <TableCell align='center'>{isOffer(product.offer)}</TableCell>
              <TableCell align='center'>
                <Img src={product.url} alt='imagem-produto'/>
              </TableCell>
              <TableCell >
                <EditIconStyles onClick={() => editProduct(product)}/>
              </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  )
}
export default ListProducts
