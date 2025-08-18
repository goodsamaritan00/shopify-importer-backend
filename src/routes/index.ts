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
import { searchEuras, searchAppliances, searchProductsByAppliances, searchEurasApplianceCategories, searchProductsByAppliancesCategory } from "../controllers/euras-controller";

const router = express.Router();

// PUBLIC ROUTES
router.post("/login", loginUser);
router.post("/register", registerUser);

router.use(requireAuth);

// PROTECTED ROUTES (require auth)
router.get("/eurasProductSearch", searchEuras);
router.get("/eurasAppliancesSearch", searchAppliances);
router.get("/eurasProductsByAppliances", searchProductsByAppliances);
router.get("/eurasProductsByAppliancesCategory", searchProductsByAppliancesCategory);
router.get("/eurasApplianceCategories", searchEurasApplianceCategories);
router.post("/addProduct", addProduct);
router.post("/shopifyGraphiql", graphQLController);
router.delete("/deleteProduct/:productId", deleteProduct);
router.put("/updateProduct/:productId", updateProduct);
router.get("/getImportedProducts", importedProducts);

export default router;
