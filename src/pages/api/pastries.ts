// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const pastries = async (req: NextApiRequest, res: NextApiResponse) => {
  const pastries = await prisma.pastry.findMany();
  res.status(200).json(pastries);
};

export default pastries;
