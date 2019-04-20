const express = require('express');
const app = express();
var posts = require('./src/server/routes/routes');

//if we deployed out app to server there could be default port number
//we have to use it / if there no one we will use 4601
const portNumber = process.env.PORT || 4601;

app.listen(portNumber, function(req, res){
  console.log(`RUNNING on port ${portNumber}...`);
});

const path = require('path');

//set route POSTS
const routes = require('./src/server/routes/routes');

//we serve here static files placed in dist folder

app.use(express.static(path.join(__dirname, 'dist')));

//every request to routes uri go to routes.js
app.use('/routes', routes);

//for all request we send back index.html
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'))
});




//for outh2 authentification
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

var jwtCheck = jwt({
      secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: 'https://dev-13ld9qi1.auth0.com/.well-known/jwks.json'
    }),
    audience: 'localhost:4601',
    issuer: 'https://dev-13ld9qi1.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});



