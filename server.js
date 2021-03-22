const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    // Port
    port: 8800,
    // Your username
    user: "root",
    // Your password
    password: "Greenotter4!",
    database: "tracker_db"
});

connection.connect(err => {
    if (err) throw err;
    console.log("Connected as id " + connection.threadId + "\n");
    app();
});