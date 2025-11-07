import { connectionDB } from "@/lib/ConnectionDB";
import { Blogs } from "@/model/Blogs";
import { User } from "@/model/Users";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { title, description, imgUrl } = await req.json();
  // console.log("data" + title, description, imgUrl, userId);
  try {
    await connectionDB();
    const authToken = req.cookies.get("authToken")?.value;
    const data = jwt.verify(authToken, process.env.JWT_SECRET_KEY);

    const user = await User.findOne({ _id: data._id });
    // console.log(user);

    if (!user) {
      return NextResponse.json({
        message: "user not found of this id",
        success: false,
      });
    }
    const newBlog = new Blogs({
      title,
      description,
      imgUrl,
      userId: user._id,
    });
    const dbBlogs = await newBlog.save();
    console.log(dbBlogs);
    return NextResponse.json(dbBlogs);
  } catch (err) {
    console.log("Blog not saved..");
    console.log(err);
    return NextResponse.json({ message: "Blog not saved" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectionDB();

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter"); // "public" | "private" | "all"
    const userId = searchParams.get("userId"); // optional user filter

    let query = {};

    // Apply visibility filter
    if (filter === "public") query.visibility = "public";
    else if (filter === "private") query.visibility = "private";

    // Apply user filter (if provided)
    if (userId) query.userId = userId;

    const blogs = await Blogs.find(query).populate("userId", "name email");

    return NextResponse.json(
      { message: "Blogs fetched successfully", success: true, blogs },
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
