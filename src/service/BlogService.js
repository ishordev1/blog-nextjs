const { publicAxios } = require("@/helper/myAxios");

export const saveBlog = async (blog) => {
  try {
    const res = await publicAxios.post("/blog", blog);
    return res.data;
  } catch (error) {
    console.log("blog not fetch", error);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await publicAxios.get("/blog");
    return res.data;
  } catch (error) {
    console.log("blog not fetch", error);
  }
};


export const deleteBlog=async (blogId)=>{
  try{
const res=await publicAxios.delete(`/blog/${blogId}`);
return res.data;
  }
  catch(error){
    console.log("blog not delete", error);
  }
}


export const getBlogById=async(blogId)=>{
  try{
    const res=await publicAxios.get(`/blog/${blogId}`);
    return res.data;
  }
  catch(error){
    console.log("blog not fetch by id", error);
  }
}