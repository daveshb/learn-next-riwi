import { ToastContainer } from "react-toastify";
import { Button, Input } from "@heroui/react";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { notification } from "@/helpers/utils";
import { MyContext } from "@/context/Context";

const userLogueado = {
  name: "david",
  role: "admin",
  isActive: true,
  date: "24/12/2025",
};

export default function Home() {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const { setUserLogged, setIsActive, isActive } = useContext(MyContext);

  const router = useRouter();

  const handleClick = async () => {
    if (user === "david" && pass === "123456") {
      setUserLogged(userLogueado);
      notification("login exitoso", "success");
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex items-center">
      <div className="max-w-3/6">
        <div>Login</div>

        <label>User</label>
        <Input
          label="User"
          placeholder="Enter your user"
          type="text"
          onChange={(e) => {
            setUser(e.target.value);
          }}
        />

        <label>User</label>
        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          onChange={(e) => {
            setPass(e.target.value);
          }}
        />

        <Button onPress={handleClick} className="mt-7" color="primary">
          Login
        </Button>

        <Button
          onPress={() => {
            setIsActive(!isActive);
          }}
          className="mt-7"
          color="primary"
        >
          Login
        </Button>

        {isActive ? <div>Esta activo</div> : <div>Esta desactivado</div>}
      </div>
    </div>
  );
}
