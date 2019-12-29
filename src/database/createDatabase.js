/**
 * @author Maikon Ferreira
 * @email mai.kon96@hotmail.com
 * @create date 2019-12-29 10:41:28
 * @modify date 2019-12-29 10:41:28
 * @desc Creates the database based on .env database configurations.
 */

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

exports.createDatabase = () => {
    connection.connect( (err) => {
        if (err) throw new Error(err);
        
        connection.query('CREATE DATABASE IF NOT EXISTS psp_database', (error, results, fields) => {
            if (error) throw new Error(error);

            console.log('Database created if not exists');

            connection.end((err) => {
                if (err) throw new Error(err);

                console.log('Connection closed');
            });
        });
    })
}