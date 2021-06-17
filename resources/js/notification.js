import Noty from "noty";

export const notification = function(status, message) {
  var n = new Noty({
    type: `${status}`,
    layout: "top",
    theme: "mint",
    text: `${message}`,
  }).show();
  setTimeout(() => {
    n.close();
  }, 1000);
};
