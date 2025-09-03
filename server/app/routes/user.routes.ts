import express from "express";
import { getUsers, createUser } from "../controller/user.controller";

const router = express.Router();

router.get("/", getUsers);
router.post("/", createUser);

export default router;
