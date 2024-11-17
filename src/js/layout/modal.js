const modal = document.querySelector(".event-modal");
const modalSmallImage = document.querySelector(".event-modal__s-photo");
const modalLargeImage = document.querySelector(".event-modal__main-photo");
const modalName = document.querySelector(".info");
const modalDate = document.querySelector(".date");
const modalTime = document.querySelector(".time");
const modalVenue = document.querySelector(".venue");
const modalState = document.querySelector(".state");
const modalPerformers = document.querySelector(".performers");
const modalPriceStandard = document.querySelector(".price-standard");
const modalPriceVIP = document.querySelector(".price-vip");

export const openModal = (eventData) => {
  modalSmallImage.src = eventData.image;
  modalLargeImage.src = eventData.image;
  modalName.textContent = eventData.name;
  modalDate.textContent = `Date: ${eventData.date}`;
  modalTime.textContent = `Time: ${eventData.time}`;
  modalVenue.textContent = `Venue: ${eventData.venue}`;
  modalState.textContent = `State: ${eventData.state}`;
  modalPerformers.textContent = `Performers: ${eventData.performers}`;
  modalPriceStandard.textContent = `Standard Price: ${eventData.priceStandard}`;
  modalPriceVIP.textContent = `VIP Price: ${eventData.priceVIP}`;

  modal.classList.remove("hidden");
  modal.classList.add("open");
};

const closeModalButton = document.querySelector(".event-modal__close");
if (closeModalButton) {
  closeModalButton.addEventListener("click", () => {
    modal.classList.remove("open");
    modal.classList.add("hidden");
  });
}
