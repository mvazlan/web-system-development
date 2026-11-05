import { useParams, Link } from 'react-router-dom'
import products from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const { addToCart } = useCart()
  const product = products.find(item => item.id === id)

  if (!product) {
    return <p data-testid="product-not-found">Product not found.</p>
  }

  return (
    <section className="detail">
      <h1 data-testid="product-name">{product.name}</h1>
      <p data-testid="product-price">€{product.price.toFixed(2)}</p>
      <p data-testid="product-description">{product.description}</p>
      <button data-testid="add-to-cart" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
      <p><Link to="/">Back to products</Link></p>
    </section>
  )
}
