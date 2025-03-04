import express from "express";
import { createAddress, fetchAddress, updateAddress } from "../controllers/address.controller";
import asyncHandler from "express-async-handler";

const router = express.Router();
import { createAddressSchema, updateAddressSchema  } from "../validations/address.validation";  
import { validateRequest  } from "../middlewares/validate.middleware"; 

router.post("/addresses", validateRequest(createAddressSchema), asyncHandler(createAddress));
router.get("/addresses/:userId", asyncHandler(fetchAddress));

router.patch("/addresses/:userId",  validateRequest(updateAddressSchema), asyncHandler(updateAddress));
 

export default router;