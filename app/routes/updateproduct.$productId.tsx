import { LoaderFunction, json, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getProductById } from '~/utils/product.server';
import { useState } from 'react'


export const loader: LoaderFunction = async ({params}) => {
  const { productId } = params

  if (typeof productId !== 'string') {
    return redirect('/home')
  }
  let product = await getProductById(productId)
  return json({ product, productId });
};

const UpdateProduct: React.FC = () => {

  const {product} = useLoaderData<typeof loader>()

  const [formData, setFormData] = useState<FormData>({
    pname: '',
    sku: '',
    price: '',
    color: '',
    size: 'S',
    status: 'Enable',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  
  return (
    <div className="container">
      <h2 className="form-heading">Add Product</h2>
      <form method="post">
        <div className="form-group">
          <label htmlFor="pname">Product Name</label>
          <input
            className="inputfield"
            type="text"
            id="pname"
            name="pname"
            placeholder="Enter product name"
            required
            value={formData.pname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            className="inputfield"
            type="text"
            id="sku"
            name="sku"
            placeholder="Enter SKU"
            required
            value={formData.sku}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            className="inputfield"
            type="number"
            id="price"
            name="price"
            step="0.01"
            placeholder="Enter price"
            required
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="color">Color</label>
          <input type="color" id="color" name="color" value={formData.color} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select
            id="size"
            name="size"
            className="form-select"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <select
            id="status"
            name="status"
            className="form-select"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Enable">Enable</option>
            <option value="Disable">Disable</option>
          </select>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
