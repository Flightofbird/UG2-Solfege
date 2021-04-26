let diCheckjs = document.getElementById("diCheck");

// runSwitchjs runs Content Script
function runSwitchjs() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    let payload = {
      trans: "Run",
      diChecktxt: diCheckjs.checked ? true : false,
    };
    console.log("Payload", payload);
    chrome.tabs.sendMessage(activeTab.id, { payload });
    document.getElementById("Solfege").disabled = true;
  });
}

//button solfege click event
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Solfege").addEventListener("click", runSwitchjs);
});
