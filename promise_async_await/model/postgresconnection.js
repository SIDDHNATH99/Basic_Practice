const { Client, pg } = require('pg')
require("dotenv").config();
const { dbname } = process.env

module.exports = {

    pgconnect: () => {

        return new Promise((resolve, reject) => {
            
            const client = new Client({
                user: "postgres",
                host: "localhost",
                database: `${dbname}`,
                password: "postgres",
                port: 5432,
            })

            resolve(client);

        })

    }
}