import { fetchEurasProductBySKU } from "./api/euras-api";
import { getImportedProducts, runBulkUpdate, updateShopifyProduct } from "./api/shopify-api";
import { io } from "./index";
import compareObjects from "./utils/compare-objects";
import cron from 'node-cron'
import { toGraphQLProductInput } from "./utils/format-euras-data";


// let productsToUpdate: any = [] 


// const checkForUpdate = async (batchSize = 20) => {
//   const data = await getImportedProducts()
//   const products = data.products
//   let batchNr = 0

//   for (let i = 0; i < products.length; i+= batchSize) {
//     batchNr++

//     console.log('batch number:', batchNr)

//     const batch = products.slice(i, i + batchSize)

//     await Promise.all(
//       batch.map(async (product: any) => {
//         const sku = product.variants[0].sku

//      try {
//       const freshData = await fetchEurasProductBySKU(sku);

//       if (!compareObjects(product, freshData)) {
//         updateShopifyProduct(product.id, freshData)
//         const updateData = { 
//           id: `gid://shopify/Product/${product.id}`, 
//           ...freshData,
//           variants: freshData?.variants.map((v: any, i: number) => ({
//             id: `gid://shopify/ProductVariant/${product.variants[i].id}`, // use existing variant ID
//             ...v
//           }))
//         };

//           productsToUpdate.push(updateData);

//       } else {
//         console.log('Product up to date');
//       }

//     } catch (error) {
//       console.log("Error while updating product:", product.title, error);
//     }
//       })
//     )
//   }

// }

// const generateJSONL = (products: any[]) => {
//   return products.map((product) => {
//     return JSON.stringify({ input: product })
//   }).join("\n")
// }


// const test = async () => {
//     await checkForUpdate()
//     const jsonlres = generateJSONL(productsToUpdate)
//     console.log('products',productsToUpdate)
//     console.log('jsonl', jsonlres)
// }



// test()

// checkForUpdate()

// cron.schedule("* * * * *", () => {
//   console.log("Cronjob started");
//   checkForUpdate();
// });
