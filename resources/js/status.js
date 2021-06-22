import { moment } from "moment";
export const Order_status = (order) => {
  let flag = true;
  const show = document.querySelectorAll(".status_line");
  let time = document.createElement("small");

  show.forEach((i) => {
    if (flag) {
      i.classList.add("step-completed");
    }
    if (i.dataset.status === order.status) {
      if (i.nextElementSibling) i.nextElementSibling.classList.add("current");
      flag = false;
      let date=new Date(order.updatedAt);
      let dates = `${date.getHours()}:${date.getMinutes()}`;
      time.innerText = dates;

      i.appendChild(time);
    }
  });
};
