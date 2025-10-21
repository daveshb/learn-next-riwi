import React from "react";
interface CardProps {
  color: "green" | "white" | "black";
  title: string;
  imageUrl: string;
  description: string;
  children?: React.ReactNode
}

export const Card = ({ color, title, imageUrl, description, children }: CardProps) => {
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
      <div>
        {children}
      </div>
        <div className="card__leftSide--title font-bold">{title}</div>
        <div className="card__leftSide--subtitle">{description}</div>
      </div>
      <div className="card__rightSide">
        <img className="card__rightSide--image" alt="asd" src={imageUrl} />
      </div>
    </div>
  );
};
