USE tracker_db;

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Software Engineer", 90000.00, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, 2);

INSERT INTO department (name)
VALUES ("Engineering");

INSERT INTO role (title, salary, department_id)
VALUES ("Lead Engineer", 120000.00, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Diane", "Hernandez", 2);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;