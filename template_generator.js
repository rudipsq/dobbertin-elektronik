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

  document.getElementById("table_link_destination").innerText =
    getTableLinkDestination(jsonObject.type);

  document.getElementById("table_folder_destination").innerText =
    getTableFolderDestination(jsonObject.type);

  document.getElementById("image_folder_destination").innerText =
    getImageFolderDestination(jsonObject.type);

  let string = generateTemplateString(jsonObject);
  downloadFileFromString(string, jsonObject);

  console.log(jsonObject);
}

function regenerateLastTemplate(language = "en") {
  main(language, JSON.parse(localStorage.getItem("last_template_" + language)));
}

function autoGenerate(htmlString) {
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(htmlString, "text/html");

  // name
  let nameValue = htmlDoc.querySelector("h1")
    ? htmlDoc.querySelector("h1").childNodes[0].textContent.trim()
    : null;
  setInputValue("name", nameValue);

  // type
  let typeValue = htmlDoc.querySelector("#breadcrumbs")
    ? htmlDoc.querySelector("#breadcrumbs").childNodes[4].textContent.trim()
    : null;

  switch (typeValue) {
    case "Programming adapters":
      typeValue = "adapter";
      break;

    case "AP1 programming modules":
      typeValue = "ap1";
      break;

    case "AP3 programming modules":
      typeValue = "ap3";
      break;

    default:
      break;
  }

  setInputValue("type", typeValue);

  // order_number
  let order_numberValue = htmlDoc.querySelector("h1")
    ? htmlDoc.querySelector("h1").childNodes[1].textContent.trim()
    : null;

  const order_numberRegex = /\d+-\d+/;
  const order_numberMatch = order_numberValue.match(order_numberRegex);

  order_numberValue = order_numberMatch ? order_numberMatch[0] : null;
  setInputValue("order_number", order_numberValue);

  // price
  let priceValue = htmlDoc.querySelector("#adapteractions h2")
    ? htmlDoc.querySelector("#adapteractions h2").innerText.trim()
    : null;

  if (!priceValue) {
    setInputValue("price", "Ask for price", "en");
    setInputValue("price", "Preis auf Anfrage", "de");
  } else {
    // priceValue = priceValue.slice(7);

    const match = priceValue.match(/\d+(?:-\d+)?/);
    priceValue = match ? match[0] : null;

    setInputValue("price", priceValue + ".00 € excl. VAT", "en");
    setInputValue("price", priceValue + ",00 € zzgl. MwSt.", "de");
  }

  // socket
  let socketValue = htmlDoc.querySelector("tbody tr:nth-child(3) td")
    ? htmlDoc.querySelector("tbody tr:nth-child(3) td").innerText.trim()
    : null;

  setInputValue("socket", socketValue, "en");

  // bottom
  let bottomValue = htmlDoc.querySelector("tbody tr:nth-child(4) td")
    ? htmlDoc.querySelector("tbody tr:nth-child(4) td").innerText.trim()
    : null;

  setInputValue("bottom", bottomValue, "en");

  // class
  let classValue = htmlDoc.querySelector("tbody tr:nth-child(5) td")
    ? htmlDoc.querySelector("tbody tr:nth-child(5) td").innerText.trim()
    : null;

  setInputValue("class", classValue, "en");

  // subclass
  let subclassValue = htmlDoc.querySelector("tbody tr:nth-child(6) td")
    ? htmlDoc.querySelector("tbody tr:nth-child(6) td").innerText.trim()
    : null;

  setInputValue("subclass", subclassValue, "en");

  // image1
  let image1Value = htmlDoc.querySelector("#adapteractions img")
    ? htmlDoc.querySelector("#adapteractions img")
    : null;

  if (image1Value) {
    const srcUrl = new URL(image1Value.src);
    image1Value = srcUrl.pathname.split("/").pop();
  }
  setInputValue("image1", image1Value);

  // image2 // TODO do not do this if image 2 does not exist
  // let image2Value = image1Value;

  // const parts = image2Value.split(".");
  // if (parts.length > 1) {
  //   const firstPart = parts[0] + "1";
  //   image2Value = firstPart + "." + parts.slice(1).join(".");
  // }
  // setInputValue("image2", image2Value);

  // description
  const descriptionElement = htmlDoc.querySelector("#adapterdetail ul");
  let descriptionValueArray = [];

  for (const child of descriptionElement.children) {
    let isBold = false;
    if (child.children[0] && child.children[0].tagName == "B") isBold = true;
    descriptionValueArray.push({ text: child.innerText, isBold: isBold });
  }
  setMultiValue("description", descriptionValueArray);

  // manual
  const manualElement = htmlDoc.querySelector(".manual");
  let manualValueArray = [];

  for (const child of manualElement.children) {
    let isBold = false;
    if (child.children[0] && child.children[0].tagName == "B") isBold = true;
    manualValueArray.push({ text: child.innerText, isBold: isBold });
  }
  setMultiValue("manual", manualValueArray);

  // packages
  let packagesNameValue = htmlDoc.querySelector(".scheme td")
    ? htmlDoc.querySelector(".scheme td").innerText.trim()
    : null;

  let packagesImage1Value = htmlDoc.querySelector(
    ".scheme tr:nth-child(2) td img"
  )
    ? htmlDoc.querySelector(".scheme tr:nth-child(2) td img")
    : null;

  if (packagesImage1Value) {
    const srcUrl = new URL(packagesImage1Value.src);
    packagesImage1Value = srcUrl.pathname.split("/").pop();
  }

  let packagesImage2Value = htmlDoc.querySelector(
    ".scheme tr:nth-child(1) td img"
  )
    ? htmlDoc.querySelector(".scheme tr:nth-child(1) td img")
    : null;

  if (packagesImage2Value) {
    const srcUrl = new URL(packagesImage2Value.src);
    packagesImage2Value = srcUrl.pathname.split("/").pop();
  }

  setPackageValue(packagesNameValue, packagesImage1Value, packagesImage2Value);

  // table
  let tableValue = htmlDoc.querySelector(".table.tien.bgatable")
    ? htmlDoc.querySelector(".table.tien.bgatable").outerHTML
    : null;

  setInputValue("table", tableValue);

  // wiring
  let wiringValue = htmlDoc.querySelector(".converter_info")
    ? htmlDoc.querySelector(".converter_info").outerHTML
    : null;

  setInputValue("wiring", wiringValue);
}

function getHtmlData(htmlDoc, querySelector) {
  return htmlDoc.querySelector(querySelector).innerText;
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
    manual_section = generateManualSection(
      data.manualObjectArray,
      data.language
    );
  }

  // packages
  let packages_section = generatePackagesSection(
    data.packagesObjectArray,
    data.language
  );

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
                        data.language === "en" ? "Accessories" : "Zubehör"
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

                <script src="../../../scripts/global.js"></script>
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

function getTableLinkDestination(type) {
  let string;

  if (type == "adapter") {
    string = "programming-adapters";
  } else if (type == "ap1") {
    string = "ap1-programming-modules";
  } else if (type == "ap3") {
    string = "ap3-programming-modules";
  } else {
    console.error("type not found", type);
  }

  return `/en/products/${string}/index.html und /de/products/${string}/index.html`;
}

function getTableFolderDestination(type) {
  let string;

  if (type == "adapter") {
    string = "programming-adapters";
  } else if (type == "ap1") {
    string = "ap1-programming-modules";
  } else if (type == "ap3") {
    string = "ap3-programming-modules";
  } else {
    console.error("type not found", type);
  }

  return `/en/products/${string}/ und /de/products/${string}/`;
}

function getImageFolderDestination(type) {
  let string;

  if (type == "adapter") {
    string = "programming-adapters";
  } else if (type == "ap1") {
    string = "ap1-programming-modules";
  } else if (type == "ap3") {
    string = "ap3-programming-modules";
  } else {
    console.error("type not found", type);
  }

  return `/img/products/${string}/`;
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
      priceString = `Preis auf Anfrage`;
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

function generateManualSection(manualObjectArray, language) {
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
              <h2>${
                language === "en" ? "Adapter manual" : "Adapter-Handbuch"
              }</h2>
              <ul>
                ${liTagString}
              </ul>
            </section>`;

  return string;
}

function generatePackagesSection(packagesObjectArray, language) {
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
                  <h2>${
                    language === "en" ? "Accepted package(s)" : "Gehäuse"
                  }</h2>
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
        note += `<p class="italic">Hinweis: Dieser Programmieradapter / Modul unterstützt möglicherweise nicht alle Geräte in den oben genannten Paketen auf Ihrem Programmiergerät. Bitte überprüfen Sie die Situation für bestimmte Geräte, mit denen Sie arbeiten möchten, anhand der aktuellen Geräteliste Ihres Programmiergeräts.</p>`;
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
                  <h2>${
                    language === "en"
                      ? "Useable for programmers"
                      : "Geeignet für Programmer"
                  }</h2>
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
  // let newElementId = elementId;
  if (language) {
    // newElementId = elementId + "_" + language;
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

function setInputValue(elementId, value, language) {
  if (language) {
    document.getElementById(elementId + "_" + language).value = value;
  } else {
    document.getElementById(elementId).value = value;
  }

  if (elementId == "type") programmersDefaultSelection(value);
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
    // console.log(child.children[4]);

    objectArray.push({
      text: inputValue,
      isBold: checkboxValue,
    });
  }

  return objectArray;
}

function setMultiValue(containerId, valueArray, languageKey = "en") {
  const parent = document.getElementById(containerId);

  if (languageKey == "en") {
    parent.innerHTML = "";

    let string = "";

    for (let i = 0; i < valueArray.length; i++) {
      if (parent.children[i]) {
        parent.children[i].children[1].value = valueArray[i].text;
        parent.children[i].children[4].checked = valueArray[i].isBold;
      } else {
        addMultiValueToPage(containerId);
        parent.children[i].children[1].value = valueArray[i].text;
        parent.children[i].children[4].checked = valueArray[i].isBold;
      }

      string += valueArray[i].text + "\n";
    }

    parent.setAttribute("data-copy", string);
  } else {
    for (let i = 0; i < valueArray.length; i++) {
      if (parent.children[i]) {
        parent.children[i].children[2].value = valueArray[i];
      }
    }
  }
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

function setPackageValue(name, image1, image2) {
  const parent = document.getElementById("package");

  if (!parent.children[0]) addPackageInputToPage();

  parent.children[0].children[1].children[1].value = name;
  parent.children[0].children[2].children[1].value = image1;
  parent.children[0].children[3].children[1].value = image2;
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
      _link = `../universal-programmers/${inputName}.html`;
    } else {
      _link = `../production-programmers/${inputName}.html`;
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
  document.getElementById("type").addEventListener("change", function () {
    programmersDefaultSelection(this.value);
  });

  document.getElementById("html").addEventListener("paste", (event) => {
    const pastedText = event.clipboardData.getData("text");

    autoGenerate(pastedText);
  });

  const pasteButton = document.getElementById("pasteButton");
  const pasteTarget = document.getElementById("html");

  pasteButton.addEventListener("click", async () => {
    try {
      const text = await navigator.clipboard.readText();
      pasteTarget.value = text;

      autoGenerate(text);
    } catch (error) {
      console.error("Failed to read clipboard contents:", error);
    }
  });
});

// changes the selected programmers based on the "Type" at the top of the html page
function programmersDefaultSelection(value) {
  for (const child of document.getElementById("programmers").children) {
    child.children[0].checked = false;
  }

  switch (value) {
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
}

async function copyString(containerId) {
  try {
    await navigator.clipboard.writeText(
      document.getElementById(containerId).getAttribute("data-copy")
    );
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
}

async function pasteString(containerId) {
  let lines;
  try {
    const text = await navigator.clipboard.readText();

    lines = text.split("\n").filter((line) => line.trim() !== "");
  } catch (error) {
    console.error("Failed to read clipboard contents:", error);
  }
  setMultiValue(containerId, lines, "de");
}
