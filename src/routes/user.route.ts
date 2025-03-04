import express from "express";
import { fetchUsers, fetchUserById, addUser, countUsers } from "../controllers/user.controller";
import asyncHandler from "express-async-handler";

const router = express.Router();
import { createUser  } from "../validations/user.validation";  
import { validateRequest  } from "../middlewares/validate.middleware"; 

router.get("/users", asyncHandler(fetchUsers));
router.get("/users/count", asyncHandler(countUsers));
router.get("/users/:id", asyncHandler(fetchUserById)); 
router.post("/users", validateRequest(createUser), asyncHandler(addUser));

export default router;