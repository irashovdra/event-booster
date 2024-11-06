const e=({eventImage:e,eventName:t,eventDate:s,eventVenue:n})=>`<li class="ticket">
            <div class="ticket__photo-wrapper">
              <img src="${e}" alt="${t}" class="ticket__photo">
            </div>
            <div class="ticket__details">
              <h3 class="ticket__title">${t}</h3>
              <p class="ticket__date">${s}</p>
              <p class="ticket__venue">${n}</p>
            </div>
          </li>`,t=document.querySelector(".tickets__list");fetch("https://app.ticketmaster.com/discovery/v2/events.json?apikey=Jg7o3tD8hioRQqQCvzEmn8hsX9ftNiZq").then(e=>e.json()).then(s=>{if(s._embedded&&s._embedded.events){let n=s._embedded.events;t.innerHTML=n.map(t=>{let s=t.images?t.images[0].url:"";return e({eventImage:s,eventName:t.name||"No Event Name",eventDate:t.dates?.start?.localDate||"No Date",eventVenue:t._embedded?.venues?.[0]?.name||"No Venue"})}).join("")}else t.innerHTML="<p>No events found.</p>"}).catch(e=>{console.log(e)});
//# sourceMappingURL=index.6ef4a3b1.js.map
