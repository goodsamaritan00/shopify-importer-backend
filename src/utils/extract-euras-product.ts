import cleanProductName from "./format-euras-product-name";


const extractProductData = (item: any) => {
  return {
    artikelnummer: item.artikelnummer,
    originalnummer: item.originalnummer,
    artikelbezeichnung: cleanProductName(
      item.artikelbezeichnung,
      item.artikelnummer,
      item.originalnummer,
    ),
    artikelhersteller: item.artikelhersteller,
    vgruppenname: item.vgruppenname,
    ekpreis: Number(item.ekpreis.replace(',', '.')).toFixed(2),
    bestellbar: item.bestellbar,
    ersatzartikel: item.ersatzartikel,
    lieferzeit: item.lieferzeit,
    lieferzeit_in_tagen: item.lieferzeit_in_tagen,
    picurlbig: item.picurlbig || "src/assets/no-photo.jpg",
    herstelleradresse: {
      hersteller: {
        name: item.herstelleradresse.hersteller.name,
        land: item.herstelleradresse.hersteller.land,
        email: item.herstelleradresse.hersteller.email,
        internet: item.herstelleradresse.hersteller.internet,
      },
      importeur: {
        name: item.herstelleradresse.importeur.name,
        land: item.herstelleradresse.importeur.land,
        email: item.herstelleradresse.importeur.email,
        internet: item.herstelleradresse.importeur.internet,
      },
    },
    thumbnailurl: item.thumbnailurl,
  };
};

export default extractProductData;
