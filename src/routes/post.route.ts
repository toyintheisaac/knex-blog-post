import express from "express";
import { createUserPost, fetchPosts, destroy } from '../controllers/post.controller';
import asyncHandler from "express-async-handler";

const router = express.Router();
import { createPostSchema  } from "../validations/post.validation";  
import { validateRequest  } from "../middlewares/validate.middleware"; 

router.post("/posts", validateRequest(createPostSchema), asyncHandler(createUserPost));
router.get("/posts", asyncHandler(fetchPosts));

router.delete("/posts/:id",   asyncHandler(destroy));
 

export default router;