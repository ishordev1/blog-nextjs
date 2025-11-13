import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadFileToCloudinary(file, folderPath) { 
    try {
           const arrayBuffer = await file.arrayBuffer();
           const buffer = Buffer.from(arrayBuffer);
       
           const result = await new Promise((resolve, reject) => {
             const uploadStream = cloudinary.uploader.upload_stream(
               { folder: folderPath }, 
               (error, result) => {
                 if (error) reject(error);
                 else resolve(result);
               }
             );
             uploadStream.end(buffer);
           });
        return { success: true, url: result.secure_url, public_id: result.public_id };
        } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return { success: false, error: error.message };
    }
}


export async function DeleteFileFromCloudinary(url) {
    try {
        if (!url) {
            throw new Error("No URL provided");
        }
// for delete it take folder with imageName
        
        // Extract public_id from Cloudinary URL
        // Example URL: https://res.cloudinary.com/daabanzir/image/upload/v1762965230/blog_website/profile/ruo0ehwxlen7tzlutbp8.png
        const parts = url.split("/");
        const publicIdWithExt = parts.slice(-3).join("/"); // folder/image.png
        const publicId = publicIdWithExt.split(".")[0]; // folder/image

        await cloudinary.uploader.destroy(publicId);
        return { success: true };
    } catch (error) {
        console.error("Error deleting file from Cloudinary:", error);
        return { success: false, error: error.message };
    }
}