import "./style.css";

const songcarddiv = document.querySelector("#songcarddiv");
const searchinput = document.querySelector("#search");

let allsongs = [];

function renderSongs(songs) {
  if (!songcarddiv) return;

  songcarddiv.innerHTML = "";

  songs.forEach((song) => {
    const card = document.createElement("div");
    card.className =
      "bg-pink-500 w-200 mx-auto rounded-2xl m-3 p-4 text-indigo-900 border-5 border-violet-400 text-center";

    card.innerHTML = `
      <h2 class="text-2xl mb-2">${song.name}</h2>
      <p class="text-lg">${song.episode}</p>

      <button
        class="bg-violet-400 rounded-xl px-4 py-2 mt-3 transition-transform duration-300 hover:scale-110"
        data-video="${song.video}"
      >
        more info :3
      </button>

      <div class="details mt-3"></div>
    `;

    songcarddiv.appendChild(card);
  });
}

async function fetchAllSongs() {
  try {
    const res = await fetch("https://ponyapi.net/v1/song/all?limit=192");
    const data = await res.json();

    allsongs = data.data.filter((song) => song.video);
    renderSongs(allsongs);
  } catch (err) {
    songcarddiv.innerHTML =
      "<p class='text-indigo-900 text-xl'>failed to load songs 😿</p>";
    console.error(err);
  }
}

async function fetchSongsBySearch(query) {
  try {
    const res = await fetch(
      `https://ponyapi.net/v1/song/all?limit=192&search=${encodeURIComponent(query)}`,
    );
    const data = await res.json();

    const results = data.data.filter((song) => song.video);
    renderSongs(results);
  } catch (err) {
    console.error(err);
  }
}

songcarddiv.addEventListener("click", (e) => {
  if (!e.target.matches("button[data-video]")) return;

  const videoURL = e.target.dataset.video;
  const song = allsongs.find((s) => s.video === videoURL);

  const card = e.target.closest("div");
  const details = card.querySelector(".details");

  if (details.innerHTML) {
    details.innerHTML = "";
    return;
  }

  const embedURL = song.video.replace("watch?v=", "embed/");

  details.innerHTML = `
    <p>length: ${song.length}</p>
    <p>key signature: ${song.keysignature}</p>
    <p>lyrics by: ${song.lyricsby ?? "unknown"}</p>
    <p>music by: ${song.musicby ?? "unknown"}</p>

    <iframe
      class="mx-auto mt-3"
      width="560"
      height="315"
      src="${embedURL}"
      loading="lazy"
      allowfullscreen>
    </iframe>
  `;
});

searchinput.addEventListener("input", () => {
  const query = searchinput.value.trim();

  if (!query) {
    renderSongs(allsongs);
    return;
  }

  fetchSongsBySearch(query);
});

fetchAllSongs();
