import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  // Manuel: añadir un producto o aumentar su cantidad si ya existe.
  function addToCart(product) {
    const exists = cartItems.some(item => item.id === product.id)

    if (exists) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  function removeFromCart(id) {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  // Si la cantidad llega a 0, el producto se elimina del carrito.
  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCartItems(items => items.map(item =>
      item.id === id ? { ...item, quantity } : item
    ))
  }

  function clearCart() {
    setCartItems([])
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
