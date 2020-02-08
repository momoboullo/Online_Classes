const MongoClient = require('mongodb').MongoClient;

const uri = "<<MONGO DB CLOUD URL>>";

const client = new MongoClient(uri, { useNewUrlParser: true });

const dbName = 'infosys_db';

client.connect(err => {

    const db = client.db(dbName);

    console.log('Connected to Cloud Mongo DB successfully');

    // DELETE Record
    db.collection('employee').deleteOne({ id : 3},function(err,r) {
        if(err) throw  err;
        console.log(`Record is deleted Successfully`);
    });


    // perform actions on the collection object
    client.close();
});
