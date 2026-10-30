import express  from "express";
import { users } from "./userController";
const router=express.Router();

router.post("/webhooks",express.raw({ type: 'application/json' }),users)

export {router};