import "./style.css";

const url = "https://ponyapi.net/v1/song/all?limit=192";
const songcarddiv = document.querySelector("#songcarddiv");

async function loadsongs() {
  if (!songcarddiv) return;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const songs = data.data.filter((song) => song.video);

    songcarddiv.innerHTML = "";

    songs.forEach((song, index) => {
      songcarddiv.insertAdjacentHTML(
        "beforeend",
        `
        <div class="w-200 mx-auto rounded-2xl m-3 text-3xl text-indigo-900 text-center">
          <h2>${song.name}</h2>
          <button data-index="${index}">
            more info :3
          </button>
          <div id="details-${index}"></div>
        </div>
        `
      );
    });

    songcarddiv.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") return;

      const index = e.target.dataset.index;
      const song = songs[index];
      const details = document.querySelector(`#details-${index}`);

      if (details.innerHTML) {
        details.innerHTML = "";
        return;
      }

      const embedurl = song.video.replace("watch?v=", "embed/");

      details.innerHTML = `
        <p>${song.episode}</p>
        <p>length: ${song.length}</p>
        <p>lyrics by: ${song.lyricsby ?? "unknown"}</p>
        <p>music by: ${song.musicby ?? "unknown"}</p>

        <iframe
          width="560"
          height="315"
          src="${embedurl}"
          loading="lazy"
          allowfullscreen>
        </iframe>
      `;
    });
  } catch (err) {
    console.error("failed to load songs:", err);
  }
}

loadsongs();
