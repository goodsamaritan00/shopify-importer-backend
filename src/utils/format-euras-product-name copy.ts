function createLooseMatchRegex(str: string) {
  const escaped = str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  const pattern = escaped.split("").join("[\\W_]*");
  return new RegExp(pattern, "gi"); // global & case-insensitive
}

function cleanProductName(productString: string, sku: string, oem: string) {
  let result: string = productString;

  if (sku) {
    const skuRegex = createLooseMatchRegex(sku);
    result = result.replace(skuRegex, "");
  }

  if (oem) {
    const oemRegex = createLooseMatchRegex(oem);
    result = result.replace(oemRegex, "");
  }

  // Remove extra spaces left after removal
  return result.replace(/\s{2,}/g, " ").trim();
}

export default cleanProductName;
