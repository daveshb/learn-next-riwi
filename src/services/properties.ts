import axios from "axios";


export const getProperties = async () => {
  const response = await axios.get("http://localhost:3000/api/properties");
  return response.data.miInfo
};

export const createProperty = async () => {
  const response = await axios.post("http://localhost:3000/api/properties",{
    
  });
  return response.data.miInfo
};
