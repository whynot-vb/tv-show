import jwt from "jsonwebtoken";
import { UnAuthorizedError } from "../errors.js";

const authenticateUser = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) {
    throw new UnAuthorizedError("Invalid authentication");
  }

  const token = auth.split(" ")[1];

  try {
    const payloadData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payloadData.userId };
    next();
  } catch (error) {
    throw new UnAuthorizedError("Invalid authorization");
  }
};

export default authenticateUser;
