import { products } from "@/constant/products";
import { useRouter } from "next/router";
import React from "react";

const Details = () => {
  console.log(products);

  const router = useRouter();

  const { id } = router.query;

  const miElemento = products.find((product) => product.id === Number(id));

  return (
    <div>
      {miElemento && (
        <>
          <div className="div">{miElemento.name}</div>
          <div className="div">{miElemento.price}</div>
          <div className="div">{miElemento.amount}</div>
        </>
      )}
    </div>
  );
};

export default Details;
