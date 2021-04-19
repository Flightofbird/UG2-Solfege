chords = [
  "C",
  "C#",
  "Db",
  "D",
  "D#",
  "Eb",
  "E",
  "F",
  "F#",
  "Gb",
  "G",
  "G#",
  "Ab",
  "A",
  "A#",
  "Bb",
  "B",
];
solfege = [
  "Do",
  "Do#",
  "Reb",
  "Re",
  "Re#",
  "Mib",
  "Mi",
  "Fa",
  "Fa#",
  "Solb",
  "Sol",
  "Sol#",
  "Lab",
  "La",
  "La#",
  "Sib",
  "Si",
];
//TODO add Switch between the 2 types of solfege
solfege2 = [
  "Do",
  "Di",
  "Ra",
  "Re",
  "Ri",
  "Me",
  "Mi",
  "Fa",
  "Fi",
  "Se",
  "So",
  "Si",
  "Le",
  "La",
  "Li",
  "Se",
  "Si",
];
let cpchord = document.querySelectorAll("[data-name]");
// let cptestchord = "G/D";

// Logic
// querySelect all chords and "for" loop all of them
// if chord has slash, split it and transpose each side, then add the slash back in, write the new chord to the webpage
// else run Transpose on the chord, Write to Webpage

// Transpose logic
// if chord is found in chords arr, return the solfege equvelent. This Handles Basic Chords
// if chord is undefined and dosent include # or b slice the first character, find solfege name then add ending. This Handles all single character chords
// if chord is still undefined slice 2 characters, find solfege name then add ending. This Handles eveything else, e.g G#7, m7b5, dim6susb13no5

chrome.runtime.onMessage.addListener(gotMessage);

//Function to recive button click from popup
function gotMessage(message) {
  console.log(message.txt);
  if (message.txt === "Run") {
    //Start Searching for chords
    for (let i = 0; i < cpchord.length; i++) {
      let item = cpchord[i];
      let itemtext = item.childNodes[0].textContent;

      if (itemtext.includes("/")) {
        let splitarr = itemtext.split("/");
        let y = transpose(splitarr[0]);
        let z = transpose(splitarr[1]);
        let newslashchord = `${y}/${z}`;
        item.childNodes[0].textContent = newslashchord;
      } else {
        item.childNodes[0].textContent = transpose(itemtext);
      }
    }
  }
}

// Calebs Awesome Transposer
function transpose(x) {
  if (chords.indexOf(x) !== -1) {
    let newindex = chords.indexOf(x);
    let newchord = solfege[newindex];
    console.log(newchord);
    // console.log("if 1 was done");
    return newchord;
  } else if (chords.indexOf(x) == -1 && !(x.includes("b") || x.includes("#"))) {
    let splitchord = x.slice(0, 1);
    let newindex = chords.indexOf(splitchord);
    // console.log(newindex);
    let newchord = solfege[newindex] + x.slice(1);
    console.log(newchord);
    // console.log("if 2 was done");
    return newchord;
  } else if (x.length >= 2) {
    let splitchord = x.slice(0, 2);
    let newindex = chords.indexOf(splitchord);
    let newchord = solfege[newindex] + x.slice(2);
    console.log(newchord);
    // console.log("if 3 was done");
    return newchord;
  }
}
