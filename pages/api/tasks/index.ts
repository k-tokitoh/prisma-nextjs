import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(_req, res) {
  const result = await prisma.task.findMany();
  res.json(result);
}
