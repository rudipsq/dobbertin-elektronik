let apiData;

document.addEventListener("DOMContentLoaded", () => {
  apiData = getFile("test.json");
});

async function getFile(fileName) {
  const file = await fetch(fileName);
  return file;
}

function loadData(element, jsonKey) {
  element.innerHtml = apiData[jsonKey];
}
