import { API_URL, PREFIX_PRODUCT } from "./const.js";
import { catalogList, countAmount, modalDelivery, modalProduct, modalProductBtn, order, orderCount, orderList, orderSubmit, orderTotalAmount, orderWrapTitle } from "./elements.js";
import { getData } from "./getData.js";
import { orderController } from "./orderController.js";

const getCart = () => {
  const cartList = localStorage.getItem("cart");
  if (cartList) {
    return JSON.parse(cartList);
  } else {
    return [];
  }
};

const renderCartList = async () => {
  const cartList = getCart();
  orderSubmit.disabled = !cartList.length;
  const allIdProduct = cartList.map((item) => item.id);
  const data = cartList.length ? await getData(`${API_URL}${PREFIX_PRODUCT}?list=${allIdProduct}`) : [];
  const countProduct = cartList.reduce((acc, item) => {
    return (acc += item.count);
  }, 0);

  orderCount.textContent = countProduct;

  const cartItems = data.map((item) => {
    const li = document.createElement("li");
    li.classList.add("order__item");
    li.dataset.idProduct = item.id;

    const product = cartList.find((cartItem) => {
      return cartItem.id === item.id;
    });

    li.innerHTML = `
            <img src="${API_URL}/${item.image}" alt="${item.title}" class="order__image" />
            <div class="order__product">
            <h3 class="order__product-title">${item.title}</h3>
            <p class="order__product-weight">${item.weight}г</p>
            <p class="order__product-price">${item.price}₽</p>
            </div>
            <div class="order__product-count count">
            <button class="count__minus">-</button>
            <p class="count__amount">${product.count}</p>
            <button class="count__plus">+</button>
            </div>
            `;
    return li;
  });

  orderList.textContent = ``;
  orderList.append(...cartItems);
  orderTotalAmount.textContent = data.reduce((acc, item) => {
    const product = cartList.find((cartItem) => cartItem.id === item.id);
    return acc + item.price * product.count;
  }, 0);
};

const updateCartList = (cartList) => {
  localStorage.setItem("cart", JSON.stringify(cartList));
  renderCartList();
};

const addCart = (id, count = 1) => {
  const cartList = getCart();
  const product = cartList.find((item) => {
    return item.id === id;
  });
  if (product) {
    product.count += count;
  } else {
    cartList.push({ id, count });
  }
  updateCartList(cartList);
};

const removeCart = (id) => {
  const cartList = getCart();
  const index = cartList.findIndex((item) => {
    return item.id === id;
  });
  if (index !== -1) {
    cartList[index].count > 1 ? (cartList[index].count -= 1) : cartList.splice(index, 1);
  }
  updateCartList(cartList);
};

export const clearCart = () => {
  localStorage.removeItem("cart");
  renderCartList();
};

const cartController = () => {
  modalProduct.addEventListener("click", (e) => {
    if (e.target.closest(".count__plus")) {
      e.target.previousElementSibling.textContent = parseInt(e.target.previousElementSibling.textContent) + 1;
    }
    if (e.target.closest(".count__minus")) {
      if (parseInt(e.target.nextElementSibling.textContent) > 1) {
        e.target.nextElementSibling.textContent = parseInt(e.target.nextElementSibling.textContent) - 1;
      }
    }
  });
  catalogList.addEventListener("click", (e) => {
    if (e.target.closest(".product__add")) {
      addCart(e.target.closest(".product").dataset.idProduct);
    }
  });
  modalProductBtn.addEventListener("click", () => {
    addCart(modalProductBtn.dataset.idProduct, parseInt(countAmount.textContent));
  });
  orderWrapTitle.addEventListener("click", () => {
    order.classList.toggle("order_open");
  });
  orderSubmit.addEventListener("click", () => {
    modalDelivery.classList.add("modal_open");
  });
  modalDelivery.addEventListener("click", (e) => {
    if (e.target.closest(".modal__close") || modalDelivery === e.target) {
      modalDelivery.classList.remove("modal_open");
    }
  });
  orderList.addEventListener("click", (e) => {
    if (e.target.closest(".count__minus")) {
      removeCart(e.target.closest(".order__item").dataset.idProduct);
    }
    if (e.target.closest(".count__plus")) {
      addCart(e.target.closest(".order__item").dataset.idProduct);
    }
  });
};

export const cartInit = () => {
  cartController();
  renderCartList();
  orderController(getCart);
};
