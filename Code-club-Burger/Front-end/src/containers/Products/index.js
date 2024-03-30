import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Imagens
import ProductsLogo from '../../assets/products-logo.svg'
import { CardProduct } from '../../components'
import api from '../../services/api'
import formatCurrency from '../../utils/formatCurrency'
import { Container, ProductsImg, CategoryButton, CategoriesMenu, ProductsContainer } from './styles'

// COmponentes

export function Products () {
  // Recebe o id da categoria que escolheu na home
  const location = useLocation()
  // "|| {}" é para caso nao chege nada ele nao dé erro
  const { categoryId } = location.state || {}

  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProducts, setfilteredProducts] = useState([])

  // isso serve para salvar qual a categoria esta selecionada
  const [activeCategory, setActiveCategory] = useState(categoryId || 0)

  // Importando das as categorias quando a pagina carregar
  useEffect(() => {
    // Pegando as categorias no Back-end
    async function loadCategories () {
      const { data } = await api.get('/categories')

      // Incluir uma categoria "todos"
      const newCategory = [{ id: 0, name: 'todos' }, ...data]
      setCategories(newCategory)
    }

    // Pegando os produtos do Back-end
    async function loadProducts () {
      const { data: allProducts } = await api.get('/products')

      const newProducts = allProducts.map(product => {
        // Fazendo um map para que os preços fiquem formatados como moedas Ex:R$10,00
        return { ...product, formatedPrice: formatCurrency(product.price) }
      })
      setProducts(newProducts)
    }

    loadProducts()
    loadCategories()
  }, [])

  // Isso vai filtrar todos os itens que tem o mesmo id que "activeCategory"
  useEffect(() => {
    if (activeCategory === 0) {
      setfilteredProducts(products)
    } else {
      const newFilterredProducts = products.filter(product => product.category_id === activeCategory)

      setfilteredProducts(newFilterredProducts)
    }
  }, [activeCategory, products])

  return (
    <Container>
        <ProductsImg src={ProductsLogo} alt='logo-da-home' />
        <CategoriesMenu>
          { categories && categories.map(category =>
            <CategoryButton
            key={category.id}
            isActiveCategory={activeCategory === category.id} // Aqui se a categoria que esta sendo mapeada for igual a que esta dentro da variavel "activeCategory" ele vai troca o estilo dela
            onClick={() => {
              setActiveCategory(category.id)
            }}>{category.name}</CategoryButton>
          )}
        </CategoriesMenu>
        <ProductsContainer>
          {
            filteredProducts && filteredProducts.map(product =>
              <CardProduct key={product.id} product={product}/>
            )}

        </ProductsContainer>
    </Container>
  )
}
