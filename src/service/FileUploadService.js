import { publicAxios } from "@/helper/myAxios";

export async function fileUpload(file,folder){
try{
       const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);
    const response=await publicAxios.post('/uploadfile',formData,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
    return response.data.url;
}
catch(error){
    console.error("Error in file upload:", error);
    throw error;
}
}

export async function deleteFile(url) {
  try {
    const response = await publicAxios.post("/deletefile", { url });
    return response.data;
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}