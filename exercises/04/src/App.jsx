import { useState } from 'react'

const products = [
  { name: 'T-shirt', price: 15 },
  { name: 'Backpack', price: 30 },
  { name: 'Cap', price: 10 },
]

function App() {
  const [cart, setCart] = useState([])

  const addToCart = (product) => {
    setCart(cart.concat(product))
  }

  return (
    <main className="container">
      <h1>Shopping Cart</h1>

      <section>
        <h2>Products</h2>
        <div className="products">
          {products.map((product, index) => (
            <article className="product" key={product.name}>
              <h3>{product.name}</h3>
              <p>€{product.price.toFixed(2)}</p>
              <button
                data-testid={`add-${index}`}
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </article>
          ))}
        </div>
      </section>

      <section>
        <h2>Cart</h2>
        <p>Marcos: complete the cart list, remove buttons and total here.</p>
        <p>Items in cart: {cart.length}</p>
      </section>
    </main>
  )
}

export default App
