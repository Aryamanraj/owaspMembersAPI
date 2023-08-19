const config = require("../../config");
const userToken = config.YOUR_STATIC_USER_TOKEN;
const adminToken = config.YOUR_STATIC_ADMIN_TOKEN

exports.verifyUserToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        if (bearerToken === userToken || bearerToken === adminToken) {  // Admin token will also work for user access
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};

exports.verifyAdminToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];

        if (bearerToken === adminToken) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden: Invalid token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};
