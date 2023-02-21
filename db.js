const { createPool } = require('mysql2/promise')

const pool = createPool({
    host: process.env.CLOUD_HOST,
    user: process.env.CLOUD_USER,
    password: process.env.CLOUD_PASSWORD,
    database: process.env.CLOUD_DATABASE,
    port: process.env.CLOUD_PORT
})

// const pool = createPool({
//     host: process.env.HOST,
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     database: process.env.DATABASE,
//     port: process.env.PUERTO
// })

module.exports=pool