import { MyContext } from "@/context/Context";
import { Button } from "@heroui/react";
import { useRouter } from "next/router";
import { useContext } from "react";

const Dashboard = () => {
  const router = useRouter();

  const { userLogged, setIsActive, isActive } = useContext(MyContext);

  console.log(userLogged)

  const handleClick = () => {
    console.log(userLogged)
    setIsActive(!isActive)
    router.back();
  };

  return (
    <>
      <div>Este es el dashboard</div>
      <div>El ususario {userLogged.name} esta logueado</div>
      <Button onPress={handleClick} className="mt-7" color="danger">
        regresar
      </Button>
    </>
  );
};

export default Dashboard;
