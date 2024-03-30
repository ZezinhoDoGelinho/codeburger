import React, { useEffect, useState } from 'react'

import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import api from '../../../services/api'
import formatDate from '../../../utils/formatDate'
import status from './order-status'
import Row from './Row'
import { Container, Menu, LinkMenu } from './styles'

export function Orders () {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [activeStatus, setActiveStatus] = useState(1)
  const [rows, setRows] = useState([])

  // Importando os pedidos quando a pagina carregar
  useEffect(() => {
    // Pegando as ordens(pedidos) no Back-end
    async function loadOrders () {
      // Pegando os pedidos que estão no back-end
      const { data } = await api.get('orders')

      // Gravando eles no ordes
      setFilteredOrders(data)
      setOrders(data)
    }

    loadOrders()
  }, [])

  function createData (order) {
    return {
      name: order.user.name,
      orderId: order._id,
      date: formatDate(order.createdAt),
      status: order.status,
      products: order.products
    }
  }

  useEffect(() => {
    // Guardando em uma varivale todas as ordens(pedidos)
    const newRow = filteredOrders.map(ord => createData(ord))

    setRows(newRow)
  }, [filteredOrders])

  useEffect(() => {
    if (activeStatus === 1) {
      setFilteredOrders(orders)
    } else {
      const statusIndex = status.findIndex(sts => sts.id === activeStatus)
      const newFilteredOrders = orders.filter(order => order.status === status[statusIndex].value)
      setFilteredOrders(newFilteredOrders)
    }
  }, [orders])

  function handleStatus (status) {
    setActiveStatus(status.id)
    if (status.id === 1) {
      setFilteredOrders(orders)
    } else {
      setFilteredOrders(orders.filter(order => order.status === status.value))
    }
  }
  return (
    <Container>
      <Menu>
        { status && status.map(status => (<LinkMenu onClick={() => handleStatus(status)} key={status.id}
        isActiveStatus={activeStatus === status.id}
        >{status.label}</LinkMenu>))}
      </Menu>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedido</TableCell>
              <TableCell >Cliente</TableCell>
              <TableCell >Data do pedido</TableCell>
              <TableCell >Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { rows.map((row) => (
              <Row key={row.orderId} row={row} setOrders={setOrders} orders={orders} />
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}
export default Orders
