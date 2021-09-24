'use strict';

function createIndexSections(){
    return `
    <div id="interventionSearch">
        <div class="sectionsTitle shadow-lg p-3 mb-5 bg-body rounded"><b><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
      </svg> Ricerca interventi effettuati</b></div>
        <div class="d-flex interventionsForm" id="indexForm">
            <form method="GET">
                <input class="form-control" type="text" id="inputCittà" placeholder="Inserisci città" required>
                <input class="form-control" type="text" id="inputVia" placeholder="Via/Piazza/Viale" required>
                <button class="btn btn-success" id="generalUserSearch" type="submit">Search</button>
            </form>
        </div>
    </div>

    <div class="lavoriRecenti" id="recentWorks">
        <div class="sectionsTitle shadow-lg p-3 mb-5 bg-body rounded"><b><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16">
        <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/>
        <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/>
      </svg> Lavori recentemente soddisfatti</b></div>
        <div class="innerLavoriRecenti" id="displayRecentWorks"></div>
    </div>

    <div class="about-us" id="aboutUs">
        <div class="sectionsTitle shadow-lg p-3 mb-5 bg-body rounded"><b><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
      </svg> About Us</b></div>
        <div class="aboutUsDescription">
            <p>Questo progetto si pone il problema del danneggiamento delle infrastrutture, facendo in modo che gli utenti possano
                    segnalare la necessità di interventi di ristrutturazione.</p> 
            <p>La nostra società, verificata la disponibilità delle risorse, si farà carico della richiesta e si preoccuperà di:</p>
            <p>1) Contattare le autorità competenti per negoziare la concessione della possibilità di ristrutturare l'infrastruttura in questione</p>
            <p>2) Creare un team di lavoratori esperti che si recherà sul luogo per studiare la situazione e, successivamente, iniziare i 
            lavori</p>
            <p>L'utente dovrà quindi solo preoccuparsi di segnalare un problema, il resto verrà gestito da noi.</p>
            <p>Inoltre l'utente potrà monitorare costantemente le attività della nostra società.</p>
            <p> </p>
        </div>
    </div> `
}

export {createIndexSections};