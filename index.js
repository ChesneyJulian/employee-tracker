const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'employee_db'
},
    console.log('Connected to employee_db')
);

const prompt = inquirer.createPromptModule();
const queryOptions =[
        {
        type: 'list',
        name: 'query',
        message: 'Select an Option',
        choices: [
            'View All Departments', 
            'View All Roles', 
            'View All Employees'
        ]
    }
];

function runCommandLine(){
    prompt(queryOptions).then((answers) => {
    handleQuery(answers);
})
};

function handleQuery(answers) {
    if (answers.query === 'View All Departments') {
        db.query(`SELECT * FROM departments`, (err, results) => {
            handleResults(err, results);
            });      
    } else if (answers.query === 'View All Roles') { 
        db.query(`SELECT roles.id, roles.role_name AS title, departments.department_name AS department, roles.salary AS salary FROM roles LEFT JOIN departments ON roles.department_id = departments.id;`, (err, results) => {
            handleResults(err, results);
        });
    } else if (answers.query === 'View All Employees') {
        db.query(`SELECT employee.id, employee.first_name, employee.last_name, roles.role_name AS title, departments.department_name AS department, roles.salary AS salary, manager.first_name as manager FROM employees employee LEFT JOIN employees manager ON manager.id = employee.manager_id LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN departments ON roles.department_id = departments.id;`, (err, results) => {
            handleResults(err, results);
        });
    };
};

function handleResults (err, results) {
    if (err) {
        console.error(err);
    } else {
        console.table(results);
        runCommandLine();
    }
};

runCommandLine();