import jtw from "jsonwebtoken";

export const generateToken = (id) => {
  return jtw.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1y" });
};

export const verifyToken = (token) => {
  return jtw.verify(token, process.env.JWT_SECRET);
};
