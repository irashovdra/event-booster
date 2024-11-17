export const renderPagination = (events, currentPage, filteredEvents) => {
  const paginationContainer = document.querySelector(".footer__pagination");
  paginationContainer.innerHTML = "";

  const totalPages = Math.ceil(events.length / 20);

  if (totalPages > 1) {
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i;
      pageButton.classList.add("pagination__button");
      if (i === currentPage) {
        pageButton.classList.add("pagination__button--active");
      }

      pageButton.addEventListener("click", () => {
        currentPage = i;
        renderTickets(filteredEvents, currentPage);
      });

      paginationContainer.appendChild(pageButton);
    }
  }
};
