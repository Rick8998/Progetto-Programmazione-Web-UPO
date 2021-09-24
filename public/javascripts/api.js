import Richiesta from "./richiesta.js";

class Api{
    /**
     * Get the list of requests
     */
    static getIndexRequests = async() =>{
        let response = await fetch('api/indexRequests');
        const requestsJson = await response.json();
        if(response.ok){
            return requestsJson.map((rq) => Richiesta.from(rq));
        }else throw requestsJson;
    }

    static getRequests = async() =>{
        let response = await fetch('api/userRequests');
        const requestsJson = await response.json();
        if(response.ok){
            return requestsJson.map((rq) => Richiesta.from(rq));
        }else throw requestsJson;
    }

    static getAdminRequests = async() =>{
        let response = await fetch('api/adminRequests');
        const requestsJson = await response.json();
        if(response.ok){
            return requestsJson.map((rq) => Richiesta.from(rq));
        }else throw requestsJson;
    }

    static adminLogin = async(username, password) =>{
        let response = await fetch('api/adminLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        if(response.ok){
            const username = await response.json();
            return username;
        }else{
            try{
                const errDetail = await response.json();
                throw errDetail.message;
            }catch(err){
                throw err;
            }
        }
    }

    static userLogin = async(username, password)=>{
        //console.log("Api userLogin")
        let response = await fetch('api/adminLogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        if(response.ok){
            const username = await response.json();
            return username;
        }else{
            try{
                const errDetail = await response.json();
                throw errDetail.message;
            }catch(err){
                throw err;
            }
        }
    }

    static doLogout = async () => {
        await fetch('api/session/current', {method : 'DELETE'})
    }


}

export default Api;