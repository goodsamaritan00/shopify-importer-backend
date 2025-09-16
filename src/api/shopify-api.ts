import dotenv from "dotenv";

dotenv.config();

const shopifyAdminToken = process.env.SHOPIFY_ADMIN_TOKEN;

// ADD PRODUCT
export const addProductToShopify = async (product: any) => {
  if (!shopifyAdminToken) {
    throw new Error("Invalid or missing API token");
  }

  const url =
    "https://escooter-reparatur.myshopify.com/admin/api/2025-04/products.json";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": shopifyAdminToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// GET ALL IMPORTED PRODUCTS
export const getImportedProducts = async () => {
  if (!shopifyAdminToken) {
    throw new Error("Invalid or missing Shopify API token");
  }

  const url =
    "https://escooter-reparatur.myshopify.com/admin/api/2025-04/products.json?limit=250&vendor=EURAS/ASWO";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "X-Shopify-Access-Token": shopifyAdminToken,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};

// UPDATE IMPORTED PRODUCT
export async function updateShopifyProduct(
  productId: string,
  productData: any,
) {
  const shopifyAdminToken = process.env.SHOPIFY_ADMIN_TOKEN;

  if (!shopifyAdminToken) {
    throw new Error("Invalid or missing Shopify API token");
  }

  const url = `https://escooter-reparatur.myshopify.com/admin/api/2025-04/products/${productId}.json`;

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "X-Shopify-Access-Token": shopifyAdminToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product: productData }),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  return response.json();
}

// DELETE IMPORTED PRODUCT
export const deleteProductFromShopify = async (productId: string) => {
  if (!shopifyAdminToken) {
    throw new Error("Invalid or missing API token");
  }

  const url = `https://escooter-reparatur.myshopify.com/admin/api/2025-04/products/${productId}.json`;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "X-Shopify-Access-Token": shopifyAdminToken,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }
};

// POST GRAPH QL Query
export const postGraphQLQuery = async (query: any) => {
  if (!shopifyAdminToken) {
    throw new Error("Invalid or missing API token");
  }

  const url =
    "https://escooter-reparatur.myshopify.com/admin/api/2025-04/graphql.json";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": shopifyAdminToken,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(query),
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};



// Graph ql bulk update for conjob or multiple product selection

export const runBulkUpdate = async (productsToUpdate: any[]) => {
  const url = "https://escooter-reparatur.myshopify.com/admin/api/2025-04/graphql.json";

  const mutations = productsToUpdate.map((p, i) => `
    update${i}: productUpdate(input: ${JSON.stringify(p).replace(/"([^"]+)":/g, '$1:')}) {
      product { id title }
      userErrors { field message }
    }
  `).join("\n");

  const query = `mutation { ${mutations} }`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "X-Shopify-Access-Token": process.env.SHOPIFY_ADMIN_TOKEN!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  const result = await response.json();
  console.log("Bulk update submitted:", result);

  return result
};

