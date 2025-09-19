import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {

  try {

    if (req.method === "GET") {
        const totalItems = [
            {name: "prueba"},
            {name: "prueba2"}
        ]
        res.status(200).json({
            totalItems,
        });
    }

     if (req.method === "POST") {
        // aqui va logica del post
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export default handler;