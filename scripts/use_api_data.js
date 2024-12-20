let apiData;

document.addEventListener("DOMContentLoaded", async () => {
  const filePath = "../../../data/results_elnec_api.json";
  const response = await fetch(filePath);
  apiData = await response.json();

  const elements = document.querySelectorAll("[data-api]");

  for (const element of elements) {
    const jsonKey = element.dataset.api;
    loadData(element, jsonKey);
  }
});

async function getFile(fileName) {
  const response = await fetch(fileName);
  const jsonData = await response.json();

  return jsonData;
}

function loadData(element, jsonKey) {
  const apiValue = apiData[jsonKey];

  if (apiValue != null && apiValue != "error") element.innerText = apiValue;
}

// HTML TAG TO COPY:
// <span data-api="beep3"></span>;
// "beep3" can be exchanged to any key from the results_elnec_api.json file
