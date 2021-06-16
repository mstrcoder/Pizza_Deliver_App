import { cart } from "./add_to_cart";
const add = document.querySelectorAll(".add-to-cart");
const addtocarts = document.querySelector("#cartCounter");
console.log(add);
localStorage.setItem("session", "");
var a = [];
add.forEach((x) => {
  x.addEventListener("click", (e) => {
    e.preventDefault();
    let val = JSON.parse(x.getAttribute("data-pizza"));
    val.qty = 1;
    alert("Your Pizza Added In cart");
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
