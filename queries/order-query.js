const getAllOrder = `SELECT o.*,
        JSON_OBJECT(
            'id', u.id, 
            'firstName', u.firstName,
            'lastName', u.lastName,
            'password', u.password,
            'phoneNumber', u.phoneNumber,
            'email', u.email,
            'address', u.address,
            'role', u.role, 
            'status', u.status
        ) AS user,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', oi.id,
                'productId', p.id,
                'quantity', oi.quantity,
                'totalSum', oi.totalSum
            )
         ) AS orderitems
FROM orders AS o
JOIN users AS u ON o.userId = u.id
JOIN orderitems as oi ON oi.orderId = o.id
JOIN products as p ON p.id = oi.productId
GROUP BY o.id, u.id;`;

const getOneOrder = `SELECT o.*,
        JSON_OBJECT(
            'id', u.id, 
            'firstName', u.firstName,
            'lastName', u.lastName,
            'password', u.password,
            'phoneNumber', u.phoneNumber,
            'email', u.email,
            'address', u.address,
            'role', u.role, 
            'status', u.status
        ) AS user,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', oi.id,
                'productId', p.id,
                'quantity', oi.quantity,
                'totalSum', oi.totalSum
            )
         ) AS orderitems
FROM orders AS o
JOIN users AS u ON o.userId = u.id
JOIN orderitems as oi ON oi.orderId = o.id
JOIN products as p ON p.id = oi.productId
WHERE o.id = ?
GROUP BY o.id, u.id;`;

const getByUserId = `SELECT o.*,
        JSON_OBJECT(
            'id', u.id, 
            'firstName', u.firstName,
            'lastName', u.lastName,
            'password', u.password,
            'phoneNumber', u.phoneNumber,
            'email', u.email,
            'address', u.address,
            'role', u.role, 
            'status', u.status
        ) AS user,
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', oi.id,
                'productId', p.id,
                'quantity', oi.quantity,
                'totalSum', oi.totalSum
            )
         ) AS orderitems
FROM orders AS o
JOIN users AS u ON o.userId = u.id
JOIN orderitems as oi ON oi.orderId = o.id
JOIN products as p ON p.id = oi.productId
WHERE o.userId = ?
GROUP BY o.id, u.id;`;

export { getAllOrder, getOneOrder, getByUserId };
