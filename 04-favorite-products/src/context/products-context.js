import React, { useState } from 'react'

export const ProductsContext = React.createContext({
  products: [],
  toggleFav: (id) => { }
})

const initialProducts = [
  {
    id: 'p1',
    title: 'Red Scarf',
    description: 'A pretty red scarf.',
    isFavorite: false
  },
  {
    id: 'p2',
    title: 'Blue T-Shirt',
    description: 'A pretty blue t-shirt.',
    isFavorite: false
  },
  {
    id: 'p3',
    title: 'Green Trousers',
    description: 'A pair of lightly green trousers.',
    isFavorite: false
  },
  {
    id: 'p4',
    title: 'Orange Hat',
    description: 'Street style! An orange hat.',
    isFavorite: false
  }
]

const ProductsProvider = props => {
  // eslint-disable-next-line no-unused-vars
  const [productsList, setProductsList] = useState(initialProducts)

  const toggleFavorite = productId => {
    // Pass to the setProductsList an anonymous function with an
    // argument which is the most current products list
    setProductsList(currentProdList => {
      const prodIndex = currentProdList.findIndex(
        p => p.id === productId
      )
      const newFavStatus = !currentProdList[prodIndex].isFavorite
      const updatedProducts = [...currentProdList]
      updatedProducts[prodIndex] = {
        ...currentProdList[prodIndex],
        isFavorite: newFavStatus
      }
      return updatedProducts
    })
  }

  return (
    <ProductsContext.Provider value={{
      products: productsList,
      toggleFav: toggleFavorite
    }}>
      {props.children}
    </ProductsContext.Provider>
  )
}

export default ProductsProvider
