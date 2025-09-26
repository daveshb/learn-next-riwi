
import { createContext } from "react";


export type contextProps = {
    
    notificationState: string;
    setnotificationState: (notificationState:string) => void;

   
};

export const MyContext = createContext<contextProps>({} as contextProps);