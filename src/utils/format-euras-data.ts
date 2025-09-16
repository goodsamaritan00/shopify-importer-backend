import cleanProductName from "./format-euras-product-name";

export const formatEurasData = (product: any) => {
  const newPart = {
    title: cleanProductName(product.artikelbezeichnung, product.artikelnummer, product.originalnummer) || "Ohne Titel",
    body_html: `
      <p><strong>Artikelnummer:</strong> ${product.artikelnummer}</p>
      <p><strong>Originalnummer:</strong> ${product.originalnummer}</p>
      <p><strong>Hersteller:</strong> ${product.artikelhersteller}</p>
      <p><strong>Lieferzeit:</strong> ${product.lieferzeit} (${product.lieferzeit_in_tagen} Tage)</p>
      <p><strong>Ersatzartikel:</strong> ${product.ersatzartikel || "Keine Angabe"}</p>
      <p><strong>Importeur:</strong> ${product.herstelleradresse?.importeur?.name || "Keine Angabe"}</p>
    `.trim(),
    vendor: "EURAS/ASWO",
    product_type: product.vgruppenname || "Allgemein",
    images: product.picurlbig?.startsWith("http")
      ? [
          {
            src: product.picurlbig,
          },
        ]
      : [
          {
            src: "https://i.postimg.cc/Zq5jwGFg/no-photo.jpg",
          },
        ],
    tags: [
      product.artikelnummer,
      product.ersatzartikel,
      product.lieferzeit,
      `${product.lieferzeit_in_tagen} Tage`,
    ]
      .filter(Boolean)
      .join(", "),
    variants: [
      {
        sku: product.artikelnummer,
        price: product.ekpreis,
        inventory_management: "shopify",
        inventory_policy: product.bestellbar === "J" ? "continue" : "deny",
        inventory_quantity: product.bestellbar === "J" ? 1 : 0,
      },
    ],
  };

  return newPart;
};

export const toGraphQLProductInput = (product: any, shopifyProductId: number, variantIds: number[]) => {
  return {
    id: `gid://shopify/Product/${shopifyProductId}`,
    title: product.title,
    bodyHtml: product.body_html,
    vendor: product.vendor,
    productType: product.product_type,
    tags: product.tags,
    images: product.images,
    variants: product.variants.map((v: any, i: number) => ({
      id: `gid://shopify/ProductVariant/${variantIds[i]}`, // use corresponding variant ID
      sku: v.sku,
      price: v.price,
      inventoryQuantity: v.inventory_quantity,
      inventoryManagement: v.inventory_management?.toUpperCase(),
      inventoryPolicy: v.inventory_policy?.toUpperCase(),
    })),
  };
};

