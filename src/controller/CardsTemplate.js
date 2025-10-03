import { Api } from "./Api.js";
import { Cart } from "./Cart.js";
import { ModalCartMobile } from "./ModalCartMobile.js";

class CardTemplates {
  static container = document.getElementById("container");

  static containerDash = document.getElementById("dashContainer");

  static cartDesktop = document.getElementById("cart-products");

  static fullCart = document.getElementById("cart");

  static productsTemplate(arrayObj) {
    const { id, imagem, nome, descricao, categoria, preco } = arrayObj;

    const productCardSec = document.createElement("section");
    const productImg = document.createElement("img");
    const productName = document.createElement("h2");
    const productDescription = document.createElement("p");
    const productCategory = document.createElement("p");
    const productPriceDiv = document.createElement("div");
    const productPrice = document.createElement("p");
    const productAddButton = document.createElement("button");
    const productAddButtonIcon = document.createElement("i");

    productCardSec.id = id;

    productImg.classList.add("productImg");
    productName.classList.add("productName");
    productDescription.classList.add("productDescription");
    productCategory.classList.add("productCategory");
    productPriceDiv.classList.add("price");
    productAddButton.classList.add("productAddBtn");
    productAddButtonIcon.classList.add("fa-solid", "fa-cart-plus");
    productImg.src = imagem;

    productName.innerText = nome;
    productDescription.innerText = descricao;
    productCategory.innerText = categoria;
    productPrice.innerText = preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    productAddButton.append(productAddButtonIcon);
    productPriceDiv.append(productPrice, productAddButton);
    productCardSec.append(
      productImg,
      productName,
      productDescription,
      productCategory,
      productPriceDiv
    );
    this.container.append(productCardSec);
  }

  static dashboardTemplate(arrayObj) {
    const { id, imagem, nome, categoria, descricao } = arrayObj;

    const productDivBox = document.createElement("div");
    const productDiv = document.createElement("div");
    const img = document.createElement("img");
    const name = document.createElement("h2");
    const categoryDiv = document.createElement("div");
    const category = document.createElement("h3");
    const descriptionDiv = document.createElement("div");
    const description = document.createElement("p");
    const btnDiv = document.createElement("div");
    const editBtn = document.createElement("button");
    const editImg = document.createElement("img");
    const removeBtn = document.createElement("button");
    const removeImg = document.createElement("img");

    productDivBox.classList.add("product-box", "dashboard-container");
    productDiv.classList.add("product");
    categoryDiv.classList.add("category");
    descriptionDiv.classList.add("description");
    btnDiv.classList.add("action");
    editBtn.classList.add("editBtn");
    editImg.classList.add("editBtn");
    removeBtn.id = "removeBtn";
    removeBtn.classList.add("removeBtn");
    removeImg.classList.add("removeBtn");

    productDivBox.id = id;
    img.src = imagem;
    name.innerText = nome;
    category.innerText = categoria;
    description.innerText = descricao;
    editImg.src = "../images/Button Circle.png";
    removeImg.src = "../images/trash.png";

    productDiv.append(img, name);
    categoryDiv.append(category);
    descriptionDiv.append(description);
    editBtn.appendChild(editImg);
    removeBtn.appendChild(removeImg);
    btnDiv.append(editBtn, removeBtn);
    productDivBox.append(productDiv, categoryDiv, descriptionDiv, btnDiv);
    this.containerDash.append(productDivBox);
  }

  static cartDesktopTemplate(arrayObj) {
    const { imagem, nome, categoria, preco, id } = arrayObj;

    const productDiv = document.createElement("div");
    const figureTag = document.createElement("figure");
    const productImg = document.createElement("img");
    const infoDiv = document.createElement("div");
    const productName = document.createElement("p");
    const productCategory = document.createElement("p");
    const productPrice = document.createElement("p");
    const removeBtn = document.createElement("button");
    const removeImg = document.createElement("img");

    removeBtn.addEventListener("click", removeProduct);

    async function removeProduct(event) {
      const productId = event.currentTarget.id;

      const findProduct = Cart.cartArray.find((elem) => elem.id === productId);

      const findIndex = Cart.cartArray.findIndex(
        (elem) => elem.id === findProduct.id
      );

      Cart.cartArray.splice(findIndex, 1);

      localStorage.setItem("products", JSON.stringify(Cart.cartArray));

      document.getElementById("totalPrice").innerText = Cart.sumProductsPrice();

      document.getElementById("totalProduct").innerText = Cart.cartArray.length;

      CardTemplates.updateDesktopCart();
    }

    productDiv.classList.add("cartBox");
    figureTag.classList.add("productFigure");
    productImg.classList.add("cartImg");
    infoDiv.classList.add("cartInfoName");
    productName.classList.add("cartName");
    productCategory.classList.add("productCategory");
    productPrice.classList.add("cartPrice");
    removeBtn.classList.add("removeBtn");
    removeImg.classList.add("removeImg");

    productImg.src = imagem;
    productName.innerText = nome;
    productCategory.innerText = categoria;
    productPrice.innerText = preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    removeImg.src = "./src/images/trash.png";
    removeBtn.id = id;

    figureTag.append(productImg);
    infoDiv.append(productName, productCategory, productPrice);
    removeBtn.appendChild(removeImg);
    productDiv.append(figureTag, infoDiv, removeBtn);
    this.cartDesktop.appendChild(productDiv);
  }

  static cartMobileTemplate(arrayObj) {
    const { imagem, nome, categoria, preco, id } = arrayObj;

    const productDiv = document.createElement("div");
    const figureTag = document.createElement("figure");
    const productImg = document.createElement("img");
    const infoDiv = document.createElement("div");
    const productName = document.createElement("p");
    const productCategory = document.createElement("p");
    const productPrice = document.createElement("p");
    const removeBtn = document.createElement("button");
    const removeImg = document.createElement("img");

    removeBtn.addEventListener("click", (e) => {
      ModalCartMobile.removeProduct(e);
      document.querySelector(".priceCartMobile").innerText =
        Cart.sumProductsPrice();
      document.querySelector(".totalCartMobile").innerText =
        Cart.cartArray.length;
      document.querySelector(".divProducts").innerHTML = "";
      Cart.cartArray.forEach((elem) => {
        document
          .querySelector(".divProducts")
          .append(CardTemplates.cartMobileTemplate(elem));
      });
    });

    productDiv.classList.add("cartBoxMobile");
    figureTag.classList.add("productFigureMobile");
    productImg.classList.add("cartImgMobile");
    infoDiv.classList.add("cartInfoNameMobile");
    productName.classList.add("cartNameMobile");
    productCategory.classList.add("productCategoryMobile");
    productPrice.classList.add("cartPriceMobile");
    removeBtn.classList.add("removeBtnMobile");
    removeImg.classList.add("removeImgMobile");

    productImg.src = imagem;
    productName.innerText = nome;
    productCategory.innerText = categoria;
    productPrice.innerText = preco.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    removeImg.src = "./src/images/trash.png";
    removeBtn.id = id;

    figureTag.append(productImg);
    infoDiv.append(productName, productCategory, productPrice);
    removeBtn.appendChild(removeImg);
    productDiv.append(figureTag, infoDiv, removeBtn);
    return productDiv;
  }

  static priceDivTemplate() {
    const div = document.createElement("div");
    const divSum = document.createElement("div");
    const total = document.createElement("p");
    const totalPrice = document.createElement("p");
    const divQuantity = document.createElement("div");
    const productQuantity = document.createElement("p");
    const productNumber = document.createElement("p");

    div.classList.add("productInfo");
    divSum.classList.add("divSum");
    divQuantity.classList.add("divSum");
    totalPrice.id = "totalPrice";
    productNumber.id = "totalProduct";

    productQuantity.innerText = "Quantidade";
    total.innerText = "Total";
    productNumber.innerText = Cart.cartArray.length;
    totalPrice.innerText = Cart.sumProductsPrice();

    divSum.append(total, totalPrice);
    divQuantity.append(productQuantity, productNumber);
    div.append(divSum, divQuantity);
    this.fullCart.append(div);
  }

  static async updateScreen() {
    const publicProducts = await Api.getPublicProducts();

    publicProducts.forEach((elem) => CardTemplates.productsTemplate(elem));
  }

  static async updateDashboardScreen() {
    const myProducts = await Api.getPrivateProducts();

    myProducts.forEach((elem) => CardTemplates.dashboardTemplate(elem));
  }

  static updateDesktopCart() {
    if (Cart.cartArray.length >= 0) {
      this.cartDesktop.innerHTML = "";
      Cart.cartArray.forEach((elem) => {
        this.cartDesktopTemplate(elem);
      });
    }
  }
}

export { CardTemplates };
