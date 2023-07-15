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
      "Add a Role",
      "Add an Employee",
      "Exit",
    ],
  },
];
// store questions for adding an employee
const addEmployee = [
    {
        type: "input",
        name: "first_name",
        message: "Enter the first name of the employee you wish to add:",
    },
    {
        type: "input",
        name: "last_name",
        message: "Enter the last name of the employee you wish to add:",
    },
    {
        type: "input",
        name: "role_id",
        message: "Enter the role id number of the employee you wish to add:",
    },
    {
        type: "input",
        name: "manager_id",
        message: "Enter the manager id number of the employee you wish to add:",
    }
];

const addRole = [
  {
    type: "input",
    name: "role_name",
    message: "Enter the name of the role you wish to add:"
  },
  {
    type: "input",
    name: "salary",
    message: "Enter the salary of the role you wish to add:"
  },
  {
    type: "input",
    name: "department_id",
    message: "Enter the department_id of the role you wish to add:"
  }
]

// store options for adding department to be used with prompt
const addDepartment = [
    {
        type: "input",
        name: "department_name",
        message: "Enter the name of the department you wish to add:",
    },
]

// function to initialize and run initial prompt system
function runCommandLine() {
  prompt(queryOptions).then((answers) => {
    handleQuery(answers);
  });
}
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



    default: {
      // end prompt sequence if Exit is selected (default of no other options selected)
      process.exit();
    } 
  };
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
