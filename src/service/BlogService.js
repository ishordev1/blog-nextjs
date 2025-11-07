const { publicAxios } = require("@/helper/myAxios");

const saveBlog = async () => {
  try {
    const res = await publicAxios.post("/blog");
    return res.data;
  } catch (error) {
    console.log("blog not fetch", error);
  }
};

const getAllBlogs = async () => {
  try {
    const res = await publicAxios.get("/blog");
    return res.data;
  } catch (error) {
    console.log("blog not fetch", error);
  }
};
