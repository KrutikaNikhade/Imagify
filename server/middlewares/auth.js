import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  // Support token from either 'token' or 'x-access-token' header
  const token = req.headers.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized. Login again",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Login again",
      });
    }

    // Attach user ID to request object
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default userAuth;
