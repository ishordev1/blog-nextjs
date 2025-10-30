import { connectionDB } from "@/lib/ConnectionDB";
import { User } from "@/model/Users";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json();
  const user = new User({
    name,
    email,
    password: await bcrypt.hash(password, 10),
  });
  try {
    await connectionDB();
    const dbUser = await user.save();
    console.log(dbUser);
    return NextResponse.json(dbUser);
  } catch (err) {
    console.log("User creation failed");
    console.log(err);
    return NextResponse.json(
      { message: "User creation failed" },
      { status: 500 }
    );
  }
}
