import { type Request, type Response } from "express";

import { fetchEurasProduct } from "../api/euras-api";

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
    const data = await fetchEurasProduct(suchbg, anzahl, seite);
    return res.json(data);
  } catch (error) {
    console.error("Failed to fetch from Euras:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};
