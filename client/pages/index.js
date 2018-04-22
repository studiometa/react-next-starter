import Link from 'next/link'

export default () => (
  <div>
    <h1>Home</h1>
    <Link href={`/products`}><a>Products</a></Link>
  </div>
)
