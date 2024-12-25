// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();

// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const products = await prisma.product.findMany();
//       res.status(200).json(products);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//       res.status(500).json({ error: "Failed to fetch products" });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const { name, description, price, quantity } = req.body;
//       const product = await prisma.product.create({
//         data: { name, description, price: parseFloat(price), quantity: parseInt(quantity) },
//       });
//       res.status(201).json(product);
//     } catch (error) {
//       console.error("Error creating product:", error);
//       res.status(500).json({ error: "Failed to create product" });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }


import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await prisma.product.findMany();
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  } else if (req.method === "POST") {
    try {
      const { name, description, price, quantity } = req.body;
      const product = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          quantity: parseInt(quantity),
        },
      });
      res.status(201).json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ error: "Failed to create product" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
