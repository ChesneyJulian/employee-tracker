USE employee_db;

INSERT INTO departments (department_name) VALUES 
    ('Bake'), 
    ('Customer Service'), 
    ('Cake'), 
    ('Delivery'), 
    ('Sanitation'), 
    ('Team Management');

INSERT INTO roles (role_name, salary, department_id) VALUES 
    ('Lead Baker', 30000, 1),
    ('Assistant Baker', 20000, 1),
    ('Lead Customer Service', 35000, 2),
    ('Customer Service Member', 20000, 2),
    ('Lead Cake Decorator', 30000, 3),
    ('Cake Decorator', 20000, 3),
    ('Lead of Delivery', 25000, 4),
    ('Dishwasher', 25000, 5),
    ('Manager', 40000, 6),
    ('Owner', 50000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Katie', 'Hopper', 9, null),
    ('Elizabeth', 'Smith', 10, null),
    ('Johna', 'Lee', 1, 1),
    ('Jeb', 'Herron', 2, 3),
    ('Adam', 'England', 2, 3),
    ('Jess', 'Smelzer', 8, 1),
    ('Kathleen', 'England', 3, 1),
    ('Reba', 'Vaughn', 5, 1), 
    ('Sydnee', 'Edmons', 4, 7),
    ('Abby', 'Bentley', 4, 7),
    ('KeKe', 'Dunn', 6, 8),
    ('Leo', 'Capoldi', 7, 1);
