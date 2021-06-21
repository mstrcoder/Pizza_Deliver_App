import axios from "axios";
import { notification } from "./notification.js";
export const login = async (email, password) => {
  try {
    //this function will enable user/login request
    const res = await axios({
      method: "POST",
      url: "/login",
      data: {
        email,
        password,
      },
    });

    if (res.data.status === "Success!") {
      notification("success", "Logged in Successfully");

      location.assign("/");
    }
  } catch (err) {
    //  console.log('error');
    notification("error", err.response.data.message);
    //  console.log("galat hai pagale!!");
  }
};
export const signup = async (name, email, password) => {
  try {
    //this function will enable user/login request
    const res = await axios({
      method: "POST",
      url: "/signup",
      data: {
        name,
        email,
        password,
      },
    });
    if (res.data.status === "Success!") {
      location.assign("/");
    }
  } catch (err) {
    notification("error", err.response.data.message);
  }
};
export const logout = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: "/logout",
    });

    if (res.data.status === "success") {
      notification("success", "Logged out Successfully");
      location.assign("/");
    }
  } catch (err) {
    notification("error", err.response.data.message);
  }
};
export const gooleAuth = async () => {
  try {
    //this function will enable user/login request
    const res = await axios({
      method: "GET",
      url: "/auth/google"
    });

    if (res.data.status === "Success!") {
      notification("success", "Logged in Successfully");

      location.assign("/");
    }
  } catch (err) {
    //  console.log('error');
    notification("error", err.response.data.message);
    //  console.log("galat hai pagale!!");
  }
};
