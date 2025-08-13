import { fetchEurasProductBySKU } from "./api/euras-api";
import { getImportedProducts, updateShopifyProduct } from "./api/shopify-api";
import { io } from "./index";
import compareObjects from "./utils/compare-objects";

type Product = {
  id: string;
  variants?: { sku?: string }[];
  [key: string]: any;
};

const BATCH_SIZE = 10;

async function processProduct(product: Product): Promise<void> {
  const sku = product.variants?.[0]?.sku;
  if (!sku) return;

  try {
    const eurasProduct = await fetchEurasProductBySKU(sku);

    if (compareObjects(eurasProduct, product)) {
      io.emit("product_updated", { id: product.id, sku });
      console.log(`Product ${product.id} is already up to date.`);
    } else {
      console.log(`Updating product ${product.id}...`);
      await updateShopifyProduct(product.id, eurasProduct);
      io.emit("product_updated", { id: product.id, sku });
      console.log(`Product ${product.id} updated.`);
    }
  } catch (err) {
    console.error(`Failed to process product ${product.id}:`, err);
  }
}

async function processWithPromises<T>(
  data: T[],
  batchSize: number,
  processingFunction: (item: T) => Promise<void>
): Promise<void> {
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    await Promise.all(batch.map(processingFunction));
  }
}

const checkDataToUpdate = async () => {
  const shopifyAswoProducts = await getImportedProducts();
  const products: Product[] = shopifyAswoProducts.products || [];

  console.log(`Fetched ${products.length} products to check.`);

  await processWithPromises(products, BATCH_SIZE, processProduct);
};

// Run every minute
// cron.schedule("* * * * *", () => {
//   console.log("Cronjob started");
//   checkDataToUpdate();
// });
