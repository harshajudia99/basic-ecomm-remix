import { LoaderFunction, json } from "@remix-run/node"
import { Link, useLoaderData, useNavigate } from "@remix-run/react"
import { getProducts } from "~/utils/product.server"

interface Product {
  pname: string;
  sku: string;
  price: number;
  color: string;
  size: string;
  status: string;
  id: string;
}

export const loader: LoaderFunction = async () => {
  const products = await getProducts()
  return json({ products })
}

export default function Products() {
  const { products } = useLoaderData<{ products: Product[] }>();
  const navigate = useNavigate()

  const handleDelete = async (productId: string, productName: string) => {
    const shouldDelete = window.confirm(`Are you sure you want to delete product '${productName}' ?`);
    if (shouldDelete) {
      navigate(`/deleteproduct/${productId}`)
    }
  };

  return (
    <div>
      <h1 className="prod-list-heading">Products List</h1>
      <div className="add-btn-container">
        <button className="add-product-btn"><Link to={'/addproduct'} className="add-btn-txt">Add Product</Link></button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>SKU</th>
            <th>Price</th>
            <th>Color</th>
            <th>Size</th>
            <th>Status</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.pname}</td>
              <td>{product.sku}</td>
              <td>{product.price}</td>
              <td>{product.color}</td>
              <td>{product.size}</td>
              <td>{product.status}</td>
              <td>
                <div className="btn-container">
                  <button className="btn update-btn"><Link to={`/updateproduct/${product.id}`} className="btn-txt">Update</Link></button>
                  <button
                    className="btn update-btn del-btn"
                    onClick={() => handleDelete(product.id, product.pname)}
                  >
                    Delete
                  </button>
                  <button className="btn"><Link to={`/viewproduct/${product.id}`} className="btn-txt">View</Link></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
