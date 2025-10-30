import { publicAxios } from "@/helper/myAxios";

export const signup = async (user) => {
  try {
    const res = await publicAxios.post("/signup", user);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const signin = async (data) => {
  try {
    const res = await publicAxios.post("/signin", data);
    return res.data;
  } catch (err) {
    throw err;
  }
};
