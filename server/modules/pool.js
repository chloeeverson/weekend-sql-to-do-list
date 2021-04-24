const pg = require('pg');

const config = {
    database: 'weekend-to-do-app',
    host: 'Localhost',
    port: 5432,
    max: 10,
    idleTimeOutMillis: 30000
};

const pool = new pg.Pool(config);

//notification if database connected
pool.on("connect", () => {
    console.log("connected to postgres");
});

pool.on("error",(err) => {
    console.log('error connecting to postgres', err);
    
});

module.exports = pool;
