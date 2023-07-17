// require node inquirer, mysql2, and console.table
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const fs = require('fs');
const path = require('path');
const { queryOptions, addEmployee, addRole, addDepartment, updateEmployeeRole } = require('./assets/js/questions.js');
// set up connection to employee_db
const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    database: "employee_db",
  },
  console.log("Connected to employee_db")
);
// initialize inquirer prompt module
const prompt = inquirer.createPromptModule();

// function to initialize prompt sequence and program
function runCommandLine() {
  prompt(queryOptions).then((answers) => {
    handleQuery(answers);
  });
};

// function to handle all results and potential errors
function handleResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.table(results);
    runCommandLine();
  }
};

// function to handle answers to initial prompt sequence depending on what they selected
function handleQuery(answers) {
  // implement switch case to determine what actions to run in the case of each option 
  switch (answers.query) {
    case "View All Departments": {
        // prepared statement to view all columns of departments table
      db.query(`SELECT * FROM departments`, (err, results) => {
          handleResults(err, results);
    })
      break;
  }
    case "View All Roles": {
      // prepared statement to view roles table joined with
      db.query(
        `SELECT roles.id, roles.role_name AS title, departments.department_name AS department, roles.salary AS salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`,
        (err, results) => {
          handleResults(err, results);
        }
      );
      break;
    }
    case "View All Employees": {
      // prepared statement to view all employee info including role, department, salary,
      // and manager name using joins to departments and roles as well as a self join
      db.query(
        `SELECT employee.id, employee.first_name, employee.last_name, roles.role_name AS title, departments.department_name AS department, roles.salary AS salary, manager.first_name as manager FROM employees employee LEFT JOIN employees manager ON manager.id = employee.manager_id LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`,
        (err, results) => {
          handleResults(err, results);
          }
        );
      break;
    }
    case "Add a Department": {
      // if Add a Department is selected, run prompt module with question from addDepartment
      prompt(addDepartment).then((answers) => {
        // use answers to insert department into departments table with prepared statement
        db.query(`INSERT INTO departments SET ?`, answers, (err, results) => {
          handleResults(err, results);
          });
        });
      break;
    }
    case "Add a Role": {
      prompt(addRole).then((answers) => {
        db.query(`INSERT INTO roles SET ?`, answers, (err, results) => {
          handleResults(err, results);
        });
      });
      break;
    }
    case "Add an Employee": {
      // if Add an Employee is selected, run prompt module with questions from addEmployee
      prompt(addEmployee).then((answers) => {
        // use answers to insert employee into employees table with prepared statement
        db.query(`INSERT INTO employees SET ?`, answers, (err, results) => {
            handleResults(err, results);
          });
      });
      break;
    }
    case "Update Employee Role": {
      prompt(updateEmployeeRole).then((answers) => {
        console.log(answers);
        db.query(`UPDATE employees SET role_id = ? WHERE id = ?`, [answers.role_id, answers.id], (err, results) => {
          handleResults(err, results);
        });
      });
      break;
    }
    default: {
      // end prompt sequence if Exit is selected (default of no other options selected)
      process.exit();
    } 
  };
}

// initialize app
runCommandLine();
