import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ message: "Unauthorized" });

  const token = authorization.split(" ")[1] as string;

  try {
    const { user } = jwt.verify(token, env.jwtSecret) as {
      user: { _id: string };
    };

    req.userId = user._id;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};
