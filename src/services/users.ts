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