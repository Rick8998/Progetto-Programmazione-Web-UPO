'use strict';

function nullError(){
    return `<div class="indexError" id="nullError">Attenzione, non sono ammessi valori nulli!</div>`;
}

function indexNullResponse(){
    return `<div class="indexError" id="nullResponse">Nessuna richiesta corrisponde ai parametri inseriti</div>`;
}

function userRequestAlreadyInDB(){
    return `<div class="indexError" id="nullResponse">Richiesta già presente</div>`;
}

function errorInDB(){
    return `<div class="indexError" id="errorDB">Qualcosa è andato storto...</div>`;
}

function loginError(){
    return `<div class="indexError" id="loginErr">Password o email non validi</div>`;
}

function adminLoginError(){
    return `<div class="indexError" id="loginErr">Nome o Id non validi</div>`;
}

function notLogged(){
    return `<div class="indexError" id="notLogged">Devi essere loggato per fare una richiesta</div>`;
}
export {nullError, indexNullResponse, userRequestAlreadyInDB, errorInDB, loginError, adminLoginError, notLogged}; 