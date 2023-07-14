// require node inquirer, mysql2, and console.table
const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
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
// store main query options for prompt system
const queryOptions = [
  {
    type: "list",
    name: "query",
    message: "Select an Option",
    choices: [
      "View All Departments",
      "View All Roles",
      "View All Employees",
      "Add a Department",
      "Exit",
    ],
  },
];
// store options for adding department to be used with prompt
const addDepartment = [
  {
    type: "input",
    name: "department_name",
    message: "Enter the name of the department you wish to add:",
  },
];

// function to initialize and run initial prompt system
function runCommandLine() {
  prompt(queryOptions).then((answers) => {
    handleQuery(answers);
  });
}
// function to handle answers to initial prompt sequence depending on what they selected
function handleQuery(answers) {
  // use conditionals to make corresponding prepared statements
  if (answers.query === "View All Departments") {
    // prepared statement to view all columns of departments table
    db.query(`SELECT * FROM departments`, (err, results) => {
      handleResults(err, results);
    });
  } else if (answers.query === "View All Roles") {
    // prepared statement to view roles table joined with
    // departments table for full info of each role including the department it is in
    db.query(
      `SELECT roles.id, roles.role_name AS title, departments.department_name AS department, roles.salary AS salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`,
      (err, results) => {
        handleResults(err, results);
      }
    );
  } else if (answers.query === "View All Employees") {
    // prepared statement to view all employee info including role, department, salary,
    // and manager name using joins to departments and roles as well as a self join
    db.query(
      `SELECT employee.id, employee.first_name, employee.last_name, roles.role_name AS title, departments.department_name AS department, roles.salary AS salary, manager.first_name as manager FROM employees employee LEFT JOIN employees manager ON manager.id = employee.manager_id LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`,
      (err, results) => {
        handleResults(err, results);
      }
    );
  } else if (answers.query === "Add a Department") {
    // if Add a Department is selected, run prompt module with question from addDepartment
    prompt(addDepartment).then((answers) => {
      // use answers to insert department into departments table
      db.query(`INSERT INTO departments SET ?`, answers, (err, results) => {
        handleResults(err, results);
      });
    });
  } else if (answers.query === "Exit") {
    process.exit();
  }
}
// function to handle all results and potential errors
function handleResults(err, results) {
  if (err) {
    console.error(err);
  } else {
    console.table(results);
    runCommandLine();
  }
}

// initialize app
runCommandLine();
