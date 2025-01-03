function main(language = "en", _jsonObject = null) {
  let jsonObject;

  if (_jsonObject) {
    jsonObject = _jsonObject;
  } else {
    const jsonObjectEn = createNewTemplateJson(
      "en",
      getInputValue("type"),
      getInputValue("name"),
      getInputValue("order_number"),
      getInputValue("price", "en"),
      getInputValue("socket", "en"),
      getInputValue("bottom", "en"),
      getInputValue("class", "en"),
      getInputValue("subclass", "en"),
      getMultiValue("description", "en"),
      getInputValue("image1"),
      getInputValue("image2"),
      getTableValue("wiring"),
      getMultiValue("manual", "en"),
      getPackageValue(),
      getTableValue("table"),
      getProgrammersValue(),
      getInputValue("programmers_note", "en")
    );

    const jsonObjectDe = createNewTemplateJson(
      "de",
      getInputValue("type"),
      getInputValue("name"),
      getInputValue("order_number"),
      getInputValue("price", "de"),
      getInputValue("socket", "de"),
      getInputValue("bottom", "de"),
      getInputValue("class", "de"),
      getInputValue("subclass", "de"),
      getMultiValue("description", "de"),
      getInputValue("image1"),
      getInputValue("image2"),
      getTableValue("wiring"),
      getMultiValue("manual", "de"),
      getPackageValue(),
      getTableValue("table"),
      getProgrammersValue(),
      getInputValue("programmers_note", "de")
    );

    localStorage.setItem("last_template_en", JSON.stringify(jsonObjectEn));
    localStorage.setItem("last_template_de", JSON.stringify(jsonObjectDe));

    if (language == "en") {
      jsonObject = jsonObjectEn;
    } else {
      jsonObject = jsonObjectDe;
    }
  }

  document.getElementById("table_link_output").innerText =
    getTableLink(jsonObject);

  let string = generateTemplateString(jsonObject);
  downloadFileFromString(string, jsonObject);

  console.log(jsonObject);
}

function regenerateLastTemplate(language = "en") {
  main(language, JSON.parse(localStorage.getItem("last_template_" + language)));
}

//*
//* - - - Back-End
//*

function createNewTemplateJson(
  _language,
  _type,
  _name,
  _orderNumber,
  _price,
  _socket,
  _bottom,
  _class,
  _subclass,
  _descriptionObjectArray,
  _image1,
  _image2,
  _wiringHtmlString,
  _manualObjectArray,
  _packagesObjectArray,
  _tableHtmlString,
  _programmersObjectArray,
  _programmersNote
) {
  const _id = nameToId(_name);

  let jsonObject = {
    language: _language, // can be "en" or "de"
    id: _id,
    type: _type, // can be "adapter", "ap1", "ap3"
    name: _name, // string
    orderNumber: _orderNumber, // string
    price: _price, // string
    socket: _socket, // string
    bottom: _bottom, // string
    class: _class, // string
    subclass: _subclass, // string
    descriptionObjectArray: _descriptionObjectArray,
    image1: _image1, // filename with file ending
    image2: _image2, // filename with file ending
    wiringHtmlString: _wiringHtmlString,
    manualObjectArray: _manualObjectArray,
    packagesObjectArray: _packagesObjectArray,
    tableHtmlString: _tableHtmlString,
    programmersObjectArray: _programmersObjectArray,
    programmersNote: _programmersNote, // can be "none", "default" or a custom text
  };

  return jsonObject;
}

function generateTemplateString(jsonObject) {
  const data = jsonObject;

  // title
  let title_section = generateTitleSection(
    data.name,
    data.orderNumber,
    data.price,
    data.language
  );

  // description
  let description_section = generateDescriptionSection(
    data.orderNumber,
    data.socket,
    data.bottom,
    data.class,
    data.subclass,
    data.descriptionObjectArray
  );

  // image
  let image_section = generateImageSection(data.image1, data.image2, data.type);

  let wiring_section = "";

  if (data.wiringHtmlString) {
    wiring_section = `<section id="wiring_section">${data.wiringHtmlString}</section>`;
  }

  // manual
  let manual_section = "";
  if (data.manualObjectArray) {
    manual_section = generateManualSection(data.manualObjectArray);
  }

  // packages
  let packages_section = generatePackagesSection(data.packagesObjectArray);

  // table
  let table_section = "";

  if (data.tableHtmlString) {
    table_section = `<section id="table_section">${data.tableHtmlString}</section>`;
  }

  // programmers
  let programmers_section = "";
  if (data.programmersObjectArray) {
    programmers_section = generateProgrammersSection(
      data.programmersObjectArray,
      data.programmersNote,
      data.language
    );
  }

  // language switcher
  let languageString;
  let languageSwitch;

  if (data.language != "de") {
    languageString = `
    <img src="../../../img/icon/english.png" alt="british flag" />
    <img src="../../../img/icon/german.png" alt="german flag" />`;

    languageSwitch = "de";
  } else {
    languageString = `
    <img src="../../../img/icon/german.png" alt="german flag" />
    <img src="../../../img/icon/english.png" alt="british flag" />`;

    languageSwitch = "en";
  }

  // footer
  if (data.language != "de") {
    footerString = `
     <div>
        <a href="../../imprint.html">Imprint</a>
        <a href="../../privacy-policy.html">Privacy policy</a>
        <a href="../../agb.html">AGB</a>
        <a href="https://quicksite.me">by Quicksite</a>
      </div>`;
  } else {
    footerString = `
    <div>
      <a href="../../impressum.html">Impressum</a>
      <a href="../../datenschutz.html">Datenschutz</a>
      <a href="../../agb.html">AGB</a>
      <a href="https://quicksite.me">by Quicksite</a>
    </div>`;
  }

  let string = `<!DOCTYPE html>
            <html lang="${data.language}">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>${data.name} (${data.orderNumber})</title>

                <link rel="stylesheet" href="../../../stylesheets/global.css" />
                <link rel="stylesheet" href="../../../stylesheets/details_adapters.css" />
              </head>
              <body>
                

                <header>
                  <div>
                    <div>
                      <img src="../../../img/logo/banner.gif" alt="" />
                    </div>

                    <nav>
                      <a href="../../index.html">Home</a>
                      <a href="../universal-programmers/">${
                        data.language === "en"
                          ? "Universal Programmers"
                          : "Universal Programmer"
                      }</a>
                      <a href="../production-programmers/">${
                        data.language === "en"
                          ? "Production Programmers"
                          : "Produktions-Programmer"
                      }</a>
                      <a href="../programming-adapters/" ${
                        data.type === "adapter" ? 'class="active"' : ""
                      }>Adapters</a>
                      <a href="../ap1-programming-modules/" ${
                        data.type === "ap1" ? 'class="active"' : ""
                      }>${
    data.language === "en" ? "AP1 Modules" : "AP1 Module"
  }</a>
                      <a href="../ap3-programming-modules/" ${
                        data.type === "ap3" ? 'class="active"' : ""
                      }>${
    data.language === "en" ? "AP3 Modules" : "AP3 Module"
  }</a>
                      <a href="../accessories/">${
                        data.language === "en" ? "Accessories" : "Accessories"
                      }</a>
                    </nav>

                     <div id="language_switcher">
                      <button onclick="switchLanguage('${languageSwitch}')">
                        ${languageString}
                      </button>
                    </div>
                  </div>
                </header>

                <main>
                  <div>
                    ${title_section}
                    ${description_section}
                    ${image_section}
                    ${wiring_section}
                    ${manual_section}
                    ${packages_section}
                    ${table_section}
                    ${programmers_section}
                  </div>
                </main>

                 <footer>
                  <div>
                    <div>
                      <h3>DOBBERTIN Industrie-Elektronik</h3>

                      <a href="mailto:info@dobbertin-elektronik.de"
                        >info@dobbertin-elektronik.de</a
                      >
                      <p>Tel.: +49 (0)6202-71417</p>
                      <p>Fax: +49 (0)6202-75509</p>
                    </div>

                    ${footerString}
                  </div>
                </footer>

                <script src="../../../scripts/language.js"></script>
              </body>
            </html>`;

  return string;
}

function downloadFileFromString(htmlString, jsonObject) {
  const content = htmlString;
  const blob = new Blob([content], { type: "text/html" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = jsonObject.orderNumber + ".html";
  a.click();
}

function getTableLink(jsonObject) {
  let string = `<tr data-href="${jsonObject.orderNumber}.html">
                  <td>${jsonObject.name}</td>
                  <td>${jsonObject.class}</td>
                  <td>${jsonObject.subclass}</td>
                  <td>${jsonObject.orderNumber}</td>
                </tr>`;

  return string;
}

function nameToId(string) {
  return string.replace(/[/ ]/g, "_");
}

//*
//* - - - Back-End: Section generation
//*
function generateTitleSection(name, orderNumber, price, language) {
  let priceString;

  if (language == "en") {
    if (price) {
      priceString = `Price: ${price}`;
    } else {
      priceString = `Ask for price`;
    }
  } else {
    if (price) {
      priceString = `Preis: ${price}`;
    } else {
      priceString = `Preis nachfragen`;
    }
  }

  let string = `<section id="title_section">
                  <div>
                    <h1>${name}</h1>
                    <p>(Ord. no. ${orderNumber})</p>
                  </div>
                  <p>${priceString}</p>
                </section>`;

  return string;
}

function generateImageSection(image1, image2, type) {
  let source;
  switch (type) {
    case "ap1":
      source = "ap1-programming-modules";
      break;
    case "ap3":
      source = "ap3-programming-modules";
      break;
    case "adapter":
      source = "programming-adapters";
      break;

    default:
      break;
  }

  let imageString = `<img src="../../../img/products/${source}/${image1}" alt="product image 1" />`;

  if (image2) {
    imageString += `<img src="../../../img/products/${source}/${image2}" alt="product image 2" />`;
  }

  let string = `<section id="image_section">
                <div>
                  ${imageString}
                </div>
              </section>`;

  return string;
}

function generateDescriptionSection(
  orderNumber,
  socket,
  bottom,
  classname,
  subclass,
  descriptionObjectArray
) {
  let liTagString = "";
  let table = `<table>
                <tbody>
                  <tr>
                    <td>Ord. no.</td>
                    <td>${orderNumber}</td>
                  </tr>
                  <tr>
                    <td>Socket</td>
                    <td>${socket}</td>
                  </tr>
                  <tr>
                    <td>Bottom</td>
                    <td>${bottom}</td>
                  </tr>
                  <tr>
                    <td>Class</td>
                    <td>${classname}</td>
                  </tr>
                  <tr>
                    <td>Subclass</td>
                    <td>${subclass}</td>
                  </tr>
                </tbody>
              </table>`;

  for (const liString of descriptionObjectArray) {
    if (liString.isBold) {
      liTagString += `<li class="bold">${liString.text}</li>`;
    } else {
      liTagString += `<li>${liString.text}</li>`;
    }
  }

  let string = `<section id="description_section">
              <div>
                <ul>
                  ${liTagString}
                </ul>
                ${table}
              </div>
            </section>`;

  return string;
}

function generateManualSection(manualObjectArray) {
  let liTagString = "";

  for (const liString of manualObjectArray) {
    if (liString.isBold) {
      liTagString += `<li class="bold">${liString.text}</li>`;
      // } else if (liString.isEmpty) {
      //   liTagString += `<li class="empty">${liString.text}</li>`;
    } else {
      liTagString += `<li>${liString.text}</li>`;
    }
  }

  let string = `<section id="manual_section">
              <h2>Adapter manual</h2>
              <ul>
                ${liTagString}
              </ul>
            </section>`;

  return string;
}

function generatePackagesSection(packagesObjectArray) {
  let packagesString = "";

  for (const packageObject of packagesObjectArray) {
    packagesString += `<div>
                        <div>
                          <h3>${packageObject.name}</h3>
                          <div>
                            <img src="../../../img/packages/${packageObject.image1}" alt="${packageObject.name} package small" />
                          </div>
                        </div>
                        <div>
                          <img src="../../../img/packages/${packageObject.image2}" alt="${packageObject.name} package big" />
                        </div>
                      </div>`;
  }

  let string = `<section id="packages_section">
                  <h2>Accepted package(s)</h2>
                    ${packagesString}
                </section>`;

  return string;
}

function generateProgrammersSection(
  programmersObjectArray,
  programmersNote,
  language
) {
  let aTagString = "";

  for (const programmerObject of programmersObjectArray) {
    aTagString += `<div><a href="${programmerObject.link}">${programmerObject.name}</a></div>`;
  }

  let note = "";

  switch (programmersNote) {
    case "default":
      if (language == "de") {
        note += `<p class="italic">Note: This programming adapter / module may not support all devices in the package(s) mentioned above on your programmer. Please, verify situation for particular device(s) you are going to work with using actual Device list of your programmer.</p>`;
      } else {
        note += `<p class="italic">Note: This programming adapter / module may not support all devices in the package(s) mentioned above on your programmer. Please, verify situation for particular device(s) you are going to work with using actual Device list of your programmer.</p>`;
      }

      break;
    case "none":
      note += "";
      break;

    default:
      note += `<p class="italic">${programmersNote}</p>`;
      break;
  }

  let string = `<section id="programmers_section">
                  <h2>Useable for programmers</h2>
                  <div id="programmer_list">
                    ${aTagString}
                  </div>
                  ${note}
                </section>`;

  return string;
}

//*
//* - - - Front-End
//*
// get the value of a single input with an id
function getInputValue(elementId, language = null) {
  let newElementId = elementId;
  if (language) {
    newElementId = elementId + "_" + language;
    let element = document.getElementById(elementId + "_" + language);
    if (element) {
      value = element.value;
    }

    if (!element || value == "") {
      let element = document.getElementById(elementId + "_" + "en");
      if (element) value = element.value;
    }
  } else {
    let element = document.getElementById(elementId);
    if (element) value = element.value;
  }

  return value;
}

// multi line inputs like short description and adapter manual
function getMultiValue(containerId, languageKey = "en") {
  const parent = document.getElementById(containerId);

  const objectArray = [];
  let index = 1;

  if (languageKey == "de") index = 2;

  for (const child of parent.children) {
    let inputValue = child.children[index].value;
    if (inputValue == "") inputValue = child.children[1].value;

    const checkboxValue = child.children[4].checked;
    console.log(child.children[4]);

    objectArray.push({
      text: inputValue,
      isBold: checkboxValue,
    });
  }

  return objectArray;
}

function addMultiValueToPage(containerId) {
  const div = document.createElement("div");
  const button = document.createElement("button");
  const input1 = document.createElement("input");
  const input2 = document.createElement("input");
  const lable = document.createElement("lable");
  const checkbox = document.createElement("input");

  button.onclick = function () {
    removeElement(this);
  };
  button.innerHTML = "Remove Line";
  lable.innerHTML = "is Bold?";
  checkbox.type = "checkbox";

  div.appendChild(button);
  div.appendChild(input1);
  div.appendChild(input2);
  div.appendChild(lable);
  div.appendChild(checkbox);

  document.getElementById(containerId).appendChild(div);
}

// package section
function getPackageValue() {
  const parent = document.getElementById("package");

  const objectArray = [];

  for (const child of parent.children) {
    const inputValue1 = child.children[1].children[1].value;
    const inputValue2 = child.children[2].children[1].value;
    const inputValue3 = child.children[3].children[1].value;

    objectArray.push({
      name: inputValue1,
      image1: inputValue2,
      image2: inputValue3,
    });
  }

  return objectArray;
}

function addPackageInputToPage() {
  const container = document.createElement("div");

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove Package";
  removeButton.onclick = function () {
    removeElement(this);
  };
  container.appendChild(removeButton);

  const fields = [
    { label: "name", type: "text" },
    { label: "image small", type: "text" },
    { label: "image big", type: "text" },
  ];

  fields.forEach((field) => {
    const fieldDiv = document.createElement("div");
    const label = document.createElement("label");
    label.textContent = field.label;
    const input = document.createElement("input");
    input.type = field.type;
    fieldDiv.appendChild(label);
    fieldDiv.appendChild(input);
    container.appendChild(fieldDiv);
  });

  document.getElementById("package").appendChild(container);
}

// programmers section
function getProgrammersValue() {
  const parent = document.getElementById("programmers");

  const objectArray = [];

  for (const child of parent.children) {
    const isChecked = child.children[0].checked;
    const inputName = child.children[1].innerHTML;

    let _link;
    if (
      ["BeeProg3", "BeeProg2", "BeeProg2C", "BeeProg2AP"].includes(inputName)
    ) {
      _link = `../universal-programmers/${inputName}`;
    } else {
      _link = `../production-programmers/${inputName}`;
    }

    if (isChecked) {
      objectArray.push({
        name: inputName,
        link: _link,
      });
    }
  }

  return objectArray;
}

// table/ wiring is section
function getTableValue(elementId) {
  let htmlString = getInputValue(elementId);

  htmlString = htmlString.replace(/class="[^"]*"/g, "");
  htmlString = htmlString.replace(/\s+class="[^"]*"/g, "");

  return htmlString;
}

// remove an element (called if a remove button is pressed)
function removeElement(element) {
  element.parentNode.remove();
}

// pre select programmers based on type
document.addEventListener("DOMContentLoaded", function () {
  const selectElement = document.getElementById("type");

  selectElement.addEventListener("change", function () {
    for (const child of document.getElementById("programmers").children) {
      child.children[0].checked = false;
    }

    switch (this.value) {
      case "adapter":
        document.getElementById("beehive208s").checked = true;
        document.getElementById("beehive204").checked = true;
        document.getElementById("beeprog2").checked = true;
        document.getElementById("beeprog2c").checked = true;
        break;

      case "ap1":
        document.getElementById("beehive204ap").checked = true;
        document.getElementById("beeprog2ap").checked = true;
        break;

      case "ap3":
        document.getElementById("beehive304").checked = true;
        document.getElementById("beeprog3").checked = true;
        break;

      default:
        break;
    }
  });
});
