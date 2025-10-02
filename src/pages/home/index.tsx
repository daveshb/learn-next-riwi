import { useState } from "react";

const Dashboard = () => {

  const [inputName, setInputName] = useState('')



  return (
    <>
      <div className="h1">Dashboard</div>
      <label>Nombre</label>
      <input onChange={(e)=>{setInputName(e.target.value)}}/>
    </>
  );
};

export default Dashboard;
