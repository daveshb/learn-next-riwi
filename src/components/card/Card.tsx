import Image from "next/image";
import React from "react";

interface CardProps {
  color: "green" | "white" | "black" | string;
  title: string;
  imageUrl: string;
  description: string;
}

export const Card = ({ color, title, imageUrl, description }: CardProps) => {
  return (
    <div
      className={
        color === "green"
          ? "card card-green"
          : color === "white"
          ? "card card-white"
          : color === "black"
          ? "card card-black"
          : ""
      }
    >
      <div className="card__leftSide">
        <div className="card__leftSide--title font-bold">{title}</div>
        <div className="card__leftSide--subtitle">{description}</div>

        <div className="card__leftSide--link">
          <div className="card__leftSide--icon"></div>
          <div className="card__leftSide--text"></div>
        </div>
      </div>
      <div className="card__rightSide">
        {/* <Image className='card__rightSide--image' alt="asd"width={200} height={200} src={""}/> */}
        <img className="card__rightSide--image" alt="asd" src={imageUrl} />
      </div>
    </div>
  );
};
