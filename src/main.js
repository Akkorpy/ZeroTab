const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector("#apod").innerHTML = "<p>loading...</p>";

fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)

  .then(response => response.json())
  .then(data => {
    let media;

    if (data.media_type === "image") {
      media = `<img src="${data.url}"></img>`;
    } else if (data.url.includes("youtube")) {
      media = `<iframe src="${data.url}"></iframe>`;
    } else {
      media = `<video src="${data.url}" controls></video>`;
    }

    document.querySelector("#apod").innerHTML = ` 
    <h2>${data.title}</h2>
    ${media}
    <p>${data.explanation}</p> 
    `;
  })

  .catch(err => {
    document.querySelector("#apod").innerHTML = `<p>Error: ${err.message}</p>`;
  });

const time = document.getElementById("time");
const date = document.getElementById("date");

function updateDate() {
  const now = new Date();
  date.textContent = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  time.textContent = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

updateDate();
setInterval(updateDate, 1000);