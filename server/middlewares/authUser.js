import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, token missing",
      });
    }

    try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id) {
      req.body.userId = decoded.id;
        
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      
    }
    next(); 
    
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;
