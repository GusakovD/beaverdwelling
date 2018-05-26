

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';


// Database Name
const dbName = 'website';


module.exports.loadPages = function(num, callback) {

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        const pages = db.collection("pages");

        pages.find({pageNumber: num}).toArray(function(err, results) {
            callback(results);
            // const projects = results[0].content;
            // response.send(projects);
        });



        client.close();
    });

};


module.exports.transferData = function(data) {

    MongoClient.connect(url, function(err, client) {
        assert.equal(null, err);
        console.log("data transfer");

        const db = client.db(dbName);

        const messages = db.collection("messages");

        messages.insertOne(data, function(err, result){
            if(err){
                return console.log(err);
            }
            console.log(result.ops);

        });


        client.close();
    });

};



