import { CardTemplates } from "../controller/CardsTemplate.js";
import { Cart } from "../controller/Cart.js";
import { ModalAuth } from "../controller/ModalAuth.js";
import { ModalCartMobile } from "../controller/ModalCartMobile.js";
import { Filter } from "../controller/Filter.js";

document.querySelector(".btnCart").addEventListener("click", async () => {
  ModalCartMobile.show();
});

document.querySelector(".userProfile").addEventListener("click", () => {
  document.querySelector(".userProfileOpen").classList.toggle("profileToggle");
});

document.querySelector(".userProfileBtnLogin").addEventListener("click", () => {
  ModalAuth.login();
});
document
  .querySelector(".userProfileBtnRegister")
  .addEventListener("click", () => {
    ModalAuth.register();
  });

CardTemplates.updateScreen();
CardTemplates.updateDesktopCart();
CardTemplates.priceDivTemplate();
const totalPrice = document.getElementById("totalPrice");

const container = document.getElementById("container");

container.addEventListener("click", addProduct);

async function addProduct(event) {
  if (
    event.target.parentNode.nodeName === "BUTTON" ||
    event.target.nodeName === "BUTTON"
  ) {
    const id = Cart.getId(event);
    const product = await Cart.getOnePublicProduct(id);
    Cart.cartArray.push(product);
    localStorage.setItem("products", JSON.stringify(Cart.cartArray));
    CardTemplates.cartDesktopTemplate(product);
    totalPrice.innerText = Cart.sumProductsPrice();
    document.getElementById("totalProduct").innerText = Cart.cartArray.length;
  }
}

function btnDashCreate() {
  if (localStorage.getItem("token")) {
    const btnDash = document.createElement("span");
    btnDash.classList.add("material-symbols-rounded", "btnDash");
    btnDash.innerText = "dashboard";
    document.querySelector("header").appendChild(btnDash);
    btnDash.addEventListener(
      "click",
      () => (window.location.href = "./src/pages/dashboard.html")
    );
  }
}
btnDashCreate();
