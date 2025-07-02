function compareObjects(obj1: any, obj2: any) {
  if (
    obj1.title === obj2.title &&
    obj1.body_html === obj2.body_html &&
    obj1.product_type === obj2.product_type &&
    obj1.variants?.[0]?.sku === obj2.variants?.[0]?.sku &&
    obj1.variants?.[0]?.price.replace(",", ".") ===
      obj2.variants?.[0]?.price.replace(",", ".")
  ) {
    return true;
  } else {
    return false;
  }
}

export default compareObjects