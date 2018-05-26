
const express = require("express");
const bodyParser = require("body-parser");
const nodeStatic = require("node-static");
const db = require("./mongo");

const app = express();
const file = new nodeStatic.Server('.');
const jsonParser = bodyParser.json();

const fs = require("fs");
const index = fs.readFileSync('./index.html', 'utf8');


app.get(/\/page\d/, function(request, response){

    console.log(request.url);
    const num = +request.url.slice(-1);

    db.loadPages(num, function(results) {
        const mainContent = results[0].content;
        response.send(mainContent);
    });
});


app.get(/\/npage\d/, function(request, response){

    console.log(request.url);

    response.send(index);

});


app.post("/form", jsonParser, function (request, response) {


    if(!request.body) return response.sendStatus(400);
    const user = request.body;
    db.transferData(user);
    response.send("<h1>Все заебись!</h1>");
});


app.use(function(req, res) {
    file.serve(req, res);
});


app.listen(80);




