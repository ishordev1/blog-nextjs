import { connectionDB } from "@/lib/ConnectionDB";
import { Blogs } from "@/model/Blogs";
import { NextResponse } from "next/server";
import Users from "@/model/Users";
import jwt from "jsonwebtoken";
export async function GET(req, context) {
  try {
    await connectionDB();
    const { postId } = await context.params;

    // find blog by ID
    // console.log(postId, "postId");

    const blog = await Blogs.findById(postId).populate("userId", "name email");
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

export async function PUT(req, context) {
  try {
    await connectionDB();

    const { postId } = await context.params;
    const data = await req.json(); // update fields
    const token = req.cookies.get("authToken")?.value; // get token from cookies

    if (!token) {
      return NextResponse.json(
        { message: "No token provided", success: false },
        { status: 401 }
      );
    }

    // verify token
    let decodedUser;
    try {
      decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token", success: false },
        { status: 401 }
      );
    }

    // find the blog
    const blog = await Blogs.findById(postId);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    // check ownership
    if (blog.userId.toString() !== decodedUser._id) {
      return NextResponse.json(
        { message: "You are not the owner of this post", success: false },
        { status: 403 }
      );
    }

    // update only if owner
    const updatedBlog = await Blogs.findByIdAndUpdate(postId, data, {
      new: true,
      runValidators: true,
    });

    return NextResponse.json(
      {
        message: "Blog updated successfully",
        success: true,
        blog: updatedBlog,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Error updating blog:", err);
    return NextResponse.json(
      { message: "Failed to update blog", success: false },
      { status: 500 }
    );
  }
}



export async function DELETE(req, context) {
  try {
    await connectionDB();

    const { postId } = await context.params;
    const token = req.cookies.get("authToken")?.value; // get token from cookies

    if (!token) {
      return NextResponse.json(
        { message: "No token provided", success: false },
        { status: 401 }
      );
    }

    // verify token
    let decodedUser;
    try {
      decodedUser = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
      return NextResponse.json(
        { message: "Invalid or expired token", success: false },
        { status: 401 }
      );
    }

    // find the blog
    const blog = await Blogs.findById(postId);
    if (!blog) {
      return NextResponse.json(
        { message: "Blog not found", success: false },
        { status: 404 }
      );
    }

    // check ownership
    if (blog.userId.toString() !== decodedUser._id) {
      return NextResponse.json(
        { message: "You are not the owner of this post", success: false },
        { status: 403 }
      );
    }

    // delete the blog
    await Blogs.findByIdAndDelete(postId);
    return NextResponse.json(
      { message: "Blog deleted successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { message: "Failed to delete blog", success: false },
      { status: 500 }
    );
  }
}
  