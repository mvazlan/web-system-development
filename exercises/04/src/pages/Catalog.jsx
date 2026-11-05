import { useState } from 'react'
import { Link } from 'react-router-dom'
import products from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function Catalog() {
  const [search, setSearch] = useState('')
  const { addToCart } = useCart()

  const visibleProducts = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <section>
      <h1>Products</h1>
      <label htmlFor="search">Search products</label>
      <input
        id="search"
        data-testid="search"
        value={search}
        onChange={event => setSearch(event.target.value)}
        placeholder="Search by name"
      />

      {visibleProducts.length === 0 && (
        <p data-testid="no-results">No products found.</p>
      )}

      <div className="products">
        {visibleProducts.map(product => (
          <article className="product" data-testid={`product-${product.id}`} key={product.id}>
            <h2>
              <Link to={`/products/${product.id}`} data-testid={`product-link-${product.id}`}>
                {product.name}
              </Link>
            </h2>
            <p data-testid={`price-${product.id}`}>€{product.price.toFixed(2)}</p>
            <button data-testid={`add-${product.id}`} onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
