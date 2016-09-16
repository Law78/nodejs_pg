Based on [article](http://blog.vitalytomilov.com/about-2/)

Install:

npm install -g supervisor
npm install -g express-generator
npm install
npm start

Be sure to create a folder called models with the database.js script for create your db:

```javascript
var pg = require('pg');

// create a config to configure both pooling behavior
// and client options
// note: all config is optional and the environment variables
// will be read if the config is not present
var config = {
  user: 'lorenzo', //env var: PGUSER
  database: 'todo', //env var: PGDATABASE
  password: 'lorenzo', //env var: PGPASSWORD
  host: 'localhost', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};


//this initializes a connection pool
//it will keep idle connections open for a 30 seconds
//and set a limit of maximum 10 idle clients
var pool = new pg.Pool(config);

// to run a query we can acquire a client from the pool,
// run a query on the client, and then return the client to the pool
pool.connect(function(err, client, done) {
  if(err) {
    return console.error('error fetching client from pool', err);
  }

	//var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');


  var query = pool.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)', function(err, result) {
    //call `done()` to release the client back to the pool
    
    done();

    if(err) {
      return console.error('error running query', err);
    } else {
			console.log('Query fatta con successo')
    }
   
    
    
  });
});

pool.on('error', function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error('idle client error', err.message, err.stack)
});
```

Also, be sure to create a config.js file on the root, with the right password for your DB:

```javascript
var connectionString = process.env.DATABASE_URL || 'postgres://lorenzo:psw123.abc@localhost:5432/todo';

module.exports = connectionString;
```