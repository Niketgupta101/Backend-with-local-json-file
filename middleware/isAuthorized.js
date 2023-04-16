import jwt from "jsonwebtoken";
import { readFile } from "../controller/user.controller.js";

import { NotFoundError } from "../utils/error/notFoundError.js";
import { UnauthorizedError } from "../utils/error/unauthorizedError.js";

import dotenv from "dotenv";

dotenv.config();

export const isAuthorized = async (req, res, next) => {
  const token =
    req?.headers?.authorization?.split(" ")[1];

    const err = new UnauthorizedError();

  if (!token) res.status(201).json({ success: false, message: 'Not Authorized to access this route!!' });

  try {
    const decoded = jwt.decode(token, process.env.JWT_SECRET);

    const userList = await readFile();
    const user = userList.find((user) => user.id === decoded.id);

    if (!user) res.status(201).json({ success: false, message: 'NOT FOUND!!' });

    req.user = user;

    next();
  } catch (error) {
    return next(error);
  }
};
