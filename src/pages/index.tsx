import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { Card } from "@/components/card/Card";
import { getProperties } from "@/services/properties";

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

interface propertyProps {
  _id:string
  name: string,
  value: number,
  img: string
}


interface dataProperties {
  ok :string,
  miInfo: propertyProps[]
}


export default function Home() {
  const [dataProperties, setDataProperties] = useState({} as dataProperties);

  const [count, setCount] = useState(0);





  // const handleClick = async () => {
  //   const response = await getProperties();
  //   setDataProperties(response);
  // };

  useEffect(() => {
    // handleClick()
    const fechData = async () => {
      const response = await getProperties();
      setDataProperties(response);
    };
    fechData();
  }, []);

  // 0, "", undefinded, null, []

  console.log(dataProperties.miInfo);


  const handlseSave = () =>{
    //consumir su servicio

    // createPrperty({
    //   name: nameImput
    //   Value: valueImput
    //   img: imgInput
    // })

  }



  return (
    <div>
      <div>
        <div>Hola mundo</div>
        <div className="flex gap-2">
          {/* <MiButton text={"llamar endpoin"} icon={""} click={ handleClick } /> */}
          {/* <button onClick={handleClick}>llamar endpoint</button> */}
          <button
            onClick={() => {
              setCount(count + 1);
            }}
          >
            +1
          </button>
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

        {dataProperties.ok && (
          <div className="flex gap-2">
            {dataProperties.miInfo.map((property) => (
              <div key={property._id}>
                <div>{property.name}</div>
                <div>{property.value}</div>
                <img src={property.img} alt={property.name} />
              </div>
            ))}
          </div>
        )}
      </div>
      <div>

       
       <button onClick={handlseSave} >guardar propiedad</button>
      </div>
      <ToastContainer />
    </div>
  );
}
