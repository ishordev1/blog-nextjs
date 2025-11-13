const { publicAxios } = require("@/helper/myAxios");

export const saveBlog = async (blog) => {
  try {
    // console.log(blog);
    
    const res = await publicAxios.post("/admin/blog", blog);
    return res.data;
  } catch (error) {
  console.log(error);
    throw new Error(error.response.data.message);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await publicAxios.get("/blog");
    return res.data;
  } catch (error) {
 console.log(error);
    throw new Error(error.response.data.message);
  
  }
};

export const getAllBlogsByOwner = async () => {
  try {
    const res = await publicAxios.get("/admin/blog");
    return res.data;
  } catch (error) {
 console.log(error);
    throw new Error(error.response.data.message);
  
  }
};



export const deleteBlog=async (blogId)=>{
  try{
const res=await publicAxios.delete(`/admin/blog/${blogId}`);
return res.data;
  }
  catch(error){
    console.log(error);
    throw new Error(error.response.data.message || "Error deleting blog");
    
  }
}


export const getBlogById=async(blogId)=>{
  try{
    const res=await publicAxios.get(`/blog/${blogId}`);
    return res.data;
  }
  catch(error){
 console.log(error);
    throw new Error(error.response.data.message);
  }
}