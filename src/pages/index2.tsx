export default function Home() {


    class Coder {
    nombre: string;
    edad: number;

    constructor(nombre: string, edad: number) {
      this.nombre = nombre;
      this.edad = edad;
    }

    saludar() {
      return `Hola, mi nombre es ${this.nombre} y tengo ${this.edad} años.`;
    }
  }

  const coder1 = new Coder("Juan", 25);
  console.log(coder1.saludar());


  class Estudiante extends Coder {
  grado: string;

  constructor(nombre: string, edad: number, grado: string) {
    super(nombre, edad);
    this.grado = grado;
  }

  mostrarGrado() {
    return `${this.nombre} está en el grado de ${this.grado}.`;
  }
}

const estudiante1 = new Estudiante("Carlos", 20, "Ingeniería");
console.log(estudiante1.saludar());
console.log(estudiante1.mostrarGrado());



  return (
    <div>
      <div>Hola mundo</div>
      <div>Hola mundo 2</div>
    </div>
  );
}
