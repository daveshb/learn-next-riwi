import axios from "axios";


const url = 'http://localhost:3000/api/'


export const getProperties = async () => {
  const response = await axios.get(`${url}properties`);
  return response.data.data
};

export const createProperty = async () => {
  const response = await axios.post(`${url}properties`,{
    
  });
  return response.data.miInfo
};
