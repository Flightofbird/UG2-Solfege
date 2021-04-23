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

chrome.runtime.onMessage.addListener(gotMessage);

let cpchord = document.querySelectorAll("[data-name]");
let allKeyDivSelect = document.querySelectorAll("div._3naMH");
let runs = 0;

// Logic
// querySelect all chords and "for" loop all of them
// if chord has slash, split it and transpose each side, then add the slash back in, write the new chord to the webpage
// else run Transpose on the chord, Write to Webpage

// Transpose logic
// if chord is found in chords arr, return the solfege equvelent. This Handles Basic Chords
// if chord is undefined and dosent include # or b slice the first character, find solfege name then add ending. This Handles all single character chords
// if chord is still undefined slice 2 characters, find solfege name then add ending. This Handles eveything else, e.g G#7, m7b5, dim6susb13no5

//Function to recive button click from popup
function gotMessage(message, sender, sendResponse) {
  console.log(message.payload.trans);
  if (message.payload.trans === "Run" && runs === 0) {
    keySwapper(message.payload.diChecktxt, keyFinder()); //message.payload.diChecktxt
    chordSelector();
    runs++;
  } else {
    console.log("couldnt run again please Refresh");
  }
}

//Chord selector
function chordSelector() {
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

//finds key by looping through the 4 divs, Retruns the key if not returns C
function keyFinder() {
  for (let i = 0; i < allKeyDivSelect.length; i++) {
    let item = allKeyDivSelect[i];
    let itemtext = item.childNodes[0].textContent;
    console.log(itemtext);
    if (itemtext.includes("Key:")) {
      console.log(i);
      console.log(allKeyDivSelect[i].childNodes[1].textContent);
      return allKeyDivSelect[i].childNodes[1].textContent;
    }
    if (i === 4) {
      console.log("Could't find key Returning C");
      return "C";
    }
  }
}

// Replaces solfege key array with the foundkey at the start
function keySwapper(x, theFoundkey) {
  let newRootKeyP = chords.indexOf(theFoundkey);
  console.log("Key swapper ran");
  if (newRootKeyP != -1 && x === true) {
    console.log(solfege, newRootKeyP);
    let a1 = solfege.slice(17 - newRootKeyP);
    let a3 = a1.concat(solfege.slice(0, 17 - newRootKeyP));
    solfege.length = 0; // Clear contents
    solfege.push.apply(solfege, a3); // Append new contents
    console.log("arr solfege key changed", solfege);
  } else if (newRootKeyP != -1 && x === false && !solfege[0].includes("Do")) {
    let aa = a3.slice(17 - newRootKeyP);
    let a4 = aa.concat(a3.slice(0, 17 - newRootKeyP));
    solfege.length = 0; // Clear contents
    solfege.push.apply(solfege, a4); // Append new contents
    console.log("arr solfege after fix", solfege);
  }
}

//B7b13

// Calebs Awesome Transposer
function transpose(x) {
  // let theSharpFlat = x.includes("b") || x.includes("#");
  if (solfege.indexOf(x) !== -1) {
    return x;
  } else if (chords.indexOf(x) !== -1) {
    let newindex = chords.indexOf(x);
    let newchord = solfege[newindex];
    console.log(x, newchord);
    // console.log("if 1 was done");
    return newchord;
  } else if (chords.indexOf(x) == -1) {
    let splitchord = x.slice(0, 1);
    let newindex = chords.indexOf(splitchord);
    // console.log(newindex);
    let newchord = solfege[newindex] + x.slice(1);
    console.log(x, newchord);
    // console.log("if 2 was done");
    return newchord;
  } else if (x.length >= 2) {
    let splitchord = x.slice(0, 2);
    let newindex = chords.indexOf(splitchord);
    let newchord = solfege[newindex] + x.slice(2);
    console.log(x, newchord);
    // console.log("if 3 was done");
    return newchord;
  }
}

//ToDO Fix SolBm issue  Rot10 solfege on someone-like-you-chords
//|| x.charAt(1).includes("m")
//&& !theSharpFlat
