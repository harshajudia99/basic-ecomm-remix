import { prisma } from "./prisma.server";

export const createProduct = async (
  pname: string,
  sku: string,
  price: string,
  color: string,
  size: string,
  status: string
) => {
  await prisma.product.create({
    data: {
      pname,
      sku,
      price,
      color,
      size,
      status,
    },
  });
};

export const updateProduct = async (productId: string, newData: any) => {
  await prisma.product.update({
    where: {
      id: productId,
    },
    data: newData,
  });
};

export const getProducts = async () => {
  return await prisma.product.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const deleteProduct = async (productId: string) => {
  await prisma.product.delete({
    where: {
      id: productId,
    },
  });
};

export const getProductById = async (productId: string) => {
  const product = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });
  return product;
};
