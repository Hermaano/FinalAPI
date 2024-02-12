const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => { // Include the `next` parameter here
  
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized: Missing token',
      });
    }

    try {
        const decoded = jwt.verify(token, "Nucmaan");

        req.userId = decoded.userId;
        req.email = decoded.email;
        req.fullname = decoded.fullname;

        next(); // Call next to pass control to the next middleware or route handler
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized: Invalid token',
        });
    }
}

module.exports = {
  verifyUser
}
