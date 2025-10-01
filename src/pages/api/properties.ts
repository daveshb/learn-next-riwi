import Properties from "@/database/models/properties";
import dbConnection from "@/lib/dbconection";
import type { NextApiRequest, NextApiResponse } from "next";

interface Property {
  _id: string;
  name: string;
  value: number;
  img?: string;
}

type GetResponse = { ok: true; data: Property[] };
type PostResponse = { ok: true; message: string; createdId?: string };
type PutResponse = { ok: true; message: string; updatedId?: string };
type DeleteResponse = { ok: true; message: string; deletedId?: string };
type ErrorResponse = { ok: false; error: string };

type ResponseBody =
  | GetResponse
  | PostResponse
  | PutResponse
  | DeleteResponse
  | ErrorResponse;

const allowed = ["GET", "POST", "PUT", "DELETE"];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseBody>
) {
  console.log(req.method);

  try {
    if (!allowed.includes(req.method!)) {
      res.setHeader("Allow", allowed);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    dbConnection();

    if (req.method === "GET") {
      const data = await Properties.find();

      res.status(200).json({
        ok: true,
        data: data as Property[],
      });
    }

    if (req.method === "POST") {
      const { name, value, img } = req.body;

      try {
        const newProperty = new Properties({
          name,
          value,
          img,
        });

        const savedProperty = await newProperty.save();

        return res.status(201).json({
          ok: true,
          message: "property saved",
          createdId: savedProperty._id,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, error: "internal server error" });
      }
    }

    if (req.method === "PUT") {
      const { id, name, value, img } = req.body;

      try {
        const propertyUpdate = await Properties.findByIdAndUpdate(
          id,
          {
            name,
            value,
            img,
          },
          { new: true }
        );
        console.log(propertyUpdate);
      } catch {
        res.status(400);
      }

      res
        .status(200)
        .json({ ok: true, message: "property update", updatedId: id });
    }

    if (req.method === "DELETE") {
      const { id } = req.query;
      console.log(id);

      await Properties.findByIdAndDelete(id);

      res
        .status(200)
        .json({ ok: true, message: "property deleted", deletedId: `${id}` });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      ok: false,
      error: "Internal server error",
    });
  }
}

//  try {
//     if (req.method === "GET") {
//       const { user, password } = req.query;
//       const admin = await Administrators.findOne({
//         user: user,
//         password: password,
//       });
//       if (!admin) {
//         return res.status(404).json({ message: "Admin not found" });
//       }
//       res.status(200).json(admin);
//     } else {
//       res.status(405).json({ message: "Method not allowed" });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
