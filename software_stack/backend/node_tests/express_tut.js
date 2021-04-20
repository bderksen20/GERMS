const express = require('express');
//const { Router } = require('../app');
var router = express.Router();
const app = express();

/* 1. Hello Node+Express 

    app.get('/', (req,res) => {
     res.send("Hello");
    });

*/

/* 2. Express Routers 
  - routers: endpoint of a server, can perform operations on routes using HTTP methods (ex. GET)
  - example.... for example, facebook.com/codeforgeek, here the codeforgeek is a route.
  - run below test / example and can navigate to diff routes by 

    router.get('/home', (req, res) => {
        res.send('Hello test, this is home router!');
    });

    router.get('/profile', (req, res) => {
        res.send('Hello test, this is profile router!');
    });

    router.get('/login', (req, res) => {
        res.send('Hello test, this is login router!');
    });

    router.get('/logout', (req, res) => {
        res.send('Hello test, this is logout router!');
    });

    app.use('/', router);
*/

/* 3. Express Application Middleware
    - executes before sending response back to user
    - this example prints locally to console when server accessed

    app.use((req, res, next) => {
        console.log('Time:', Date.now());
        next();
    });
*/

/* 4. Express Router Middleware */
    
    router.use((req, res, next) => {
        console.log('Time:', Date.now());
        next();
    });

    router.get('/home', (req, res) => {
        res.send("ok");
    });

    app.use('/', router);

app.listen(process.env.port || 3001);
console.log('Web Server is listening at port '+ (process.env.port || 3001));


