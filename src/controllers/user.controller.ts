import { Request, Response } from "express";
import { getUsers, getUserById, getUserWithAddress, createUser, getUserCount, getUserByEmail } from "../models/user.model";

import ApiResponse from "../utils/apiResponse.util";

export const fetchUsers = async (req: Request, res: Response) => {

  try {

    const pageNumber = Number(req.query.pageNumber) || 0;
    const pageSize = Number(req.query.pageSize) || 10;

    if (pageNumber < 0 || pageSize < 1) {
      new ApiResponse(null, "Invalid pagination parameters").errorResponse(res, ApiResponse.ERROR);
      return;
    }

    const users = await getUsers(pageNumber, pageSize);

    new ApiResponse(
      {
        users,
        pagination: { pageNumber, pageSize }
      },
      "Fetch successful"
    ).successResponse(res, ApiResponse.SUCCESS);

  } catch (error) {
    console.error("Error fetching user:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};

export const fetchUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);

    if (!userId || isNaN(userId)) {
      new ApiResponse(null, "Invalid user ID").errorResponse(res, ApiResponse.FAILED_VALIDATION);
      return;
    }
    const user = await getUserWithAddress(userId);
    if (!user) {
      new ApiResponse(null, "User not found").errorResponse(res, ApiResponse.ERROR);
      return;
    }
    new ApiResponse({ user }, "Fetch successful").successResponse(res, ApiResponse.SUCCESS);
  } catch (error) {
    console.error("Error fetching user:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};

export const addUser = async (req: Request, res: Response) => {

  try {
    const { name, email } = req.body;
    // check if email already exist 
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      const response = new ApiResponse(null, "Email already in use");
      response.errorResponse(res, ApiResponse.FAILED_VALIDATION);
      return;
    }
    const user = await createUser(name, email);
    const response = new ApiResponse(
      {
        user,
      },
      `User Added successfully`
    );
    response.successResponse(res, ApiResponse.SUCCESS_WITH_DATA);

  } catch (error) {
    console.error("Error fetching user:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};

export const countUsers = async (req: Request, res: Response) => {

  try {
    const count = await getUserCount();
    const response = new ApiResponse(
      count,
      `Counts`
    );
    response.successResponse(res, ApiResponse.SUCCESS);
  } catch (error) {
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }

};

