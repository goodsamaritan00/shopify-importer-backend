import { fetchEurasProductBySKU } from "./api/euras-api";
import { getImportedProducts, updateShopifyProduct } from "./api/shopify-api";
import { io } from "./index";
import compareObjects from "./utils/compare-objects";
import cron from 'node-cron'


const updateProducts = async (batchSize = 20) => {
  const data = await getImportedProducts()
  const products = data.products
  let productsToUpdate = [] 
  let batchNr = 0

  for (let i = 0; i < products.length; i+= batchSize) {
    batchNr++

    console.log('batch number:', batchNr)

    const batch = products.slice(i, i + batchSize)

    await Promise.all(
      batch.map(async (product: any) => {
        const sku = product.variants[0].sku

        try {
          const freshData = await fetchEurasProductBySKU(sku)

          if (!compareObjects(product, freshData)) {
            console.log(product.title, 'needs an update')
          } else {
            console.log('All products up to date.')
          }

        } catch (error) {
          console.log("Error while updating product:", product.title, error)
        }
      })
    )

  }
}



// updateProducts()


// cron.schedule("* * * * *", () => {
//   console.log("Cronjob started");
//   updateProducts()
// });
