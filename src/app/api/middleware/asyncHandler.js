import { NextResponse } from "next/server";
import { ApiError } from "../utils/ApiError";
import auth from "./auth";
import { connectDB } from "../startup/mongodb";

async function parseRequest(req) {
  let body = null;
  let files = {};
  const contentType = req?.headers?.get("content-type") || "";

  if (contentType.includes("application/json")) {
    body = await req?.json();
  } else if (contentType.includes("multipart/form-data")) {
    const formData = await req?.formData();
    body = Object.fromEntries(formData.entries());

    // Files are instances of `File`, which might be needed separately
    files = Object.fromEntries(
      [...formData.entries()].filter(([, value]) => value instanceof File)
    );
  }

  // Wrap request with custom data
  const customReq = { ...req, body: body, files };
  return customReq;
}

export default function asyncHandler(handler, options = { auth: false }) {
  return async (req, context) => {
    try {
      await connectDB();

      if (options.auth) {
        const user = await auth(req);
        req.user = user;
      }

      const parsedReq = await parseRequest(req);

      return await handler(parsedReq, context);
    } catch (err) {
      const status = err instanceof ApiError ? err.status : 500;
      const message = err.message || "Something failed.";

      console.error("============================");
      console.error("❌ Error: ", message, err);
      console.error("============================");

      return NextResponse.json({ message }, { status });
    }
  };
}
