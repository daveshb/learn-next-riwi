// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Users = {
    name: string,
    age:number
};

type UsersResponse ={
  users:  Users[]
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsersResponse>,
) {


  
  const users = [
    {name: "Juan", age: 33},
    {name: "Camila", age: 22},
    {name: "Carlos", age: 26},
    {name: "otro Juan", age: 22},
  ]

  console.log("console.log desde el back")


  res.status(200).json({  users });
}
