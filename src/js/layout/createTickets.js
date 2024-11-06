export const createTicket = ({
  eventImage,
  eventName,
  eventDate,
  eventVenue,
}) => {
  return `<li class="ticket">
            <div class="ticket__photo-wrapper">
              <img src="${eventImage}" alt="${eventName}" class="ticket__photo">
            </div>
            <div class="ticket__details">
              <h3 class="ticket__title">${eventName}</h3>
              <p class="ticket__date">${eventDate}</p>
              <p class="ticket__venue">${eventVenue}</p>
            </div>
          </li>`;
};
