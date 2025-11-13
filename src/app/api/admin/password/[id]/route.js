import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectionDB } from "@/lib/ConnectionDB";
import { Password } from "@/model/Passwords";

// 🟡 GET one password (decrypt before returning)
export async function GET(req,  context ) {
  try {
    await connectionDB();
    const authToken = req.cookies.get("authToken")?.value;
    if (!authToken)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    const { id } = await context.params;

    const passwordDoc = await Password.findOne({ _id: id, userId: decoded._id });
    if (!passwordDoc)
      return NextResponse.json({ success: false, message: "Password not found" }, { status: 404 });

    const decrypted = passwordDoc.decryptPassword();

    return NextResponse.json({
      success: true,
      message: "Password fetched successfully",
      password: { ...passwordDoc.toObject(), password: decrypted },
    });
  } catch (error) {
    console.error("Error fetching password:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 🟠 UPDATE password
export async function PUT(req, context) {
  try {
    await connectionDB();
    const authToken = req.cookies.get("authToken")?.value;
    if (!authToken)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    const { id } = context.params;
    const { title, username, password, note, category } = await req.json();

    const passwordDoc = await Password.findOne({ _id: id, userId: decoded._id });
    if (!passwordDoc)
      return NextResponse.json({ success: false, message: "Password not found" }, { status: 404 });

    if (title) passwordDoc.title = title;
    if (username) passwordDoc.username = username;
    if (password) passwordDoc.password = password; // will be re-encrypted
    if (note !== undefined) passwordDoc.note = note;
    if (category) passwordDoc.category = category;

    await passwordDoc.save();

    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Error updating password:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// 🔴 DELETE password
export async function DELETE(req,  context ) {
  try {
    await connectionDB();
    const authToken = req.cookies.get("authToken")?.value;
    if (!authToken)
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
      const { id } = await context.params;

    const deleted = await Password.findOneAndDelete({ _id: id, userId: decoded._id });
    if (!deleted)
      return NextResponse.json({ success: false, message: "Password not found" }, { status: 404 });

    return NextResponse.json({
      success: true,
      message: "Password deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting password:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
