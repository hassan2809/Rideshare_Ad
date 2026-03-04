import { NextResponse } from "next/server";
import Category from "../../models/Category";
import asyncHandler from "../../middleware/asyncHandler";

export const GET = asyncHandler(async () => {
  const categories = await Category.find();
  return NextResponse.json(categories, { status: 200 });
});
