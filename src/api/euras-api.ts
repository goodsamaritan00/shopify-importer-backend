import dotenv from "dotenv";
import { formatEurasData } from "../utils/format-euras-data";
import extractProductData from "../utils/extract-euras-product";
dotenv.config();

// CREATE EURAS SESSION
async function createSession(): Promise<string> {
  const EED_ID = process.env.EED_ID

  if (!EED_ID) {
    throw new Error("EURAS_TOKEN environment variable is not defined");
  }

  const params = new URLSearchParams({
    format: "json",
    id: EED_ID,
    art: "neuesitzung",
  });

  const url = `https://shop.euras.com/eed.php?${params.toString()}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });

  const text = await response.text();

  if (text.startsWith("ERROR")) {
    throw new Error("Failed to create session");
  }

  const data = JSON.parse(text);

  if (data.fehlernummer !== "0") {
    throw new Error(`API Error: ${data.fehlernummer}`);
  }

  console.log(data.sessionid);

  return data.sessionid;
}

let cachedSessionId: string | null = null;
let cachedSessionExpiry = 0;

const SESSION_TTL_MS = 10 * 60 * 1000; // 10 min, adjust if needed

async function getCachedSession(): Promise<string> {
  const now = Date.now();
  if (!cachedSessionId || now > cachedSessionExpiry) {
    cachedSessionId = await createSession();
    cachedSessionExpiry = now + SESSION_TTL_MS;
  }
  return cachedSessionId;
}

// GET EURAS PRODUCTS
export const fetchEurasProducts = async (
  suchbg: string,
  anzahl: string,
  seite: string,
) => {
  const eurasToken = process.env.EURAS_TOKEN;

  if (!eurasToken) {
    throw new Error("Token not provided");
  }

  try {
    console.time("session");
    const sessionId = await getCachedSession();

    const params = new URLSearchParams({
      format: "json",
      id: eurasToken,
      art: "artikelsuche",
      sessionid: sessionId,
      suchbg: suchbg,
      anzahl: anzahl,
      seite: seite,
      bigPicture: "1",
      morepics: "1",
      artikeldetails: "1",
      attrib: "1",
      VGneedDevice: "1",
    });

    const url = `https://shop.euras.com/eed.php?${params.toString()}`;
    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// GET ARTICLE Appliances
export const fetchEurasAppliances = async (suchbg: string, anzahl: string, seite: string) => {

  const eurasToken = process.env.EURAS_TOKEN;
  const sessionId = await getCachedSession();
  
  try {

    if (!eurasToken) {
      throw new Error("Token not provided");
    }

    const params = new URLSearchParams({
      format: "json",
      id: eurasToken,
      art: "geraetesuche", 
      sessionid: sessionId,
      anzahl: anzahl,
      seite: seite,
      suchbg: suchbg
    }); 

    const url = `https://shop.euras.com/eed.php?${params.toString()}`;

    const response = await fetch(url);
    const text = await response.text();
    const data = JSON.parse(text);

    return data
  } catch (error) {
    throw error
  }
}

// Get products by selected appliance
export const fetchEurasProductsByAppliances = async (
  suchbg?: string,
  vgruppe?: string,
  seite?: string,
  geraeteid?: string
) => {
  const eurasToken = process.env.EURAS_TOKEN;
  const sessionId = await getCachedSession();

  if (!eurasToken) {
    throw new Error("Token not provided");
  }

  const params = new URLSearchParams({
    format: "json",
    id: eurasToken,
    art: "geraeteartikel",
    sessionid: sessionId,
    seite: seite || "",
    geraeteid: geraeteid || "",
    attrib: "1",
    bigPicture: "1",
    vgruppe: "top"
  });

// if (suchbg) {
//   params.delete("vgruppe");  // remove category
//   params.set("suchbg", suchbg);
// }

// if (vgruppe) {
//   params.delete("suchbg");   // remove search
//   params.set("vgruppe", vgruppe);
// }

  const url = `https://shop.euras.com/eed.php?${params.toString()}`;

  try {
    const response = await fetch(url);
    const text = await response.text();
    return JSON.parse(text);
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};



// GET EURAS PRODUCT BY ID
export const fetchEurasProductBySKU = async (sku: string) => {
  try {
    const data = await fetchEurasProducts(sku, "1", "1");
    const dataObj = Object.entries(data.treffer)[0][1];
    const extractedData = extractProductData(dataObj)
    return formatEurasData(extractedData);
  } catch (error) {
    console.log(error);
  }
};

// GET PRODUCTS BY APPLIANCES CATEGORIES
export const fetchEurasApplianceCategories = async (geraeteid: string) => {
  const eurasToken = process.env.EURAS_TOKEN;
  const sessionId = await getCachedSession();

  try {
     if (!eurasToken) {
      throw new Error("Token not provided");
      }

      const params = new URLSearchParams({
        format: "json",
        id: eurasToken,
        art: "geraeteartikelgruppen", 
        sessionid: sessionId,
        geraeteid: geraeteid
      });

      const url = `https://shop.euras.com/eed.php?${params.toString()}`;

      const response = await fetch(url);
      const text = await response.text();
      const data = JSON.parse(text); 

      return data
  } catch (error) {
    throw error
  }

}

// suggest user search input
export const fetchSuggestList = async (suchbg: string) => {
  const eurasToken = process.env.EURAS_TOKEN;
  const sessionId = await getCachedSession();

  try {
     if (!eurasToken) {
      throw new Error("Token not provided");
      }

      const params = new URLSearchParams({
        format: "json",
        id: eurasToken,
        art: "suggestliste", 
        sessionid: sessionId,
        suchbg: suchbg
      });

      const url = `https://shop.euras.com/eed.php?${params.toString()}`;

      const response = await fetch(url);
      const text = await response.text();
      const data = JSON.parse(text); 

      return data
  } catch (error) {
    throw error
  }

}