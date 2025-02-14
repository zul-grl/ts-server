import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  singleProduct,
  updateProduct,
} from "../controller/product.controller";

const productRouter = Router();
productRouter
  .get("/", getProduct)
  .post("/", createProduct)
  .get("/:id", singleProduct)
  .put("/:id", updateProduct)
  .delete("/:id", deleteProduct);
export { productRouter };
