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

export const getCurrentUser = async () => {
  try {
    const res = await publicAxios.get("/current-user");
    // console.log("service:" + res.data.user);
    return res.data.user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const logoutUser = async () => {
  try {
    const res = await publicAxios.post("/logout");
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
