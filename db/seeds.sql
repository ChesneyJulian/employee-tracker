USE employee_db;

INSERT INTO departments (name) VALUES 
    ('Bake'), 
    ('Customer Service'), 
    ('Cake'), 
    ('Delivery'), 
    ('Santization'), 
    ('Team Management');

INSERT INTO roles (name, salary, department_id) VALUES 
    ('Lead Baker', 30000, '1'),
    ('Assistant Baker', 20000, '1'),
    ('Lead Customer Service', 35000, '2'),
    ('Customer Service Member', 20000, '2'),
    ('Lead Cake Decorator', 30000, '3'),
    ('Cake Decorator', 20000, '3'),
    ('Lead of Delivery', 25000, '4'),
    ('Dishwasher', 25000, '5'),
    ('Manager', 40000, '6'),
    ('Owner', 50000, '6');