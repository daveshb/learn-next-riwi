/* eslint-disable @next/next/no-img-element */
import { products } from "@/constant/products";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Products = () => {

  const router = useRouter();

  const handleDetails = (id: number) => {
    console.log(id);
    router.push(`/products/${id}`)
  };

  return (
    <div className=" p-10 w-70 gap-2 flex flex-col ">
      {products.map((product) => (
        <Card className="py-4" key={product.id}>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <p className="text-tiny uppercase font-bold">{product.name}</p>
            <small className="text-default-500">amount: {product.amount}</small>
            <h4 className="font-bold text-large">price: {product.price}</h4>
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <img
              alt="Card background"
              className="object-cover rounded-xl"
              src={product.img}
              width={200}
              height={200}
            />
            <Button onPress={() => handleDetails(product.id)} className="mt-2">
              Mas detalles
            </Button>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Products;
