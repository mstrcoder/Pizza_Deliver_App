import axios from "axios";
import { notification } from "./notification.js";
export const cart = async (session) => {
  try {
    // console.log(session);
    const res = await axios({
      method: "POST",
      url: "/cart",
      data: session,
    });
    if (res.data.status === "Success!") {
      location.assign("/cart");
    }
  } catch (err) {
    notification("error", `${err.response.data.message} Please Login To Add item to cart`);
  }
};
