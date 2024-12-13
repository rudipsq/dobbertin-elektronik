function generateNewJsonObject(_id, _name) {
  let jsonObject = {
    id: _id,
    name: _name,
  };

  return jsonObject;
}

function generateTemplateString(jsonObject) {
  const data = jsonObject;

  const string = `${data.name}`;

  // title
  let title_section;

  // image
  let image_section;

  // description
  let description_section;

  // manual
  let manual_section;

  // packages
  let packages_section;

  // table
  let table_section;

  // programmers
  let programmers_section;

  return string;
}

function downloadFileFromString(htmlString) {
  const content = htmlString;
  const blob = new Blob([content], { type: "text/html" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "output.html";
  a.click();
}
