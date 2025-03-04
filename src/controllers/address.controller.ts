import { Request, Response } from "express";
import { getAddressByUserId, insertAddress, updateUserAddress } from "../models/address.model";

import ApiResponse from "../utils/apiResponse.util";


export const createAddress = async (req: Request, res: Response) => {

  try {
    const { address, userId } = req.body;

    // check for existing address
    const existingAddress = await getAddressByUserId(userId);
    if (existingAddress) {
      new ApiResponse(null, "User already has an address").errorResponse(res, ApiResponse.ERROR);
      return;
    }

    const userAddress = await insertAddress(userId, address);

    const response = new ApiResponse(
      {
        userAddress,
      },
      `Address Added successfully`
    );
    response.successResponse(res, ApiResponse.SUCCESS_WITH_DATA);
  } catch (error) {
    console.error("Error adding address:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};


export const fetchAddress = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const userAddress = await getAddressByUserId(userId);
    if (!userAddress) {
      new ApiResponse(null, "User does not have address").errorResponse(res, ApiResponse.ERROR);
      return;
    }

    new ApiResponse(
      {
        userAddress,
      },
      "Fetch successful"
    ).successResponse(res, ApiResponse.SUCCESS);

  } catch (error) {
    console.error("Error fetching address:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};

export const updateAddress = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { address } = req.body;

    const userAddress = await getAddressByUserId(userId);
    if (!userAddress) {
      new ApiResponse(null, "User does not have address").errorResponse(res, ApiResponse.ERROR);
      return;
    }
    const updatedAddress = await updateUserAddress(userId, address);
    new ApiResponse(
      { updatedAddress },
      "Address updated successfully"
    ).successResponse(res, ApiResponse.SUCCESS);

  } catch (error) {
    console.error("Error updating address:", error);
    new ApiResponse(null, "An unexpected error occurred").errorResponse(res, ApiResponse.ERROR);
  }
};
