import { renderTickets } from "./app"; // Імпортуємо renderTickets з app.js

const paginationContainer = document.querySelector(".footer__pagination");

export const renderPagination = (events) => {
  const totalPages = Math.ceil(events.length / 20); // 20 - кількість елементів на сторінці
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination__button");
    if (i === 1) button.classList.add("active"); // Додаємо активний клас на першу сторінку
    button.addEventListener("click", () => {
      renderTickets(events, i); // Викликаємо renderTickets при натисканні
    });
    paginationContainer.appendChild(button);
  }
};
