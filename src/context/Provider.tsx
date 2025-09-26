import { JSX, useState } from "react";
import { MyContext } from "./Context";

interface props {
  children: JSX.Element | JSX.Element[];
}

export const Provider = ({ children }: props) => {
  const [notificationState, setnotificationState] = useState("");

  return (
    <MyContext.Provider
      value={{
        notificationState,
        setnotificationState,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
