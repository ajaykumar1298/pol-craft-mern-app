import jwt from "jsonwebtoken";

function generateTOken(id) {
  return jwt.sign({ id }, process.env.JWT_URI, { expiresIn: "7d" });
}

export default generateTOken;
