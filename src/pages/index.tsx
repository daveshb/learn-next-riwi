import { CircleCheckBig, Ban } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Products {
  name: string;
  price: number;
  description: string;
  amount: number;
  isActive: boolean;
  img?: string
}

export default function Home() {
  const [state, setState] = useState(false);

  const handleClick = () => {
    setState(!state);
  };

  const products: Products[] = [
    {
      name: "moto",
      price: 3000,
      description: "yamaha mt-09",
      amount: 10,
      isActive: true,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQSkw2nEjil00Y_Vuw3j9JiDtAcjzol3Mfkw&s"
    },
    {
      name: "moto2",
      price: 5000,
      description: "yamaha mt-07",
      amount: 5,
      isActive: false,
      img: "https://cdn.pixabay.com/photo/2023/03/16/08/42/camping-7856198_640.jpg"
    },
    {
      name: "moto3",
      price: 7000,
      description: "yamaha la 80",
      amount: 8,
      isActive: false,
      img: "https://i.blogs.es/c7b68e/chatgpt-studio-ghibli-portada/500_333.jpeg"
    },
    {
      name: "moto4",
      price: 300,
      description: "yamaha crypton",
      amount: 2,
      isActive: false,
    },
    {
      name: "moto5",
      price: 250,
      description: "yamaha szr",
      amount: 100,
      isActive: true,
    },
    {
      name: "moto6",
      price: 2344,
      description: "yamaha dt-125",
      amount: 17,
      isActive: true,
    },
  ];

  console.log(products);

  return (
    <div>
      <div>Hola mundo</div>
      <div>Hola mundo 2</div>
      <button onClick={handleClick} className="bg-blue-700 miButton">
        cambiar estado
      </button>
      <div>
        {state && (
          <ul className="list">
            {products?.map((product, index) => (
              <li className="list-item" key={index}>
                <div>Nombre de la moto es:{product.name}</div>
                <div>El valor es:{product.price}</div>
                <div className="list-isActive">
                  Disponible: {product.isActive ? <CircleCheckBig /> : <Ban />}
                </div>
                <div>la cantidad disponible es: {product.amount}</div>
                {product.img && (
                  <img src={product.img} alt={product.name}></img>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
