'use strict'

const { response } = require('express');
const bcrypt = require('bcrypt');
// DAO (Data Access Object) module for accessing users and requests
const sqlite = require('sqlite3');
const db = new sqlite.Database('project.db', (err)=>{
    
    if(err) throw err;
    else console.log("Connected to DB");
    //Query per verificare il DB
    
    /*const sql = 'SELECT * FROM richieste';
        db.all(sql, (err, rows) => {
          if (err) {
            reject(err);
            return;
          } 

          const courses = rows.map((e) => (
            {
                citta: e.citta, 
                via: e.via, 
                descrizione: e.descrizione, 
                stato: e.stato
              }
          ));
              console.log(courses);
        });*/

});

/* Get all requests, for index only */

exports.getRequests = function(){
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM richieste";
        db.all(sql, (err, rows) => {
          if (err) {
            reject(err);
            return;
          }
    
          const courses = rows.map((e) => (
              {
                  citta: e.citta, 
                  via: e.via, 
                  descrizione: e.descrizione, 
                  stato: e.stato
                }
            ));
            //console.log(courses);
          resolve(courses.reverse());
        });
      });
}

exports.getIndexRequests = function(){
  return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM richieste WHERE stato = 'Soddisfatta'";
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
  
        const courses = rows.map((e) => (
            {
                citta: e.citta, 
                via: e.via, 
                descrizione: e.descrizione, 
                stato: e.stato
              }
          ));
          //console.log(courses);
        resolve(courses.reverse());
      });
    });
}

exports.getAdminRequests = function(){
  return new Promise((resolve, reject) => {
      const sql = "SELECT * FROM richieste";
      db.all(sql, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
  
        const courses = rows.map((e) => (
            {
                citta: e.citta, 
                via: e.via, 
                descrizione: e.descrizione, 
                stato: e.stato
              }
          ));
          //console.log(courses);
        resolve(courses.reverse());
      });
    });
}

exports.getIndexSearchRequest = function(elements){
    return new Promise((resolve, reject) => {
        const sql = "SELECT citta, via, descrizione, stato FROM richieste WHERE (citta=? AND via=?);";
        
        db.all(sql, [elements.citta, elements.via], (err, rows) => {
          //console.log(sql);
          if (err) {
            reject(err);
            return;
          }
    
          const selectedItems = rows.map((e) => (
              {
                  citta: e.citta, 
                  via: e.via, 
                  descrizione: e.descrizione, 
                  stato: e.stato
                }
            ));
            //console.log(selectedItems);
          resolve(selectedItems);
        });
    })
}

exports.userPostRequest = function(bodyParams){
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO richieste (citta, via, descrizione, stato) VALUES (?, ?, ?, ?);";
    db.run(sql, [bodyParams.citta, bodyParams.via, bodyParams.descrizione, bodyParams.stato], (err) => {
      if (err) {
        //console.log("ERR --> "+err);
        reject(err);
        return;
      }
      resolve();
    });
  })
}

exports.comuneUpdateRequest = function(bodyParams){
  return new Promise((resolve, reject) => {
    //sql da gestire tramite query parametrica
    const sql = "UPDATE richieste SET stato='"+bodyParams.stato+"' WHERE citta='"+bodyParams.citta+"' AND via='"+bodyParams.via+"';";
    db.run(sql, (err) => {
      if (err) {
        //console.log("ERR --> "+err);
        reject(err);
        return;
      }
      resolve();
    });
  })
}

exports.getAdmin = function(nome, adminId){
  return new Promise((resolve, reject) => {
    //sql da gestire tramite query parametrica
    const sql = "SELECT * FROM admin WHERE (nome = ? AND id =?);";
    db.get(sql, [nome , adminId],(err, row) => {
      //console.log(sql)
      if (err) {
        //console.log("ERR --> "+err);
        reject(err);
      }
      else if(row == undefined){
        resolve({error:'User not found'});
      }
      else{
        //console.log(row.città)
        const admin = {nome: row.nome};
        //console.log("DAO "+admin.nome);
        let check = false;
        //if(bcrypt.compareSync(adminId, row.adminId)){
          check = true;
        //}
        resolve({admin, check})
      }
    });
  })
}

exports.getUser = function(username, password){
  return new Promise((resolve, reject) => {
    //console.log(username + " dao "+password)
    //sql da gestire tramite query parametrica
    const sql = "SELECT * FROM utenti WHERE (email = ? AND password =?);";
    db.get(sql, [username , password],(err, row) => {
      //console.log(sql)
      if (err) {
        //console.log("ERR --> "+err);
        reject(err);
      }
      else if(row == undefined){
        resolve({error:'User not found'});
      }
      else{
        //console.log(row.città)
        const admin = {nome: row.nome};
        //console.log("DAO "+comune);
        let check = false;
        //if(bcrypt.compareSync(adminId, row.adminId)){
          check = true;
        //}
        resolve({admin, check})
      }
    });
  })
}

exports.getAdminById = function(adminId){
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM admin WHERE id = ?';
    db.get(sql, [adminId], (err, row) => {
        if (err) 
            reject(err);
        else if (row === undefined)
            resolve({error: 'User not found.'});
        else {
            const user = {id: row.id, citta:row.citta};
            resolve(user);
        }
    });
});
};

exports.newuser = function(userParams){
  return new Promise((resolve, reject) => {
    const sql = 'INSERT INTO utenti (nome, cognome, email, password) VALUES (?, ?, ?, ?);';
    db.run(sql, [userParams.nome, userParams.cognome, userParams.email, userParams.psw], (err, row) => {
      if (err) {
        //console.log("ERR --> "+err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}