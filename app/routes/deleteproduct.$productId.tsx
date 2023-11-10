import {LoaderFunction, json, redirect } from "@remix-run/node"
import { deleteProduct } from "~/utils/product.server"

export const loader: LoaderFunction = async ({ params }) => {
  const { productId } = params
  if(typeof productId !== 'string'){
    return json({error: 'Invalid data'})
  }
  await deleteProduct(productId)
  return redirect('/products')
}
