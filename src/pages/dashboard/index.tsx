import { MiButton } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Modal } from "@/components/modal/Modal";
import { MyContext } from "@/context/Context";
import { allowTerm } from "@/services/terms";
import { Button } from "@heroui/react";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const Dashboard = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClose = () => {
    console.log("close");
    setModalIsOpen(false);
  };

  const handleOpen = () => {
    console.log("clic en abrir ");
    setModalIsOpen(true);
  };

  const handleCancel = () => {
    console.log("cancel");
    setModalIsOpen(false);
  };

  const handleSave = () => {
    console.log("save");
    allowTerm()
    // llamado a un servicio
  };

  const router = useRouter();

  const { userLogged, setIsActive, isActive } = useContext(MyContext);

  console.log(userLogged);

  const handleClick = () => {
    console.log(userLogged);
    setIsActive(!isActive);
    router.back();
  };

  return (
    <>
      <div>Este es el dashboard</div>

      <Card
        color="green"
        title="prueba"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s"
        description="description"
      />

      <Card
        color="green"
        title="prueba"
        imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxOjFO7lJA-zaMBXBdEVh1yb_y38BBsnmv_w&s"
        description="description"
      >
        Aqui iba el button 1
        <MiButton text="bton" icon={"X"} />
      </Card>
      {/* <div>El ususario {userLogged.name} esta logueado</div> */}
      <Button onPress={handleClick} className="mt-7" color="danger">
        regresar
      </Button>

      <Button onPress={handleOpen} className="mt-7" color="primary">
        Abrir Modal
      </Button>

      <Modal
        title="Modal de prueba"
        onClose={handleClose}
        desc="la desc"
        onCancel={handleCancel}
        onSave={handleSave}
        isOpen={modalIsOpen}
      >
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos
          sequi itaque ut impedit saepe doloribus nemo, deserunt nobis inventore
          incidunt illo aut temporibus optio est. Modi nulla eveniet quis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos
          sequi itaque ut impedit saepe doloribus nemo, deserunt nobis inventore
          incidunt illo aut temporibus optio est. Modi nulla eveniet quis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos
          sequi itaque ut impedit saepe doloribus nemo, deserunt nobis inventore
          incidunt illo aut temporibus optio est. Modi nulla eveniet quis!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga quos
          sequi itaque ut impedit saepe doloribus nemo, deserunt nobis inventore
    
        </div>
      </Modal>
    </>
  );
};

export default Dashboard;
