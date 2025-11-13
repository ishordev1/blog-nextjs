import { connectionDB } from "@/lib/ConnectionDB";
import { Blogs } from "@/model/Blogs";
import { User } from "@/model/Users";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { title, description, imgUrl, visibility} = await req.json();
  
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
      visibility,
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
    const authToken = req.cookies.get("authToken")?.value;
    if (authToken) {
        try {
            const data = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
            await connectionDB();
            const user = await User.findById(data._id);
            
                if (user) {
                    const blogs = await Blogs.find({ userId: user._id })
                        .populate("userId", "name email")
                        .sort({ createdAt: -1 });

                    return NextResponse.json(
                        { message: "User blogs fetched successfully", success: true, blogs },
                        { status: 200 }
                    );
                }
            }

            catch (err) {
                console.log("Invalid token:", err.message);
                // If token invalid, fall through to public blogs below
            }


        }
    }