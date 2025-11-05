import { connectionDB } from "@/lib/ConnectionDB";
import { User } from "@/model/Users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export async function GET(request) {
  const authToken = request.cookies.get("authToken")?.value;

  if (!authToken) {
    return NextResponse.json({
      user: null,
    });
  }
  try {
    const data = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    await connectionDB();
    const user = await User.findById(data._id).select("-password");
    return NextResponse.json({ user });
  } catch (error) {
    console.log(error);
    const response = NextResponse.json({
      message: "logout successfully",
      success: true,
    });
    response.cookies.set("authToken", "", {
      expiresIn: new Date(0),
    });
    return response;
  }
}
