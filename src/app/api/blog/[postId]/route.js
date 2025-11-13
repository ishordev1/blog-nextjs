import { connectionDB } from "@/lib/ConnectionDB";
import { Blogs } from "@/model/Blogs";
import { NextResponse } from "next/server";


export async function GET(req, context) {
  try {
    await connectionDB();
    const { postId } = await context.params;

    // find blog by ID
    // console.log(postId, "postId");

    const blog = await Blogs.findOne({ _id: postId, visibility: "public" }).populate("userId", "name email");
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Blog fetched successfully", success: true, blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { message: "Failed to fetch post", success: false },
      { status: 500 }
    );
  }
}