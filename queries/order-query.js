const getAllOrder = `SELECT o.*,
        JSON_OBJECT('id', u.id, 
                'firstName', u.firstName,
                'lastName', u.lastName,
                'password', u.password,
                'phoneNumber', u.phoneNumber,
                'email', u.email,
                'address', u.address,
                'role', u.role, 
                'status', u.status) AS user
    FROM orders AS o
    JOIN users AS u ON o.userId = u.id;`;

const getOneOrder = `SELECT o.*,
    JSON_OBJECT('id', u.id, 
            'firstName', u.firstName,
            'lastName', u.lastName,
            'password', u.password,
            'phoneNumber', u.phoneNumber,
            'email', u.email,
            'address', u.address,
            'role', u.role, 
            'status', u.status) AS user
FROM orders AS o
JOIN users AS u ON o.userId = u.id
WHERE o.id = ?;`;

const getByUserId = `SELECT o.*,
    JSON_OBJECT('id', u.id, 
            'firstName', u.firstName,
            'lastName', u.lastName,
            'password', u.password,
            'phoneNumber', u.phoneNumber,
            'email', u.email,
            'address', u.address,
            'role', u.role, 
            'status', u.status) AS user
FROM orders AS o
JOIN users AS u ON o.userId = u.id
WHERE o.userId = ?;`;

export { getAllOrder, getOneOrder, getByUserId };
