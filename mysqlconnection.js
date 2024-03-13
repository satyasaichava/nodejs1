// Create a connection pool
const mysql = require('mysql2');


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'nodeapi',
    waitForConnections: true,
    connectionLimit: 10, // Adjust the maximum number of connections
    queueLimit: 0 // Unlimited queued requests (0)
  });

// Export the pool for use in other modules
module.exports = pool.promise();