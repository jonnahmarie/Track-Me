USE tracker_db;

INSERT INTO department (dept_name) VALUES ("Management");
INSERT INTO department (dept_name) VALUES ("Sales");
INSERT INTO department (dept_name) VALUES ("Human Resources");
INSERT INTO department (dept_name) VALUES ("Administration");
INSERT INTO department (dept_name) VALUES ("Finance");
INSERT INTO department (dept_name) VALUES ("Product Oversight");

INSERT INTO role (title, salary, department_id) VALUES ("Regional Manager", 50000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Assistant Regional Manager", 48000.00, 1);
INSERT INTO role (title, salary, department_id) VALUES ("Director of Sales", 43700.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("Sales Representative", 43000.00, 2);
INSERT INTO role (title, salary, department_id) VALUES ("HR Representative", 44000.00, 3);
INSERT INTO role (title, salary, department_id) VALUES ("Receptionist", 38000.00, 4);
INSERT INTO role (title, salary, department_id) VALUES ("Chief Accountant", 44200.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Accountant", 43800.00, 5);
INSERT INTO role (title, salary, department_id) VALUES ("Head of Quality Assurance", 42000.00, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Supplier Relations Representative", 41500.00, 6);
INSERT INTO role (title, salary, department_id) VALUES ("Customer Service Representative", 40000.00, 6);

INSERT INTO employee (first_name, last_name, role_id) VALUES ("Michael", "Scott", 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Jim", "Halpert", 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Dwight", "Schrute", 3, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Phyllis", "Vance", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Stanley", "Hudson", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Andy", "Bernard", 4, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Ryan", "Howard", 4, 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Toby", "Flenderson", 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pam", "Beesly", 6, 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Oscar", "Martinez", 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Angela", "Martin", 8, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kevin", "Malone", 8, 7);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Creed", "Bratton", 9);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Meredith", "Palmer", 10);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Kelly", "Kapoor", 11);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;