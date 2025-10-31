import { connectionDB } from "@/lib/ConnectionDB";
import { User } from "@/model/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
export async function POST(req) {
  const { email, password } = await req.json();
  try {
    if (email == "" || password == "") {
      return NextResponse.json(
        { message: "email and password is required", success: false },
        { status: 500 }
      );
    }
    await connectionDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "email is wrong..", success: false });
    }
    const isCompare = await bcrypt.compare(password, user.password);
    if (!isCompare) {
      return NextResponse.json({
        message: "password is wrong..",
        success: false,
      });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    const response = NextResponse.json({
      message: "user login successfully",
      success: true,
    });

    response.cookies.set("authToken", token, { httpOnly: true });
    return response;
  } catch (err) {
    return NextResponse.json({ message: err.message, success: false });
  }
}
