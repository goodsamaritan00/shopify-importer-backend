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
  if (!shopifyAdminToken) throw new Error("Invalid or missing Shopify API token");

  let products: any[] = [];
  let url: any =
    "https://escooter-reparatur.myshopify.com/admin/api/2025-04/products.json?limit=250&vendor=EURAS/ASWO";

  while (url) {
    const response = await fetch(url, {
      headers: {
        "X-Shopify-Access-Token": shopifyAdminToken,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error(`Shopify API error: ${response.statusText}`);

    const data = await response.json();
    console.log("Fetched page:", data.products.length, "products");
    products.push(...data.products);

    // look for next page
    const linkHeader = response.headers.get("link");
    if (linkHeader) {
      const nextMatch = linkHeader.match(/<([^>]+)>; rel="next"/);
      url = nextMatch ? nextMatch[1] : null;
    } else {
      url = null;
    }
  }

  console.log("Total collected:", products.length);
  return products;
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

interface BulkUpdateResponse {
  bulkOperationRunQuery: {
    bulkOperation: { id: string; status: string };
    userErrors: Array<{ field: string[]; message: string }>;
  };
}
