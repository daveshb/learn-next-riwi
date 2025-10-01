





















// import axios from "axios";

// export async function getProperties() {
//   try {
//     const response = await axios.get("http://localhost:3000/api/properties");
//     return response.data;
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (error: any) {
//     console.error("Error fetching properties:", error);
//     throw error;
//   }
// }














export class userServices {

    url:string = 'http://localhost:3000/api/users';
    
    // constructor(

    // )
    async getUsers(){
        const result = await fetch(`${this.url}`)
        return result
    }
    async postUser(){
        const result = await fetch(`${this.url}`,{
            method:'POST'
        })
        return result
    }

}