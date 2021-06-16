import axios from "axios";
export const cart = async (session) => {
  try {
    // console.log(session);
    const res = await axios({
      method: "POST",
      url: "/cart",
      data:session
    });
    console.log(res.data.status);
    if (res.data.status === "Success!") {
      location.assign("/cart");
    }
  } catch (err) {
    alert("error");
  }
};
