import { fetchEurasProductBySKU } from "./api/euras-api";
import { getImportedProducts, updateShopifyProduct } from "./api/shopify-api";
import { io } from "./index";
import compareObjects from "./utils/compare-objects";
import cron from 'node-cron'
import { toGraphQLProductInput } from "./utils/format-euras-data";


// let productsToUpdate: any = [] 

// const delay = async (ms: number) => {
//     console.log('Delay', ms)
//     return new Promise((resolve) => setTimeout(resolve, ms));
// }

// const updateProducts = async (batchSize = 4) => {
//   const data = await getImportedProducts()
//   const products = data.products.slice(24, 36)
//   let batchNr = 0

//           let productsnr: number = 0

//   for (let i = 0; i < products.length; i+= batchSize) {
//     batchNr++

//     console.log('batch number:', batchNr)

//     const batch = products.slice(i, i + batchSize)

//     for (const product of products) {
//       const sku = product.variants[0].sku
//       console.log("SKU", sku, product.title)

//       try {
//         const freshData = await fetchEurasProductBySKU(sku)

//         if (!freshData) {
//           console.log("Can't fetch data for product", sku)
//         } else if (!compareObjects(product, freshData)) {
//           console.log("needs update", product.title)
//           // await updateShopifyProduct(product.id, freshData)
//         } else {
//           console.log("Product up to date")
//         }
//       } catch (error) {
//         console.log("Error while updating product:", product.title, error)
//       }

//       await delay(5000)
//     }

//       }
// }


// updateProducts()

