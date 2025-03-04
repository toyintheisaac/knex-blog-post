import { Request, Response } from "express";
import { createPost, getPostByUserId, getPostById, destroyPost } from "../models/post.model";

import ApiResponse from "../utils/apiResponse.util";


export const createUserPost = async (req: Request, res: Response) => {

  try {
    const { userId, title, body } = req.body;
 
    const post = await createPost(userId, title, body);

    const response = new ApiResponse(
      {
        post,
      },
      `Post Added successfully`
    );
    response.successResponse(res, ApiResponse.SUCCESS_WITH_DATA);
  } catch (error) {
    console.error("Error adding Post:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};


export const fetchPosts = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.query.userId);

    const userPosts = await getPostByUserId(userId);
 
    if (!userPosts || userPosts.length === 0) {
       new ApiResponse(null, "User does not have posts").errorResponse(res, ApiResponse.ERROR);
       return;
    }

    new ApiResponse(
      {
        userPosts,
      },
      "Fetch successful"
    ).successResponse(res, ApiResponse.SUCCESS);

  } catch (error) {
    console.error("Error fetching post:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id); 
 
    const post = await getPostById(id);
    if (!post) {
      new ApiResponse(null, "Post does not exist").errorResponse(res, ApiResponse.ERROR);
      return;
    }

    await destroyPost(id);

    new ApiResponse(
      null,
      "Post Deleted successfully"
    ).successResponse(res, ApiResponse.SUCCESS);

  } catch (error) {
    console.error("Error deleting post:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};
