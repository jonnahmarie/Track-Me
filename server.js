const mysql = require("mysql");
const inquirer = require("inquirer");
const table = require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    // Port
    port: 3306,
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
};

const viewEmployees = () => {
    connection.query( `SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee
    INNER JOIN role on employee.role_id = role.id
    INNER JOIN department
    ON role.department_id = department.id`, (err, res) => {
        if (err) throw err;
        console.table(res);
        app();
    });
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "Add a new department"
        })
        .then(answer => {
            connection.query("INSERT INTO department SET ?",
            {
                name: answer.department
            },
            (err, res) => {
                if (err) throw err;
                console.log("Department added successfully.");
                app();
            });
        });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: "firstName",
                type: "input",
                message: "What's the employee's first name?"
            },
            {
                name: "lastName",
                type: "input",
                message: "What's the employee's last name?"
            },
            {
                name: "roleId",
                type: "input",
                message: "What's the employee's role ID?"
            }
        ])
        .then(answer => {
            connection.query("INSERT INTO employee SET ?",
            {
                first_name: answer.firstName,
                last_name: answer.lastName,
                role_id: parseInt(answer.roleId)
            },
            (err, res) => {
                if (err) {
                    console.log("Unable to add new employee. Please add a new role before proceeding.");
                    addRole();
                    return;
                }
                console.log("Employee has been added.");
                app();
            });
        });
};

const addRole = () => {
    inquirer
        .prompt([
            {
                name: "newTitle",
                type: "input",
                message: "What's the title of the new role?"
            },
            {
                name: "newSalary",
                type: "number",
                message: "What's the salary of the new role? (To the second decimal place)"
            },
            {
                name: "departmentId",
                type: "number",
                message: "What department ID will this role fall under?"
            }

        ])
        .then(answer => {
            connection.query("INSERT INTO role SET ?",
            {
                title: answer.newTitle,
                salary: answer.newSalary,
                department_id: answer.departmentId
            },
            (err, res) => {
                if (err) throw err;
                console.log("The new role has been added successfully.");
                app();
            });
        });
};