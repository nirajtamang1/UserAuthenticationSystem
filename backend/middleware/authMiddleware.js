import JWT from "jsonwebtoken";

//Token verified
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log(token);
    // Decode the token to get the user ID
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.userId = decoded._id;
    next();
  } catch (error) {
    return res.status(404).send({
      success: false,
      message: "Token is not valid",
    });
  }
};
