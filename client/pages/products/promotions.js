import Link from '../../components/Link';


export default () => (
  <div>
    <h1>Products promotions</h1>
    <ul>
      <li>
        <Link to="/product" query={1}>
          Product 1
        </Link>
      </li>
      <li>
        <Link to="/product" query={2}>
          Product 2
        </Link>
      </li>
      <li>
        <Link to="/product" query={3}>
          Product 3
        </Link>
      </li>

    </ul>
  </div>
)
