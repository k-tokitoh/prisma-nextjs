import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handle(req, res) {
  const postId = req.query.id;

  if (req.method === "DELETE") {
    handleDELETE(postId, res);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}

async function handleDELETE(id, res) {
  const post = await prisma.task.delete({
    where: { id: Number(id) },
  });
  res.json(post);
}
