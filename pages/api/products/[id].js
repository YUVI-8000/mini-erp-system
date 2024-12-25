// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   const { id } = req.query;

//   console.log("ID received in API:", id); // Debug the ID

//   if (!id) {
//     return res.status(400).json({ error: "Product ID is required" });
//   }

//   const numericId = parseInt(id, 10);
//   if (isNaN(numericId)) {
//     return res.status(400).json({ error: "Product ID must be a valid number" });
//   }

//   try {
//     if (req.method === 'GET') {
//       const product = await prisma.product.findUnique({
//         where: { id: numericId },
//       });
//       if (!product) {
//         return res.status(404).json({ error: "Product not found" });
//       }
//       return res.status(200).json(product);
//     }

//     if (req.method === 'PUT') {
//       const { name, description, price, quantity } = req.body;
//       const updatedProduct = await prisma.product.update({
//         where: { id: numericId },
//         data: { name, description, price: parseFloat(price), quantity: parseInt(quantity) },
//       });
//       return res.status(200).json(updatedProduct);
//     }

//     if (req.method === 'DELETE') {
//       await prisma.product.delete({
//         where: { id: numericId },
//       });
//       return res.status(204).end();
//     }

//     res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   } catch (error) {
//     console.error("API Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const product = await prisma.product.findUnique({
        where: { id },
      });

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  } else if (req.method === "PUT") {
    try {
      const { name, description, price, quantity } = req.body;
      const product = await prisma.product.update({
        where: { id },
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      });

      res.status(200).json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
    }
  } else if (req.method === "DELETE") {
    try {
      await prisma.product.delete({
        where: { id },
      });

      res.status(204).end();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Failed to delete product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
