import { useState } from "react";

type values = number;

export default function Home() {
  
  function fizzBuzz(limit: number): void {
    for (let i = 1; i <= limit; i++) {
      if (i % 3 === 0 && i % 5 === 0) {
        console.log("FizzBuzz");
      } else if (i % 3 === 0) {
        console.log("Fizz");
      } else if (i % 5 === 0) {
        console.log("Buzz");
      } else {
        console.log(i);
      }
    }
  }

  fizzBuzz(200);
  
  const [result, setResult] = useState(0);  

  const handleClick = () => {
    const laSuma = sumar(10, 50);

    setResult(laSuma);
  };

  const sumar = (a: values, b: values): values => {
    return a + b;
  };

  console.log(result)

  return (
    <div>
      <div>Hola mundo</div>
      <div>Hola mundo 2</div>
      <button onClick={handleClick} className="bg-blue-700 miButton">
        Sumar y mostrar
      </button>
      <div>{JSON.stringify(result)}</div>
    </div>
  );
}
