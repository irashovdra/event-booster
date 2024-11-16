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
const paginationContainer = document.querySelector(".footer__pagination");
paginationContainer.classList.add("pagination");
document.body.appendChild(paginationContainer);

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
  renderPagination(events);
};

const renderPagination = (events) => {
  const totalPages = Math.ceil(events.length / itemsPerPage);
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add("pagination__button");
    if (i === currentPage) button.classList.add("active");
    button.addEventListener("click", () => {
      currentPage = i;
      renderTickets(filteredEvents, currentPage);
    });
    paginationContainer.appendChild(button);
  }
};

const populateCountryOptions = (events) => {
  const countries = [
    ...new Set(
      events.map(
        (event) => event._embedded?.venues?.[0]?.country?.name || "Unknown"
      )
    ),
  ];
  countrySelect.innerHTML =
    `<option value="All">Choose country</option>` +
    countries
      .filter((country) => country !== "Unknown")
      .map((country) => `<option value="${country}">${country}</option>`)
      .join("");
};

const filterEvents = (query, selectedCountry) => {
  filteredEvents = allEvents.filter((event) => {
    const matchesQuery = event.name.toLowerCase().includes(query.toLowerCase());
    const matchesCountry =
      selectedCountry === "All" ||
      (event._embedded?.venues?.[0]?.country?.name || "").toLowerCase() ===
        selectedCountry.toLowerCase();
    return matchesQuery && matchesCountry;
  });
  currentPage = 1;
  renderTickets(filteredEvents, currentPage);
};

getTickets()
  .then((response) => response.json())
  .then((data) => {
    if (data._embedded && data._embedded.events) {
      allEvents = data._embedded.events;
      if (allEvents.length > 0) {
        filteredEvents = allEvents;
        renderTickets(filteredEvents, currentPage);
        populateCountryOptions(allEvents);
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
  filterEvents(query, selectedCountry);
});

countrySelect.addEventListener("change", (event) => {
  const query = searchInput.value;
  const selectedCountry = event.target.value;
  filterEvents(query, selectedCountry);
});

// Open modal on image click
ticketsList.addEventListener("click", (event) => {
  const clickedImage = event.target.closest(".ticket__photo"); // Ensure it's an image inside a ticket
  if (clickedImage) {
    const ticketCard = clickedImage.closest(".ticket"); // Find the parent ticket
    const eventData = {
      image: clickedImage.src,
      name: ticketCard.querySelector(".ticket__title").textContent,
      date: ticketCard.querySelector(".ticket__date").textContent,
      venue: ticketCard.querySelector(".ticket__venue").textContent,
    };
    openModal(eventData); // Pass the data to the modal
  }
});
