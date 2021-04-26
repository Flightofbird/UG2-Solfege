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
sol2 = [
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

sol3 = [
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
  "Tib",
  "Ti",
];

sol4 = [
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
  "Te",
  "Ti",
];

// Logic
// querySelect all chords and "for" loop all of them
// if chord has slash, split it and transpose each side, then add the slash back in, write the new chord to the webpage
// else run Transpose on the chord, Write to Webpage

// Transpose logic
// if chord is found in chords arr, return the solfege equvelent. This Handles Basic Chords
// if chord is undefined and dosent include # or b slice the first character, find solfege name then add ending. This Handles all single character chords
// if chord is still undefined slice 2 characters, find solfege name then add ending. This Handles eveything else, e.g G#7, m7b5, dim6susb13no5

//runs is a backup blocker incase the program is run twice, it dosent spit out undefined everywhere
let runs = 0;

// listen for message from the popup.js
chrome.runtime.onMessage.addListener(gotMessage);

//runs on page load, reads the chrome storage for options set in the options page. Sol1 is set as default if never opened.
chrome.storage.sync.get("solfegeType", function (result) {
  if (result && result.solfegeType) {
    console.log(result.solfegeType);
    switch (result.solfegeType) {
      case "sol1":
        break;
      case "sol2":
        solfege.length = 0;
        solfege.push.apply(solfege, sol2);
        console.log(solfege);
        break;
      case "sol3":
        solfege.length = 0;
        solfege.push.apply(solfege, sol3);
        console.log(solfege);
        break;
      case "sol4":
        solfege.length = 0;
        solfege.push.apply(solfege, sol4);
        console.log(solfege);
    }
  }
});

//Function to recive the button click from popup.js
function gotMessage(message, sender, sendResponse) {
  console.log(message.payload.trans);
  if (message.payload.trans === "Run" && runs === 0) {
    // solfegeSelector();
    keySwapper(message.payload.diChecktxt, keyFinder());
    chordSelector();
    runs++;
  } else {
    console.log("couldnt run again, please Refresh");
  }
}

//Selects all Chords and loops through them replacing the chords send back from the Transpose function
function chordSelector() {
  let cpchord = document.querySelectorAll("[data-name]");
  for (let i = 0; i < cpchord.length; i++) {
    let item = cpchord[i];
    let itemtext = item.childNodes[0].textContent;
    // handles the slash chords seperatly
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

//finds key by looping through the 4 divs where the key is located, Retruns the key, if not returns C
function keyFinder() {
  let allKeyDivSelect = document.querySelectorAll("div._3naMH");
  for (let i = 0; i < allKeyDivSelect.length; i++) {
    let item = allKeyDivSelect[i];
    let itemtext = item.childNodes[0].textContent;
    // console.log(itemtext);
    if (itemtext.includes("Key:")) {
      console.log(
        `${i} Div, Key = ${allKeyDivSelect[i].childNodes[1].textContent}`
      );
      return allKeyDivSelect[i].childNodes[1].textContent;
    }
    if (i === 4) {
      console.log("Could't find key, Returning C");
      return "C";
    }
  }
}

// Replaces solfege key array with the foundkey at the start
function keySwapper(y, theFoundkey) {
  let cleanNote = noteTruncator(theFoundkey);
  let newRootKeyP = chords.indexOf(cleanNote);
  if (newRootKeyP != -1 && y === true) {
    console.log(solfege, newRootKeyP);
    let a1 = solfege.slice(17 - newRootKeyP);
    let a3 = a1.concat(solfege.slice(0, 17 - newRootKeyP));
    solfege.length = 0; // Clear contents
    solfege.push.apply(solfege, a3); // Append new contents
    console.log("arr solfege key changed", solfege);
    console.log(`Key swapper ran with ${cleanNote}`);
  } else if (newRootKeyP != -1 && y === false && !solfege[0].includes("Do")) {
    let a2 = a3.slice(17 - newRootKeyP);
    let a4 = a2.concat(a3.slice(0, 17 - newRootKeyP));
    solfege.length = 0; // Clear contents
    solfege.push.apply(solfege, a4); // Append new contents
    console.log("arr solfege after fix", solfege);
    console.log(`Key swapper ran with ${cleanNote}`);
  }
}

// removes all the m's off of the notes from the key beacsue they were stoping the keyswapper from choosing the right key.
function noteTruncator(x) {
  let theSharpFlat = x.includes("b") || x.includes("#");
  if (chords.indexOf(x) !== -1) {
    console.log(x);
    return x;
  } else if (chords.indexOf(x) == -1 && !theSharpFlat) {
    let splitchord = x.slice(0, 1);
    console.log(splitchord);
    return splitchord;
  } else if (x.length >= 2) {
    let splitchord = x.slice(0, 2);
    console.log(splitchord);
    return splitchord;
  }
}

// Calebs Awesome Transposer
//
function transpose(x) {
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
