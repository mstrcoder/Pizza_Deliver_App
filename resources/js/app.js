import { cart } from "./add_to_cart";
import { notification } from "./notification.js";
import { gooleAuth } from "./auth";
import { Order_status } from "./status";
const add = document.querySelectorAll(".add-to-cart");
const addtocarts = document.querySelector("#cartCounter");
const status = document.querySelector("#hiddenInput")
  ? document.querySelector("#hiddenInput").value
  : null;
// const login = document.querySelector(".login");
localStorage.setItem("session", "");
var a = [];
add.forEach((x) => {
  x.addEventListener("click", (e) => {
    e.preventDefault();
    let val = JSON.parse(x.getAttribute("data-pizza"));
    val.qty = 1;
    notification("success", "Item Added To Cart!");

    let flag = 0;
    a.forEach((ele) => {
      if (ele.name == val.name) {
        ele.qty++;
        flag = 1;
        return;
      }
    });
    if (!flag) {
      a.push(val);
    }
  });
});

addtocarts.addEventListener("click", (e) => {
  cart(a);
});
if (status) {
  Order_status(JSON.parse(status));
}

// login.addEventListener("submit", (e) => {
//   const email = document.getElementById("username").value;
//   const password = document.getElementById("password").value;
//   console.log(email, password);
// });
