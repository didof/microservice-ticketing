import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { currentUser } from "../middlewares/current-user";

const router = express.Router();

router.get(
  "/api/users/currentuser",
  currentUser,
  (req: Request, res: Response) => {
    let status: number;
    if (!req.currentUser) status = 401;
    else status = 200;
    return res.status(status).send({ currentUser: req.currentUser || null });
  }
);

export { router as currentUserRouter };
