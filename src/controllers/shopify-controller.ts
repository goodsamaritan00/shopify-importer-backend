import { type Request, type Response } from "express";

import {
  addProductToShopify,
  deleteProductFromShopify,
  getImportedProducts,
  postGraphQLQuery,
  updateShopifyProduct,
} from "../api/shopify-api";

// ADD PRODUCT TO SHOPIFY
export const addProduct = async (req: Request, res: Response) => {
  try {
    const data = await addProductToShopify(req.body);
    return res.json(data);
  } catch (error) {
    console.error("Failed to add product to Shopify:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// GET ALL IMPORTED PRODUCTS
export const importedProducts = async (req: Request, res: Response) => {
  try {
    const products = await getImportedProducts();
    return res.json({ products });
  } catch (error) {
    console.error("Failed to fetch from Shopify:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// UPDATE SHOPIFY PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    const data = await updateShopifyProduct(productId, req.body);
    res.json(data);
  } catch (error) {
    console.error("Failed to update Shopify product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// DELETE PRODUCT FROM SHOPIFY
export const deleteProduct = async (req: Request, res: Response) => {
  const { productId } = req.params;

  try {
    await deleteProductFromShopify(productId);
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Failed to delete product from Shopify:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// POST GRAPH QL QUERY
export const graphQLController = async (req: Request, res: Response) => {
  try {
    const data = await postGraphQLQuery(req.body);
    res.json(data);
  } catch (error) {
    console.error("Failed to fetch from Shopify:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
