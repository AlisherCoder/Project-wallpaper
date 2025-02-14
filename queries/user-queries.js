const getByname = `
                SELECT 
                    u.*,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', o.id, 
                            'user', o.userId, 
                            'totalPrice', o.totalPrice
                        )
                    ) AS orders,
        
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', oi.id, 
                            'order', oi.orderId, 
                            'product', oi.productID, 
                            'quantity', oi.quantity, 
                            'totalSum', oi.totalSum,
                            'productDetails', JSON_OBJECT(
                                'name', p.name_uz,
                                'category', c.name_uz,
                                'brand', b.name_uz
                            )
                        )
                    ) AS orderitems
        
                FROM 
                users u
                    LEFT JOIN orders o ON u.id = o.userId
                    LEFT JOIN orderitems oi ON o.id = oi.orderId
                    LEFT JOIN products p ON oi.productId = p.id
                    LEFT JOIN categoryitems ci ON p.id = ci.productID
                    LEFT JOIN categories c ON ci.categoryID = c.id
                    LEFT JOIN brands b ON p.brandsID = b.id
                    WHERE u.firstName LIKE ?
                    GROUP BY u.id;`


const getAll = `
        SELECT 
            u.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', o.id, 
                    'user', o.userId, 
                    'totalPrice', o.totalPrice
                )
            ) AS orders,

            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', oi.id, 
                    'order', oi.orderId, 
                    'product', oi.productID, 
                    'quantity', oi.quantity, 
                    'totalSum', oi.totalSum,
                    'productDetails', JSON_OBJECT(
                        'name', p.name_uz,
                        'category', c.name_uz,
                        'brand', b.name_uz
                    )
                )
            ) AS orderitems

        FROM 
        users u
            LEFT JOIN orders o ON u.id = o.userId
            LEFT JOIN orderitems oi ON o.id = oi.orderId
            LEFT JOIN products p ON oi.productId = p.id
            LEFT JOIN categoryitems ci ON p.id = ci.productID
            LEFT JOIN categories c ON ci.categoryID = c.id
            LEFT JOIN brands b ON p.brandsID = b.id
            GROUP BY u.id;`

const getOne = `
        SELECT 
            u.*,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', o.id, 
                    'user', o.userId, 
                    'totalPrice', o.totalPrice
                )
            ) AS orders,

            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', oi.id, 
                    'order', oi.orderId, 
                    'product', oi.productID, 
                    'quantity', oi.quantity, 
                    'totalSum', oi.totalSum,
                    'productDetails', JSON_OBJECT(
                        'name', p.name_uz,
                        'category', c.name_uz,
                        'brand', b.name_uz
                    )
                )
            ) AS orderitems

        FROM 
        users u
            LEFT JOIN orders o ON u.id = o.userId
            LEFT JOIN orderitems oi ON o.id = oi.orderId
            LEFT JOIN products p ON oi.productId = p.id
            LEFT JOIN categoryitems ci ON p.id = ci.productID
            LEFT JOIN categories c ON ci.categoryID = c.id
            LEFT JOIN brands b ON p.brandsID = b.id
            WHERE u.id = ?
            GROUP BY u.id;`

const getBysurname = `
                SELECT 
                    u.*,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', o.id, 
                            'user', o.userId, 
                            'totalPrice', o.totalPrice
                        )
                    ) AS orders,
        
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', oi.id, 
                            'order', oi.orderId, 
                            'product', oi.productID, 
                            'quantity', oi.quantity, 
                            'totalSum', oi.totalSum,
                            'productDetails', JSON_OBJECT(
                                'name', p.name_uz,
                                'category', c.name_uz,
                                'brand', b.name_uz
                            )
                        )
                    ) AS orderitems
        
                FROM 
                users u
                    LEFT JOIN orders o ON u.id = o.userId
                    LEFT JOIN orderitems oi ON o.id = oi.orderId
                    LEFT JOIN products p ON oi.productId = p.id
                    LEFT JOIN categoryitems ci ON p.id = ci.productID
                    LEFT JOIN categories c ON ci.categoryID = c.id
                    LEFT JOIN brands b ON p.brandsID = b.id
                    WHERE u.lastName LIKE ?
                    GROUP BY u.id;`

const getBynumber = `
                SELECT 
                    u.*,
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', o.id, 
                            'user', o.userId, 
                            'totalPrice', o.totalPrice
                        )
                    ) AS orders,
        
                    JSON_ARRAYAGG(
                        JSON_OBJECT(
                            'id', oi.id, 
                            'order', oi.orderId, 
                            'product', oi.productID, 
                            'quantity', oi.quantity, 
                            'totalSum', oi.totalSum,
                            'productDetails', JSON_OBJECT(
                                'name', p.name_uz,
                                'category', c.name_uz,
                                'brand', b.name_uz
                            )
                        )
                    ) AS orderitems
        
                FROM 
                users u
                    LEFT JOIN orders o ON u.id = o.userId
                    LEFT JOIN orderitems oi ON o.id = oi.orderId
                    LEFT JOIN products p ON oi.productId = p.id
                    LEFT JOIN categoryitems ci ON p.id = ci.productID
                    LEFT JOIN categories c ON ci.categoryID = c.id
                    LEFT JOIN brands b ON p.brandsID = b.id
                    WHERE u.phoneNumber LIKE ?
                    GROUP BY u.id;`

export { getByname, getAll, getOne, getBysurname, getBynumber }
