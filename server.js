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

const employeeQuery = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.dept_name FROM employee
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON role.department_id = department.id`;

const viewEmployees = () => {
    connection.query(employeeQuery, (err, res) => {
        if (err) throw err;
        console.table(res);
        app();
    });
};

const addDepartment = () => {
    inquirer
        .prompt({
            name: "newDepartment",
            type: "input",
            message: "Add a new department"
        })
        .then(answer => {
            connection.query("INSERT INTO department SET ?",
            {
                dept_name: answer.newDepartment
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

const updateRole = () => {
    connection.query("SELECT employee.id FROM employee", (err, res) => {
        const selectEmployee = res.map(employee => employee.id);
        // console.table(res);

        inquirer
            .prompt([
                {
                    name: "updateEmployee",
                    type: "rawlist",
                    // message: "Which employee would you like to update?",
                    message: "What is the ID of the employee you would like to update?",
                    choices: selectEmployee
                }
            ])
            .then(answer => {
                // console.log(`You would like to update ${answer.updateEmployee}.`);

                connection.query("SELECT role.id, role.title FROM role", (err, res) => {
                    const selectRole = res.map(role => role.id);

                    inquirer
                    .prompt([
                        {
                            name: "updateTo",
                            type: "rawlist",
                            message: `What is the ID of the new role you would like to assign the employee to?`,
                            choices: selectRole
                        }
                    ])
                    .then(response => {
                        // console.log(`You would like to update ${answer.updateEmployee} to the role of ${response.updateTo}`);

                        connection.query(`UPDATE employee SET role_id = ${response.updateTo} WHERE id = ${answer.updateEmployee}`,
                        (err, res) => {
                            if (err) throw err;
                            console.log(`The employee's role has been successfully changed.`);
                            app();
                        });
                    });
                })
            });
    });
};