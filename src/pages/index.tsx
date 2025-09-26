import { MiButton } from "@/components/button/Button";
import { ToastContainer } from "react-toastify";
import { CgAdidas } from "react-icons/cg";
import { useState } from "react";
import { notification } from "@/helpers/utils";
import { Car } from "lucide-react";
import { Card } from "@/components/card/Card";

export default function Home() {
  const [loader, setLoader] = useState(false);

  const handlerClick = () => {
    setLoader(true);

    setTimeout(() => {
      setLoader(false);
    }, 3000);
  };

  const aves = [
    {
      color: "green",
      title: "El condor",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSergtUzQGvnSQo7sLRRqvuKBG9Mw5Egen1FA&s",
      description: "El condor herido",
    },
    {
      color: "white",
      title: "un pajarito",
      imageUrl:
        "https://humanidades.com/wp-content/uploads/2017/03/pajaro-azul-e1563758291533.jpg",
      description: "El pajarito",
    },
    {
      color: "green",
      title: "guacamaya",
      imageUrl:
        "https://content.nationalgeographic.com.es/medio/2022/12/12/aves-1_0931d689_221212154441_1280x720.jpg",
      description: "guacamaya herida",
    },
    {
      color: "white",
      title: "El condor",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSergtUzQGvnSQo7sLRRqvuKBG9Mw5Egen1FA&s",
      description: "El condor herido",
    },
  ];

  return (
    <div>
      <div>
        <div>Hola mundo</div>
        <div className="flex gap-2">
          {/* <MiButton disabled text={"cancelar"} icon={"X"} click={ ()=>notification("ingreso al sistema","error",2000) } /> */}
        </div>
        <div className="flex gap-2">
          {aves.map((ave, index) => (
            <div key={index}>
              <Card
                title={ave.title}
                color={ave.color}
                imageUrl={ave.imageUrl}
                description={ave.description}
              />
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
