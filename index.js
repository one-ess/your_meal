import { modalProduct, catalogList } from "./js/elements.js";
import { openModal } from "./js/openModal.js";
import { renderListProduct } from "./js/renderListProduct.js";
import { navigationListController } from "./js/navigationListController.js";
import { cartInit } from "./js/cart.js";

modalProduct.addEventListener("click", (e) => {
  if (e.target.closest(".modal__close") || e.target === modalProduct) {
    modalProduct.classList.remove("modal_open");
  }
});

catalogList.addEventListener("click", (e) => {
  if (e.target.closest(".product__detail") || e.target.closest(".product__image")) {
    const id = e.target.closest(".product").dataset.idProduct;
    openModal(id);
  }
});

const init = () => {
  renderListProduct();
  navigationListController();
  cartInit();
};

init();
