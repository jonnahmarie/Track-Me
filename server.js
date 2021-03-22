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

app = () => {
    inquirer
        .prompt({
            name: "manage",
            type: "rawlist",
            message: "What action would you like to take?",
            choices: [
                "View All Employees",
                "Add Department",
                "Add Employee",
                "Add Employee Roles",
                "Update Employee Roles"
            ]
        })
        .then(answer => {
            switch (answer.manage) {
                case "View All Employees":
                    viewEmployees();
                    break;
                case "Add Department":
                    addDepartment();
                    break;
                case "Add Employee":
                    addEmployee();
                    break;
                case "Add Employee Roles":
                    addRole();
                    break;
                case "Update Employee Roles":
                    updateRole();
                    break;
            }
        });
}