import { DeleteFileFromCloudinary, uploadFileToCloudinary } from "@/lib/Cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    let folder = data.get("folder") || "default_folder"; 
folder="blog_website/"+folder
    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

const res=await uploadFileToCloudinary(file,folder)
return NextResponse.json(res);
  
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


export async function DELETE(req) {
  try {
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: "No URL provided" }, { status: 400 });
    }
await DeleteFileFromCloudinary(url)
    return NextResponse.json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}