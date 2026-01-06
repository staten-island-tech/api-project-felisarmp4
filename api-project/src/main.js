import "./style.css";

const url = "http://ponyapi.net/v1/song/all?limit=192";

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
      if(!obj.hasOwnProperty('images')){
        return;
      }
    })
  }
}