import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { getData } from "./getData.js";
import { modalProduct, ingredientsList, modalProductTitle, modalProductPriceCount, modalProductImg, modalProductDescription, ingredientsCalories, modalProductBtn, countAmount } from "./elements.js";

export const openModal = async (id) => {
  const product = await getData(`${API_URL}${PREFIX_PRODUCT}/${id}`);

  const ingredientListItems = product.ingredients.map((ingredient) => {
    const li = document.createElement("li");
    li.classList.add("ingredients__item");
    li.textContent = ingredient;
    return li;
  });

  modalProductTitle.textContent = product.title;
  modalProductImg.src = `${API_URL}/${product.image}`;
  modalProductDescription.textContent = product.description;
  modalProductPriceCount.textContent = product.price;
  modalProductBtn.dataset.idProduct = product.id;
  ingredientsList.textContent = ``;
  ingredientsList.append(...ingredientListItems);
  ingredientsCalories.textContent = `${product.weight}г, ккал ${product.calories}`;
  countAmount.textContent = 1;
  modalProduct.classList.add("modal_open");
};
