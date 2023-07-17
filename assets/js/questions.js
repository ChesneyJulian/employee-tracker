const fs = require('fs');
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
        "Update Employee Role",
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
  
  // questions for adding a new role
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
  ];
  
  // store options for adding department to be used with prompt
  const addDepartment = [
      {
          type: "input",
          name: "department_name",
          message: "Enter the name of the department you wish to add:",
      },
  ];
  
  // questions for udpating Employee role
  const updateEmployeeRole = [
    {
      type: "input",
      name: "id",
      message: "Enter the id of the employee you wish to update:",
    },
    {
      type: "input",
      name: "role_id",
      message: "Enter the role id you wish to assign the employee to:",
    },
  ];

module.exports = {
    queryOptions,
    addEmployee, 
    addRole,
    addDepartment,
    updateEmployeeRole
};