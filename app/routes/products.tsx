import { LoaderFunction, json, redirect } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { deleteProduct, getProducts } from "~/utils/product.server"

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
  

const handleDelete = async (id: string) => {
  console.log(id)
  await deleteProduct(id);
}


  return (
    <div>
      <h1 className="prod-list-heading">Products List</h1>
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
                <button><Link to={`/updateproduct/${product.id}`}>Update</Link></button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
