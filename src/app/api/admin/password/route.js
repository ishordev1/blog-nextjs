import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectionDB } from "@/lib/ConnectionDB";
import { Password } from "@/model/Passwords";



export async function POST(req) {
  try {
    await connectionDB();
    const authToken = req.cookies.get("authToken")?.value;
    if (!authToken)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    const body = await req.json();

    const passwordDoc = new Password({
      ...body,
      userId: decoded._id,
    });

   const data= await passwordDoc.save();

    return NextResponse.json({
      success: true,
      message: "Password saved successfully",
      password:data
    });
  } catch (error) {
    console.error("Error saving password:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function GET(req) {
  try {
    await connectionDB();

    const authToken = req.cookies.get("authToken")?.value;
    if (!authToken)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    const passwords = await Password.find({ userId: decoded._id }).sort({ createdAt: -1 });

    // Decrypt before sending
    const decryptedPasswords = passwords.map((p) => ({
      ...p.toObject(),
      password: typeof p.decryptPassword === "function" ? p.decryptPassword() : p.password,
    }));

    return NextResponse.json({
      success: true,
      message: "Passwords fetched successfully",
      passwords: decryptedPasswords,
    });
  } catch (error) {
    console.error("Error fetching passwords:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
