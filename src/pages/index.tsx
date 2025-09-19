import { Users } from "@/dto";
import { userServices } from "@/services/users";
import { useState } from "react";
// crear en html con atributo onClick => llama funcion local del componente, puede ser llamda handleClick, instancie una clase y use un metodo getUsers => previamente debe crear una clase dentro de una carpeta llamada services/users.ts, crea la clase, agrega un atributo con la base url, y crea metodos que llamen al backend con un fetch => el backend debe tener un handler que retorne algo 

export default function Home() {
  const [usersList, setUsersList] = useState<Users[]>([]);

  const handleClick = async () => {
    const userClass = new userServices();
    const users = userClass.getUsers();

    users
      .then((data) => data.json())
      .then((response) => {
        console.log(response.users);
        setUsersList(response.users);
      });
  };

  console.log(usersList);

  return (
    <div>
      <div>
        <div>Hola mundo</div>
        <button onClick={handleClick}> obtener users</button>
        <div>
          {usersList.map((item, index) => (
            <div key={index}>
              <div>{item.name}</div>
              <div>{item.age}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
