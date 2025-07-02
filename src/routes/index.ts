import express from "express";

import requireAuth from "../middleware/require-auth";

import {
  addProduct,
  deleteProduct,
  graphQLController,
  importedProducts,
  updateProduct,
} from "../controllers/shopify-controller";

import { registerUser, loginUser } from "../controllers/user-controller";
import { searchEuras } from "../controllers/euras-controller";

const router = express.Router();

// PUBLIC ROUTES
router.post("/login", loginUser);
router.post("/register", registerUser);

router.use(requireAuth);

// PROTECTED ROUTES (require auth)
router.get("/eurasProductSearch", searchEuras);
router.post("/addProduct", addProduct);
router.post("/shopifyGraphiql", graphQLController);
router.delete("/deleteProduct/:productId", deleteProduct);
router.put("/updateProduct/:productId", updateProduct);
router.get("/getImportedProducts", importedProducts);

export default router;
