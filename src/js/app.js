import { getTickets } from "./api/getTickets";
import { createTicket } from "./layout/createTickets";
const ticketsList = document.querySelector(".tickets-list");

getTickets()
  .then((response) => response.json())
  .then((data) => {
    if (data._embedded && data._embedded.events) {
      const events = data._embedded.events;
      ticketsList.innerHTML = events
        .map((event) => {
          const eventImage = event.images ? event.images[0].url : "";
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
        .join("");
    } else {
      ticketsList.innerHTML = "<p>No events found.</p>";
    }
  })
  .catch((error) => {
    console.log(error);
  });
