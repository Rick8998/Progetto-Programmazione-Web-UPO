import Api from './api.js';
import {createUserNavbar, createIndexnavbar} from './templates/navbar-tmplt.js';
import { createSingleRequest, createComuneRequestPendente, createComuneRequestSoddisfatta} from './templates/request-tmpl.js';
import { createUserSections,insertrequestSuccess} from './templates/userPage-tmplt.js';
import { createIndexSections } from './templates/index-tmpl.js';
import { createComuneSections } from './templates/comunePage-tmplt.js';
import { createUserLogin, createAdminLogin, createUserRegister } from './templates/access-tmpl.js';
import { nullError, indexNullResponse, userRequestAlreadyInDB, errorInDB, loginError, adminLoginError, notLogged } from './templates/error-tmpl.js';
import Richiesta from "./richiesta.js";
import page from '//unpkg.com/page/page.mjs';

class App{
    constructor(navbar, innerDiv){
        this.innerDiv = innerDiv;
        this.navbar = navbar;

        page('/', ()=>{
            navbar.innerHTML = '';
            innerDiv.innerHTML = '';
            navbar.insertAdjacentHTML('beforeend', createIndexnavbar());
            innerDiv.insertAdjacentHTML('beforeend', createIndexSections());
            this.indexShowRequests();
            //event listener per la ricerca nella pagina iniziale
            document.getElementById("generalUserSearch").addEventListener("click", async event =>{
                event.preventDefault();
                this.indexSearch(event);
            });
        });
        page('/user', ()=>{
            //generazione della pagina dell'utente
            navbar.innerHTML = '';
            innerDiv.innerHTML = '';
            navbar.insertAdjacentHTML('beforeend', createUserNavbar());
            innerDiv.insertAdjacentHTML('beforeend', createUserSections());
            this.showUserRequests();
            document.getElementById("userRequestsubmit").addEventListener("click", async event =>{
                event.preventDefault();
                this.userNewRequest(event);
            })
           
        });
        page('/userLogin', ()=>{
            //generazione della pagina del login per l'utente
            navbar.innerHTML = '';
            innerDiv.innerHTML = '';
            innerDiv.insertAdjacentHTML('beforeend', createUserLogin());
            document.getElementById("userLoginButton").addEventListener("click", async event =>{
                event.preventDefault();
                this.userLogin();
            })
        });
        page('/admin', ()=>{
            //generazione della pagina dell'admin
            navbar.innerHTML = '';
            innerDiv.innerHTML = '';
            navbar.insertAdjacentHTML('beforeend', createUserNavbar());
            innerDiv.insertAdjacentHTML('beforeend', createComuneSections());
            this.adminGetRequests();
        });
        page('/adminLogin', ()=>{
            //generazione della pagina del login per l'admin
            navbar.innerHTML = '';
            innerDiv.innerHTML = '';
            innerDiv.insertAdjacentHTML('beforeend', createAdminLogin());
            document.getElementById("adminLoginButton").addEventListener("click", async event =>{
                event.preventDefault();
                this.adminLogin();
            })
        });
        page('/register', ()=>{
            //generazione della pagina per la registrazione
            navbar.innerHTML = '';
            innerDiv.innerHTML = '';
            innerDiv.insertAdjacentHTML('beforeend', createUserRegister());
            document.getElementById("userRegister").addEventListener("click", async event =>{
                event.preventDefault();
                this.userRegister();
            })
        });
        page('/logout', async()=>{
            await Api.doLogout();
            page.redirect('/');
        });
        page();
    }

    showUserRequests = async() =>{
        const requests = await Api.getRequests();
        //this.innerDiv.innerHTML = createRequestsSection();
        const requestsSection = document.getElementById("userDisplayrequest");

        for(let request of requests){
            const singleRequest = createSingleRequest(request);
            requestsSection.insertAdjacentHTML('beforeend', singleRequest);
        }
    }

    adminLogin= async()=>{
        const citta = document.getElementById("inputCittà").value;
        const adminId = document.getElementById("adminId").value
        try{
            //NB: devi passare all'API lo username e la password prendendoli dall html
            const admin = await Api.adminLogin(citta, adminId);
            //se il login ha successo --> redirect sulla pagina dell'admin
            page.redirect('/admin');
        }catch(error){
            if(error){
                if(document.getElementById("loginErr") == undefined){
                    const errMsg = adminLoginError();
                    const loginErr = document.getElementById("innerDiv");
                    loginErr.insertAdjacentHTML('afterend', errMsg);
                    setTimeout(function(){
                        let generalDivRef = document.getElementById("generalDiv");
                        generalDivRef.removeChild(document.getElementById("loginErr"));
                    }, 1000);
                }
            }
        }
       
    }

    userLogin = async()=>{
        const email = document.getElementById("emailForm").value;
        const psw = document.getElementById("passwordForm").value
        try{
            //NB: devi passare all'API lo username e la password prendendoli dall html
            //console.log("userLogin");
            const user = await Api.userLogin(email, psw);
            //se il login ha successo --> redirect sulla pagina dello user
            page.redirect('/user');
        }catch(error){
            if(error){
                if(document.getElementById("loginErr") == undefined){
                    const errMsg = loginError();
                    const loginErr = document.getElementById("innerDiv");
                    loginErr.insertAdjacentHTML('afterend', errMsg);
                    setTimeout(function(){
                        let generalDivRef = document.getElementById("generalDiv");
                        generalDivRef.removeChild(document.getElementById("loginErr"));
                    }, 1000);
                }
            }
        }
    }

    adminGetRequests = async()=>{
        const requests = await Api.getAdminRequests();
        const requestsPendentiSection = document.getElementById("pendenti");
        const requestSoddisfattaSection = document.getElementById("soddisfatte");

        for(let request of requests){
            if(request.stato == "Pendente"){
                const singleRequest = createComuneRequestPendente(request);
                requestsPendentiSection.insertAdjacentHTML('beforeend', singleRequest);                
            }else if(request.stato == "Soddisfatta"){
                const singleRequest = createComuneRequestSoddisfatta(request);
                requestSoddisfattaSection.insertAdjacentHTML('beforeend', singleRequest);
            }
        }
        const userBtns = document.querySelectorAll('.userBtn');
        for(let i = 0; i < userBtns.length; i++){
            userBtns[i].addEventListener('click', this.comuneRequestHandler.bind(this));
        }
    }

    indexShowRequests = async() =>{
        const requests = await Api.getIndexRequests();

        const requestsSection = document.getElementById("displayRecentWorks");
        let i = 0
        for(let request of requests){
            const singleRequest = createSingleRequest(request);
            requestsSection.insertAdjacentHTML('beforeend', singleRequest);
            i++;
            //mostro solo 2 lavori recenti
            if(i==3){
                break;
            }
        }
    }

    indexSearch = async event =>{
        let inputCity = document.getElementById("inputCittà").value.toLowerCase();
        /*Maiuscolo per la prima lettera di ciascuna parola (è lo standard del DB)*/
        const city = inputCity.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase()); 
        let inputVia = document.getElementById("inputVia").value.toLowerCase();
        /*Maiuscolo per la prima lettera di ciascuna parola (è lo standard del DB)*/
        const via = inputVia.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        if(city == '' || via == ''){
            //funzione nel template che mostra messaggio di errore
            const interventionSearchSection = document.getElementById("indexForm");
            if(document.getElementById("nullError") == undefined){
                const indexError = nullError();
                interventionSearchSection.insertAdjacentHTML('beforebegin', indexError);
            }
            setTimeout(function(){
                let generalDivRef = document.getElementById("interventionSearch");
                generalDivRef.removeChild(document.getElementById("nullError"));
            }, 1500);
            return;
        }else{
            let url = new URL('/indexSearch', 'http://localhost:3000/'),
                params = {citta:city, via:via}
            Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
            let response = await fetch(url, {
                method : 'GET',
                headers :{
                    'Content-Type': 'application/json',
                },
            })
            const requestsJson = await response.json();
            if(requestsJson[0] == null){
                const interventionSearchSection = document.getElementById("indexForm");
                if(document.getElementById("nullResponse") == undefined){
                    if(document.getElementById("nullError") != undefined){
                        document.getElementById("nullError").remove();
                    }
                    const nullResponse = indexNullResponse();
                    interventionSearchSection.insertAdjacentHTML('beforebegin', nullResponse);
                    setTimeout(function(){
                        let generalDivRef = document.getElementById("interventionSearch");
                        generalDivRef.removeChild(document.getElementById("nullResponse"));
                    }, 1500);
                }
            }else if(response.ok){
                if(document.getElementById("nullError") != undefined){
                    document.getElementById("nullError").remove();
                }
                if(document.getElementById("nullResponse") != undefined){
                    document.getElementById("nullResponse").remove();
                }
                
                let indexRequests = requestsJson.map((rq) => Richiesta.from(rq));
                //mostro, usando il template, la/le richieste ottenute
                const interventionSearchSection = document.getElementById("interventionSearch");
                for(let request of indexRequests){
                    const singleRequest = createSingleRequest(request);
                    interventionSearchSection.insertAdjacentHTML('beforeend', singleRequest);
                }
            }else throw requestsJson;            
        }
    }

    userNewRequest = async event=>{
        //console.log("pippo");
        let inputCity = document.getElementById("inputCittà").value.toLowerCase();
        let city = inputCity.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        if(city.includes("'")){
            city = city.replace("'", " ");
        } 
        let inputVia = document.getElementById("inputVia").value.toLowerCase();
        let via = inputVia.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
        if(via.includes("'")){
            via = via.replace("'", " ");
        }
        let inputDescrizione = document.getElementById("inputDescrizione").value;
        const submitReqSection = document.getElementById("formRequest");
        if(inputCity == '' || inputVia == '' || inputDescrizione == ''){
            if(document.getElementById("nullError") == undefined){
                const indexError = nullError();
                submitReqSection.insertAdjacentHTML('beforebegin', indexError);
            }
            setTimeout(function(){
                let generalDivRef = document.getElementById("requestSubmitSection");
                generalDivRef.removeChild(document.getElementById("nullError"));
            }, 1500);
            return;
        }else{
            const request = {
                citta : city,
                via : via,
                descrizione : inputDescrizione,
                stato : "Pendente"
            }
            let response = (await fetch("/userPost", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            }))
            
            if(response.ok){
                //console.log("Tuttto ok");
                if(document.getElementById("nullResponse") != undefined){
                    document.getElementById("nullResponse").remove();
                }
                const requestInsert = insertrequestSuccess();
                if(document.getElementById("requestInsert") == undefined){
                    submitReqSection.insertAdjacentHTML('beforebegin', requestInsert);
                }
                document.getElementById("userDisplayrequest").innerHTML = '';
                this.showUserRequests();
                //console.log("Ok return");
                return;
            } else if(response.status == 401){
                if(document.getElementById("requestInsert") != undefined){
                    document.getElementById("requestInsert").remove();
                }

                const notLoggedIn = notLogged();
                submitReqSection.insertAdjacentHTML('beforebegin', notLoggedIn);
            }else if(response.status < 200 || response.status > 299){
                if(document.getElementById("requestInsert") != undefined){
                    document.getElementById("requestInsert").remove();
                }
                //console.log("Richiesta già presente...");
                const requestAlreadyInDB = userRequestAlreadyInDB();
                submitReqSection.insertAdjacentHTML('beforebegin', requestAlreadyInDB);
                setTimeout(function(){
                    let generalDivRef = document.getElementById("requestSubmitSection");
                    generalDivRef.removeChild(document.getElementById("nullResponse"));
                }, 2000);
                //console.log("Err return");
                return;
            }
        }
    }

    comuneRequestHandler = async event => {
        var stato;
        const citta = event.target.parentNode.getElementsByClassName("classeCittà")[0].innerHTML.replace("Città: ", "").trim();
        const via = event.target.parentNode.getElementsByClassName("classeVia")[0].innerHTML.replace("Via/Viale/Piazza: ", "").trim();
        const descrizione = event.target.parentNode.getElementsByClassName("classeDescrizione")[0].innerHTML.replace("Descrizione: ", "").trim();
        if(event.target.parentNode.getElementsByClassName("selectGestioneRichiesta")[0].value == "Soddisfatta"){
            stato = "Soddisfatta";
        } else if(event.target.parentNode.getElementsByClassName("selectGestioneRichiesta")[0].value == "Rifiuta"){
            stato = "Rifiutata";
        }
        
        if(event.target.parentNode.getElementsByClassName("selectGestioneRichiesta")[0].value !== "In Osservazione"){
            const request = {
                citta : citta,
                via : via,
                descrizione : descrizione,
                stato : stato
            }
    
            let response = (await fetch("/comuneUpdate", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(request)
            }))
            if(response.ok){
                this.navbar.innerHTML = '';
                this.innerDiv.innerHTML = '';
                this.navbar.insertAdjacentHTML('beforeend', createUserNavbar());
                this.innerDiv.insertAdjacentHTML('beforeend', createComuneSections());
                this.adminGetRequests();
            }else if(response.status < 200 || response.status > 299){
                const requestsPendentiSection = document.getElementById("pendenti");
                const errorDb = errorInDB();
                requestsPendentiSection.insertAdjacentHTML('beforeend', errorDb);
            }
        }
        
    }

    userRegister = async event =>{
        const nome = document.getElementById("inputName").value;
        const cognome = document.getElementById("inputSurname").value;
        const email = document.getElementById("inputEmail").value;
        const psw = document.getElementById("password").value;
        const confermaPsw = document.getElementById("confermaPassword").value;
        if(nome == '' || cognome == '' || email == '' || psw =='' || confermaPsw == ''){
            const registerDiv = document.getElementById("registerDiv");
            if(document.getElementById("nullError") == undefined){
                console.log("eee")
                const nullErrorRegister = nullError();
                registerDiv.insertAdjacentHTML('beforeend', nullErrorRegister);
            }
            return;
        }
        if(psw == confermaPsw){
            //console.log("Ok");
            const utente = {
                nome : nome,
                cognome : cognome,
                email : email,
                psw : psw,
            }

            let response = (await fetch("/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(utente)
            }))
            if(response.ok){
                page.redirect('/userLogin');
            }else if(response.status < 200 || response.status > 299){
                const registerDiv = document.getElementById("registerDiv");
                const errorDb = errorInDB();
                registerDiv.insertAdjacentHTML('beforeend', errorDb);
            }
        }
        
    }
}

export default App;