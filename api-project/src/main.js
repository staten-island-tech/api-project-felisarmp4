import "./style.css";

const url = "http://ponyapi.net/v1/song/all?limit=192";
const songcarddiv = document.querySelector("#songcarddiv");

async function loadsong(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const songs = data.data;

    songcarddiv.innerHTML = "";

    songs.forEach((song) => {
      const name = song.name;
      const episode = song.episode;
      const keysignature = song.keysignature;
      const length = song.length;
      const lyricsby = song.lyricsby;
      const musicby = song.musicby;
      const video = song.video;

      if (!song.video) return;
      const embedURL = song.video.replace("watch?v=", "embed/");
      songcarddiv.insertAdjacentHTML(
        "beforeend",
        `
      <div class="w-200 mx-auto rounded-2xl m-3 text-3xl text-indigo-900 text-center">
      <h2>${name}</h2>
      <p>${episode}</p>
      <p>Length: ${length}</p>
      <a href="${video}" target="_blank">Watch video</a>
      </div>

         <iframe 
            width="560" 
            height="315" 
            src="${embedURL}" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
          </iframe>
        </div>
        `
      );
    });
  } catch (error) {
    console.error("failed to load songs:", error);
  }
}

loadsong(url);
