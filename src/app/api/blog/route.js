import { connectionDB } from "@/lib/ConnectionDB";
import { Blogs } from "@/model/Blogs";
import { NextResponse } from "next/server";



export async function GET(req) {
  await connectionDB();

  try {
    // If not logged in (or token invalid) → return only public blogs
    const blogs = await Blogs.find({ visibility: "public" })
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Public blogs fetched successfully", success: true, blogs },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error fetching blogs:", err);
    return NextResponse.json(
      { message: "Failed to fetch blogs", success: false },
      { status: 500 }
    );
  }
}