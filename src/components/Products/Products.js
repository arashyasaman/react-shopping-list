import React, { useState, useEffect } from 'react'
import ProductList from './ProductList'
import ProductForm from './ProductForm'

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('https://react-training-31a7b-default-rtdb.firebaseio.com/products.json')
    .then((response) => {
      return response.json()
    })
    .then((responseData) => {
      const loadedProducts = []

      for (const item in responseData) {
        loadedProducts.push({
          id: item,
          title: responseData[item].title,
          amount: responseData[item].amount
        })
      }

      setProducts(loadedProducts)
    })
  }, [])

  const addProductHandler = (item) => {
    fetch('https://react-training-31a7b-default-rtdb.firebaseio.com/products.json', {
      method: 'POST',
      body: JSON.stringify(item),
      header: { 'Content-Type': 'application/json' }
    })
    .then((response) => {
      response.json()
      .then((responseData) => {
        setProducts((prevState) => {
          return [
            ...prevState,
            {
              id: responseData.name,
              ...item
            }
          ]
        })
      })
    })

  }

  return (
    <div className="App">
      <ProductForm onAddproduct={addProductHandler} />

      <section>
        <ProductList
          products={products}
          onRemoveItem={() => {}}
        />
      </section>
    </div>
  )
}

export default Products
