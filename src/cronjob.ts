import { fetchEurasProductBySKU } from "./api/euras-api";
import { getImportedProducts, updateShopifyProduct } from "./api/shopify-api";
import { io } from "./index";
import compareObjects from "./utils/compare-objects";
import cron from 'node-cron'

const updateProducts = async () => {
  const data = await getImportedProducts()
  const products = data.products

  for (const product of products) {
    const sku = product.variants[0].sku

    try {
      const freshData = await fetchEurasProductBySKU(sku)

      if (!compareObjects(product, freshData)) {
        updateShopifyProduct(product.id, freshData)

        console.log('prdocuts updated', product.title)
      } else {
        console.log('Products up to date')
      }
    } catch (error) {
      console.error(error)
    }
  }
}



// cron.schedule("* * * * *", () => {
//   console.log("Cronjob started");
//   updateProducts()
// });
