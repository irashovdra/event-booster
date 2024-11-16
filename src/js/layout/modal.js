const modal = document.querySelector(".event-modal");
const closeButton = document.querySelector(".event-modal__close");

export const openModal = (eventData) => {
  const eventImage = modal.querySelector(".event-modal__s-photo");
  const eventName = modal.querySelector(".modal-list__text.info");
  const eventDate = modal.querySelector(".modal-list__text.date");
  const eventVenue = modal.querySelector(".modal-list__text.venue");

  if (eventImage && eventName && eventDate && eventVenue) {
    eventImage.src = eventData.image || "";
    eventName.textContent = eventData.name || "No info available";
    eventDate.textContent = eventData.date || "No date available";
    eventVenue.textContent = eventData.venue || "No venue available";

    modal.classList.remove("hidden"); // Показуємо модалку
  } else {
    console.error("Some modal elements are missing");
  }
};

export const closeModal = () => {
  modal.classList.add("hidden"); // Приховуємо модалку
};

closeButton.addEventListener("click", closeModal);
