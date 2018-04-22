import Link from 'next/link'

export default () => (
  <div>
    <h2>Home</h2>
    <Link href={`/products`}><a>Products</a></Link>
  </div>
)
