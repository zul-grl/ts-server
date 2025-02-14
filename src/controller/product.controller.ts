import { Request, RequestHandler, Response } from "express";
// Get all products
export interface typeProduct {
  _id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}
let products: typeProduct[] = [];

export const getProduct: RequestHandler = (req: Request, res: Response) => {
  res.send(products);
};

// Handle product addition
const addProduct = (newProduct) => {
  const lastProduct = products[products.length - 1];
  newProduct._id = lastProduct ? lastProduct._id + 1 : 1;
  newProduct.createdAt = new Date();
  newProduct.updatedAt = new Date();
  products.push(newProduct);
};
// Create new product
export const createProduct: RequestHandler = (req: Request, res: Response) => {
  addProduct(req.body);
  res.send("Product added");
};

// Delete product
export const deleteProduct: RequestHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  products = products.filter((product) => product._id.toString() != id);
  res.send("Product deleted");
};
// Get single product
export const singleProduct: RequestHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const product = products.find((product) => product._id.toString() == id);
  if (product) {
    res.send(product);
    return;
  }
  res.send("Product not found");
};
// Update product
export const updateProduct: RequestHandler = (req: Request, res: Response) => {
  const { _id, name, price, images } = req.body;
  let putProduct = products.find((product) => product._id == _id);
  if (putProduct) {
    putProduct.name = name;
    putProduct.price = price;
    putProduct.images = images;
    putProduct.updatedAt = new Date();
    res.send("Product updated");
    return;
  } else {
    res.send("Product not found");
  }
};
