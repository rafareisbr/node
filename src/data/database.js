const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'rafareisbr',
    password: '123qwe',
    database: 'teste'
})

module.exports = pool.promise()
