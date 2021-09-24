'use strict';

function createUserLogin(){
    return `<ul class="accessStyle list-group ">
    <li class="list-group-item">
        <div class="loginTitleClass">
            <div class="pleaseLogin">Login tramite email e password</div>
        </div>
        <form id="loginForm">
            <div class="mb-3">
                <label class="form-label">Indirizzo Email</label>
                <input class="form-control" id="emailForm" type="email" placeholder="Email" required="">
                <div class="form-text" id="emailHelp">Non condivideremo la tua mail con nessuno</div>
            </div>
            <div class="mb-3" id="sectionId">
                <label class="form-label">Password</label>
                <input class="form-control" id="passwordForm" type="password" placeholder="Password" required="">
            </div>
            <div><button class="submitBtn btn btn-primary submitText" id="userLoginButton" type="submit">Login</button><a class="notRegistered" href="/register">Non sei registrato?</a></div>
        </form>
    </li>
</ul>`
}

function createAdminLogin(){
    return `<ul class="list-group accessStyle">
    <li class="list-group-item">
        <div>
            <div class="loginTitleClass">
                <div class="pleaseLogin">Per loggarti utilizza le credenziali che ti sono state affidate</div>
            </div>
            <form id="adminLogin">
                <div class="mb-3">
                    <label for="form-select">Nome</label>
                    <div class="mb-3">
                        <input class="form-control" type="text" id="inputCittà" placeholder="Nome o nickname dell'admin" required="">
                    </div>
                </div>
                <div class="mb-3" id="sectionId">
                    <label class="form-label" for="exampleInputPassword1">Id</label>
                    <input class="form-control" id="adminId" type="password" placeholder="Id dell'admin">
                </div>
                <button class="submitBtn btn btn-primary submitText" id="adminLoginButton" type="submit">Login</button>
            </form>
        </div>
    </li>
</ul>`
}

function createUserRegister(){
    return `<ul class="list-group">
    <li class="list-group-item">
        <div id = "registerDiv">
            <div class="loginTitleClass">
                <div class="pleaseLogin">Benvenuto, registrati!</div>
            </div>
            <form>
                <div>
                    <label class="form-label" for="registerName">Nome</label>
                    <input class="form-control" id="inputName" type="text" required="">
                    <label class="form-label" for="registerSurname">Cognome</label>
                    <input class="form-control" id="inputSurname" type="text" required="">
                </div>
                <div class="mb-3">
                    <label class="form-label" for="exampleInputEmail1">Indirizzo Email</label>
                    <input class="form-control" id="inputEmail" type="email" aria-describedby="emailHelp" required="">
                    <div class="form-text" id="emailHelp">Non condivideremo la tua mail con nessuno</div>
                </div>
                <div class="mb-3">
                    <label class="form-label" for="exampleInputPassword1">Password</label>
                    <input class="form-control" id="password" type="password" required=""></div>
                <div class="mb-3" id="divConfermaPassword">
                    <label class="form-label" for="exampleInputPassword1">Conferma password</label>
                    <input class="form-control" id="confermaPassword" type="password" required="">
                </div>
                <button class="submitBtn btn btn-primary submitText" id="userRegister" type="submit">Register</button>
            </form>
        </div>
    </li>
</ul>`
}

export {createUserLogin, createAdminLogin, createUserRegister};