// runSwitchjs runs Content Script
function runSwitchjs() {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { txt: "Run" });
  });
}

//button solfege click event
document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("Solfege").addEventListener("click", runSwitchjs);
});
