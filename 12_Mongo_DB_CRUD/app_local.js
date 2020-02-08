const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://127.0.0.1:27017';

// Database Name
const dbName = 'infosys_db';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {

    console.log("Connected Local MongoDB successfully");

    const db = client.db(dbName);

   // DELETE Record
    db.collection('employee').deleteOne({ id : 2},function(err,r) {
       if(err) throw  err;
       console.log(`Record is deleted Successfully`);
    });

    client.close();
});
