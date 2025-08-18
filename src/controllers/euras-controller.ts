import { type Request, type Response } from "express";

import { fetchEurasApplianceCategories, fetchEurasAppliances, fetchEurasProducts, fetchEurasProductsByAppliances } from "../api/euras-api";

export const searchEuras = async (req: Request, res: Response) => {
  const { suchbg, anzahl, seite } = req.query;

  if (
    typeof suchbg !== "string" ||
    typeof anzahl !== "string" ||
    typeof seite !== "string"
  ) {
    return res.status(400).json({ message: "Invalid query params!" });
  }

  try {
    const data = await fetchEurasProducts(suchbg, anzahl, seite);
    return res.json(data);
  } catch (error) {
    console.error("Failed to fetch from Euras:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const searchAppliances = async (req: Request, res: Response) => {
  const { suchbg, anzahl, seite } = req.query;

  if (
    typeof suchbg !== "string" ||
    typeof anzahl !== "string" ||
    typeof seite !== "string"
  ) {
    return res.status(400).json({ message: "Invalid query params!" });
  }

  try {
    const data = await fetchEurasAppliances(suchbg, anzahl, seite);
    return res.json(data);
  } catch (error) {
    console.error("Failed to fetch from Euras:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const searchProductsByAppliances = async (req: Request, res: Response) => {
  const {suchbg, seite, geraeteid } = req.query;

  if (
    typeof suchbg !== "string" ||
    typeof geraeteid !== "string" ||
    typeof seite !== "string"
  ) {
    return res.status(400).json({ message: "Invalid query params!" });
  }

  try {
    const data = await fetchEurasProductsByAppliances(suchbg, seite, geraeteid)
    return res.json(data);
  } catch (error) {
    console.error("Failed to fetch from Euras:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}

export const searchProductsByAppliancesCategory = async (req: Request, res: Response) => {
  const {vgruppe, seite, geraeteid } = req.query;

  if (
    typeof vgruppe !== "string" ||
    typeof geraeteid !== "string" ||
    typeof seite !== "string"
  ) {
    return res.status(400).json({ message: "Invalid query params!" });
  }

  try {
    const data = await fetchEurasProductsByAppliances(vgruppe, seite, geraeteid)
    return res.json(data);
  } catch (error) {
    console.error("Failed to fetch from Euras:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
}


export const searchEurasApplianceCategories = async (req: Request, res: Response) => {
  const { geraeteid } = req.query;

  if (typeof geraeteid !== "string") {
    return res.status(400).json({ message: "Invalid query params!" });
  }

  try {
    const data = await fetchEurasApplianceCategories(geraeteid);
    return res.json(data);
  } catch (error) {
    console.error("Failed to fetch from Euras:", error);
    return res.status(500).json({ message: "Internal server error!" });
  }
}
