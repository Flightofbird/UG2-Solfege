// Saves options to chrome.storage
function save_options() {
  var dotype = document.getElementById("fegeType").value;
  chrome.storage.sync.set(
    {
      solfegeType: dotype,
    },
    function () {
      // Update status to let user know options were saved.
      var status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function () {
        status.textContent = "";
      }, 750);
    }
  );
}

// Restores select box state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value = 'sol1'
  chrome.storage.sync.get(
    {
      solfegeType: "sol1",
    },
    function (items) {
      document.getElementById("fegeType").value = items.solfegeType;
    }
  );
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
