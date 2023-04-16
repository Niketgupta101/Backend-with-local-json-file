import jwt from "jsonwebtoken";
import { readFile } from "../controller/user.controller.js";

import dotenv from 'dotenv';

dotenv.config();

export const isAuthorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1] || req.cookies.accessToken;

    if (!token)
      res.status(400).json({
        success: false,
        message: "Not Authorized to access this route!!",
      });

    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    if (decoded) {
      const userList = await readFile();
      const user = userList.find((user) => user.id === decoded.id);

      if (!user)
        res.status(404).json({ success: false, message: "User not found !!!" });

      req.user = user;

    } else {
      res.status(400).json({
        success: false,
        message: "Not Authorized to access this route!!",
      });
    }

    next();
  } catch (error) {
    return next(error);
  }
};
