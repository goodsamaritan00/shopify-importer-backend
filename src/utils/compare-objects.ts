const matches = (obj: any, source: any) =>
  Object.keys(source).every(key => {
    const val1 = obj[key];
    const val2 = source[key];

    if (typeof val1 === 'string' && typeof val2 === 'string') {
      return val1.trim() === val2.trim();
    }

    return val1 == val2;
  });

function compareObjects(obj1: any, obj2: any) {

  const productData1 = {
    product_type: obj1.product_type,
    vendor: obj1.vendor,
    price: obj1.variants[0].price.replace(',', '.'),
    sku: obj1.variants[0].sku,
    qty: obj1.variants[0].inventory_quantity,
  };

  const productData2 = {
    product_type: obj2.product_type,
    vendor: obj2.vendor,
    price: obj2.variants[0].price.replace(',', '.'),
    sku: obj2.variants[0].sku,
    qty: obj2.variants[0].inventory_quantity,
  }

  return matches(productData1, productData2) && matches(productData2, productData1);
}

export default compareObjects;
