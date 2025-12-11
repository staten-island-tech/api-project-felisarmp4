import "./style.css";

fetch("http://ponyapi.net/v1/song/all?limit=192")
  .then((response) => response.json())
  .then((data) => console.log(data));
console.log();

async function getsong(song) {
  try {
    const response = await fetch(song);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
getsong(ACADECA);
