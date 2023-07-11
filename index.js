const inquirer = require('inquirer');
const mysql = require('mysql2');

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
            'View All Departments'
        ]
    }
];

function runCommandLine(){
    prompt(queryOptions).then((answers) => {
    handleQuery(answers);
})
}

function handleQuery(answers) {
    if (answers.query === 'View All Departments') {
        db.query('SELECT * FROM departments', (err, results) => {
            if (err) {
                console.error(err);
            } else {
                console.table(results);
                runCommandLine();
            }
        })
    }
}
runCommandLine();