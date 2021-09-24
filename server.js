const express = require('express');
const path = require('path');
const morgan = require('morgan');
const dao = require('./dao.js');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session')
const { rejects } = require('assert');
const exp = require('constants');

var app = express();
const port = 3000;

// set up the middleware
app.use(morgan('tiny'));

// set up the 'public' component as a static website
app.use(express.static('public'));

// every requests body will be considered as in JSON format
app.use(express.json());

passport.use(new LocalStrategy(
    function(username, password, done) {
        
        if(password == parseInt(password, 10)){
            dao.getAdmin(username, password).then(({admin, check}) => {
                //console.log(comune);
                if (!admin) { return done(null, false, {message:'Incorrect Username'}); }
                if (!check) { return done(null, false, {message:'Incorrect password'}); }
                return done(null, admin);
            });
        }else{
            dao.getUser(username, password).then(({admin, check}) => {
                //console.log(comune);
                if (!admin) { return done(null, false, {message:'Incorrect Username'}); }
                if (!check) { return done(null, false, {message:'Incorrect password'}); }
                return done(null, admin);
            });
        }
    }
));

app.use(session({
    secret : "mySecretPhrase",
    resave : false,
    saveUninitialized : false
}))

passport.serializeUser(function(admin, done) {
    //console.log(comune.citta + " " + comune.comune)
    done(null, admin.nome);
});

passport.deserializeUser(function(id, done) {
    dao.getAdminById(id).then(admin => {
        done(null, admin);
    });
});

app.use(passport.initialize());
app.use(passport.session());

const isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    return res.status(401).json({"statusCode" : 401, "message" : "not authenticated"});
}
  
app.post('/userPost', isLoggedIn, (req, res, next) =>{
    console.log(req.body);
    if(req.body.citta != null && req.body.via != null && req.body.descrizione != null ){
        dao.userPostRequest(req.body)
        .then(()=>{
            //console.log("then " + res.statusCode);
            res.status(200).send();
        })
        .catch((error)=>{
            //console.log("catch " + res.statusCode);
            res.status(500).send();
            res.end();
        })
    }
    
})

app.post('/api/adminLogin', function(req, res, next){
    passport.authenticate('local', function(err, admin, info){
        if(err){return next(err)}
        //console.log(comune);
        //console.log(admin)
        if(!admin){
            return res.status(401).json(info);
        }
        req.login(admin, function(err){
            if(err){return next(err);}
            //console.log(admin.nome);
            return res.json(admin.nome);
        });
    })(req, res, next);
});

app.post('/api/userLogin', function(req, res, next){
    console.log(req.body)
    passport.authenticate('local', function(err, admin, info){
        if(err){return next(err)}
        //console.log(comune);
        if(!admin){
            return res.status(401).json(info);
        }
        req.login(admin, function(err){
            if(err){return next(err);}
            //console.log(admin.nome);
            return res.json(admin.nome);
        });
    })(req, res, next);
});

app.post('/register', function(req, res){
    //console.log(req.body)
    if(req.body != null){
        dao.newuser(req.body)
        .then(()=>{
            //console.log("then " + res.statusCode);
            res.status(200).send();
        })
        .catch((error)=>{
            //console.log("catch " + res.statusCode);
            res.status(500).send();
            res.end();
        })
    }
    
})


app.delete('/api/session/current', function(req, res){
    req.logout();
    res.end();
})

app.put('/comuneUpdate', isLoggedIn, (req, res)=>{
    console.log(req.body);
    dao.comuneUpdateRequest(req.body)
    .then(()=>res.status(200).send())
    .catch((error)=> res.status(res.status).send());
})

app.get('/api/userRequests',isLoggedIn, (req, res)=>{
    dao.getRequests()
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get('/api/indexRequests', (req, res)=>{
    dao.getIndexRequests()
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get('/api/adminRequests', isLoggedIn, (req, res)=>{
    dao.getAdminRequests()
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get("/indexSearch", (req, res) =>{
    dao.getIndexSearchRequest(req.query)
    .then((requests) => res.json(requests))
    .catch(() => res.status(500).end());
});

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'public/index.html'));
});

app.listen(port, function(){
    console.log("Connected on port " + port);
});