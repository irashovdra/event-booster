import { getTickets } from "./api/getTickets";
import { createTicket } from "./layout/createTickets";
import { openModal } from "./layout/modal";

const ticketsList = document.querySelector(".tickets-list");
const searchInput = document.querySelector(
  ".header-list__filling[type='text']"
);
const stateSelect = document.querySelector(
  ".header-list__filling[aria-label='Choose state']"
);

let allEvents = [];
let filteredEvents = [];

const renderTickets = (events) => {
  ticketsList.innerHTML = events.length
    ? events
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
    : "<p>No events found.";
};

getTickets()
  .then((response) => response.json())
  .then((data) => {
    if (data._embedded && data._embedded.events) {
      allEvents = data._embedded.events;
      if (allEvents.length > 0) {
        filteredEvents = allEvents;
        renderTickets(filteredEvents);
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

const filterEvents = (query, allEvents, renderTickets) => {
  const filteredByQuery = allEvents.filter((event) => {
    const eventName = event.name || "";
    return eventName.toLowerCase().includes(query.toLowerCase());
  });

  renderTickets(filteredByQuery);
};

searchInput.addEventListener("input", (event) => {
  const query = event.target.value.toLowerCase();
  filterEvents(query, allEvents, renderTickets);
});

// STATE RENDER

const getStates = (events) => {
  const states = [];
  const eventsArr = events._embedded.events;
  eventsArr.forEach((event) => {
    const state = event._embedded.venues[0].state.name;
    states.push(state);
  });
  return states;
};

const getStatesOptions = (states) => {
  stateSelect.innerHTML = "<option value=''>Select a State</option>";
  console.log(states);
  states.forEach((state) => {
    const option = document.createElement("option");
    option.value = state;
    option.textContent = state;
    stateSelect.appendChild(option);
  });
};

const displayStateEvents = () => {
  getTickets()
    .then((response) => response.json())
    .then((data) => {
      const states = getStates(data);
      getStatesOptions(states);
    });
};

displayStateEvents();

const getStateFilteredEvents = (event) => {
  const chosenState = event.value.target;
};

selectedState.addEventListener("change", getStateFilteredEvents);

// END

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
