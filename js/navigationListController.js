import { catalogTitle, navigationButtons, navigationList } from "./elements.js";
import { renderListProduct } from "./renderListProduct.js";

export const navigationListController = () => {
  navigationList.addEventListener("click", (e) => {
    const categoryItem = e.target.closest(".navigation__button");
    if (!categoryItem) return;
    navigationButtons.forEach((button) => {
      if (button === categoryItem) {
        button.classList.add("navigation__button_active");
        catalogTitle.textContent = button.textContent;
        renderListProduct(button.dataset.category);
      } else {
        button.classList.remove("navigation__button_active");
      }
    });
  });
};
