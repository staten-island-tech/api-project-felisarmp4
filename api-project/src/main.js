import "./style.css";

const url = "http://ponyapi.net/v1/song/all?limit=192";
const songcarddiv = document.querySelector('#songcarddiv');

async function getsong(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}
getsong(url);

export async function loadsong(url){
  try{
    const response = await fetch(url);
    const data = await response.json();
    const dataarr = data['data'];
    dataarr.forEach(obj => {
      const songname = obj['name']
      if(!obj.hasOwnProperty('video')){
        return;
      }
      const songimg = obj['video'][0]
      songcarddiv.insertAdjacentHTML('beforeend',
        `
        <div class="card w-full"></div>
        <p class="songname text center text-4x1 mt-2 mb-2">${songname}</p>
        
        `
      )
    })
  }
}