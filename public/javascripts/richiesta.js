class Richiesta{

    constructor(citta, via, descrizione){
        this.citta = citta;
        this.via = via;
        this.descrizione = descrizione;
        this.stato = "Pendente";
    }

    getCittà(){
        return this.città;
    }

    getVia(){
        return this.via;
    }

    getDescrizione(){
        return this.descrizione;
    }

    static from(json){
        const e = Object.assign(new Richiesta(), json);
        return e;
    }

}

export default Richiesta;