import { getTickets } from "./api/getTickets";
import { createTicket } from "./layout/createTickets";
import { openModal } from "./layout/modal";

const ticketsList = document.querySelector(".tickets-list");
const searchInput = document.querySelector(
  ".header-list__filling[type='text']"
);
const countrySelect = document.querySelector(
  ".header-list__filling[aria-label='Choose location']"
);

let allEvents = [];
let filteredEvents = [];
let currentPage = 1;
const itemsPerPage = 20;

const renderTickets = (events, page = 1) => {
  const start = (page - 1) * itemsPerPage;
  const end = page * itemsPerPage;
  const paginatedEvents = events.slice(start, end);

  ticketsList.innerHTML = paginatedEvents.length
    ? paginatedEvents
        .map((event) => {
          const eventImage = event.images
            ? event.images[0].url
            : "https://via.placeholder.com/150";
          const eventName = event.name || "No Event Name";
          const eventDate = event.dates?.start?.localDate || "No Date";
          const eventVenue = event._embedded?.venues?.[0]?.name || "No Venue";
          return createTicket({
            eventImage,
            eventName,
            eventDate,
            eventVenue,
          });
        })
        .join("")
    : "<p>No events found.</p>";

  renderPagination(events, currentPage, filteredEvents);
};

getTickets()
  .then((response) => response.json())
  .then((data) => {
    if (data._embedded && data._embedded.events) {
      allEvents = data._embedded.events;
      if (allEvents.length > 0) {
        filteredEvents = allEvents;
        renderTickets(filteredEvents, currentPage);
        populateCountryOptions(allEvents, countrySelect);
      } else {
        ticketsList.innerHTML = "<p>No events found.</p>";
      }
    } else {
      ticketsList.innerHTML = "<p>No events found.</p>";
    }
  })
  .catch((error) => {
    console.log(error);
  });

searchInput.addEventListener("input", (event) => {
  const query = event.target.value;
  const selectedCountry = countrySelect.value;
  filterEvents(
    query,
    selectedCountry,
    allEvents,
    filteredEvents,
    renderTickets,
    currentPage
  );
});

countrySelect.addEventListener("change", (event) => {
  const query = searchInput.value;
  const selectedCountry = event.target.value;
  filterEvents(
    query,
    selectedCountry,
    allEvents,
    filteredEvents,
    renderTickets,
    currentPage
  );
});

ticketsList.addEventListener("click", (event) => {
  const clickedImage = event.target.closest(".ticket__photo");
  if (clickedImage) {
    const ticketCard = clickedImage.closest(".ticket");
    const eventIndex = [...ticketsList.children].indexOf(ticketCard);
    const event = filteredEvents[eventIndex];

    const eventData = {
      image: clickedImage.src,
      name: event.name || "No info available",
      date: event.dates?.start?.localDate || "No date available",
      time: event.dates?.start?.localTime || "No time available",
      venue: event._embedded?.venues?.[0]?.name || "No venue available",
      state: event._embedded?.venues?.[0]?.state?.name || "No state available",
      performers:
        event._embedded?.attractions
          ?.map((attraction) => attraction.name)
          .join(", ") || "No performers listed",
      priceStandard: event.priceRanges?.[0]?.min
        ? `$${event.priceRanges[0].min}`
        : "No standard price info",
      priceVIP: event.priceRanges?.[0]?.max
        ? `$${event.priceRanges[0].max}`
        : "No VIP price info",
    };

    openModal(eventData);
  }
});
