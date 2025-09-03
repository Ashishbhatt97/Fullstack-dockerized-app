import { Request, Response } from "express";
import prisma from "../DB/db.config";

const getUsers = async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
};

const createUser = async (req: Request, res: Response) => {
  const { email } = req.body;
  console.log(email);
  const user = await prisma.user.create({
    data: { email },
  });

  return res.json(user);
};

export { createUser, getUsers };
