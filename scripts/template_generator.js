function main() {
  // TEST:
  let jsonObject = createNewTemplateJson(
    "en",
    "adapter",
    "DIL8/BGA8-3 ZIF-CS",
    "70-2863",
    "Ask for Price",
    "ZIF BGA8, ClamShell type",
    "2x13 pins, square, 0.6x0.6mm, rows spacing 600mil",
    "Universal",
    "DIL/BGA",
    [
      {
        text: "universal programming adapter for STMicroelectronics M24M01-DFCS, M95M01-DFCS devices in WLCSP8 package",
      },
      {
        text: "used ZIF socket may accept one or more variants of supported package, different in ball diameter, ball high and/or body thickness, see section Accepted package(s)",
      },
      {
        text: "operating (mechanical) warranty of ZIF socket - 10,000 actuations",
      },
      {
        text: "supported from PG4UW software version 3.97k",
      },
      {
        text: "made in Slovakia",
      },
    ],
    "con2863b.jpg",
    "con2863b1.jpg",
    [
      {
        text: "Protect the contacts of adapter connectors and ZIF socket from contamination. Any dirt and/or fat on contacts may cause errors during programming.",
        isBold: true,
      },
      {
        text: "Usage of vacuum pick-up tool is expected for device handling.",
        isBold: true,
      },
      {
        text: "Proceed with care! Incorrect insertion of adapter in programmer ZIF socket or device in adapter ZIF socket may lead to programmed device damage.",
        isBold: true,
      },
      {
        text: "",
      },
      {
        text: "Insert adapter into programmer ZIF socket. If you are in doubts about orientation of the adapter in programmer ZIF socket, there is a rule of thumb - orientation of adapter name text is the same as orientation of the text on the top of programmer.",
      },
      {
        text: "Visually check the placement of adapter in programmer ZIF socket.",
      },
      {
        text: "Release the pawl on adapter ZIF socket to open it. The socket cap will open by spring force. Insert the device into adapter ZIF socket. The correct position of the programmed device is shown on PCB of the adapter. The reference corner (e.g. position of pin A1) of the device is indicated by dot, by number 1, by bevelled corner or by any combination of mentioned.",
      },
      {
        text: "Visually check the placement of programmed device in adapter ZIF socket. If it looks OK, close adapter ZIF socket cap by hand and secure the pawl.",
      },
      {
        text: "To take out the device from adapter, release the pawl on adapter ZIF socket and remove the device.",
      },
      {
        text: "When you finish the work with adapter, remove it from programmer ZIF socket.",
      },
      {
        text: "",
      },
      {
        text: "Operating conditions: temperature 5°C ÷ 40°C (41°F ÷ 104°F), humidity 20% ÷ 80% non-condensing.",
      },
    ],
    [
      {
        name: "BGA package",
        image1: "bga1p.gif",
        image2: "bgauni1m.gif",
      },
    ],
    [
      { link: "D", name: "BeeHive208S" },
      { link: "E", name: "BeeHive240" },
      { link: "F", name: "BeeProg2" },
      { link: "F", name: "BeeProg2C" },
    ],
    "default"
  );
  // let jsonObject = createNewTemplateJson(
  //   "ap1",
  //   "AP1 SSOP42 ZIF 330mil",
  //   "71-1866",
  //   "280.00 € excl. VAT",
  //   "ZIF SSOP42, OpenTop type",
  //   "2 female connectors by 32 pins, DIN41612 B/2",
  //   "Universal",
  //   "(T)SSOP",
  //   [
  //     {
  //       text: "universal programming module for devices in SSOP package, body 300mil, 0.4mm pitch",
  //       isBold: true,
  //     },
  //     {
  //       text: "operating (mechanical) warranty of ZIF socket - 10,000 actuations",
  //     },
  //   ],
  //   "../../../img/pic/mod4676b.jpg",
  //   "",
  //   [
  //     {
  //       text: "Programmer don`t need to be switched off and SW can be running during inserting/removing programming module",
  //       isBold: true,
  //     },
  //     {
  //       text: "Protect the contacts of module connectors and ZIF socket from contamination. Any dirt and/or fat on contacts may cause errors during programming.",
  //       isBold: true,
  //     },
  //     {
  //       text: "",
  //     },
  //     {
  //       text: "Unscrew 2 knurled thumb screws. Insert programming module into Programming Module Interface connectors, until it clicks. Due to connectors shape, only one orientation and position of programming module in Programming Module",
  //     },
  //   ],
  //   [
  //     {
  //       name: "SSOP42",
  //       image1: "../../../img/pic/bga1p.gif",
  //       image2: "../../../img/pic/bgauni1m.gif",
  //     },
  //     {
  //       name: "SSOP43",
  //       image1: "../../../img/pic/bga1p.gif",
  //       image2: "../../../img/pic/bgauni1m.gif",
  //     },
  //   ],
  //   [
  //     { link: "D", name: "BeeHive240AP" },
  //     { link: "E", name: "BeeHive240AP-AU" },
  //     { link: "F", name: "BeeProg2AP" },
  //   ]
  // );

  // let jsonObject = createNewTemplateJson(
  //   "TESTID",
  //   "AP1 SSOP42 ZIF 330mil",
  //   "71-1866",
  //   "280.00 € excl. VAT",
  //   "ZIF SSOP42, OpenTop type",
  //   "2 female connectors by 32 pins, DIN41612 B/2",
  //   "Universal",
  //   "(T)SSOP",
  //   [
  //     {
  //       text: "universal programming module for devices in SSOP package, body 300mil, 0.4mm pitch",
  //       bold: true,
  //     },
  //     {
  //       text: "operating (mechanical) warranty of ZIF socket - 10,000 actuations",
  //     },
  //   ],
  //   "X",
  //   "Y",
  //   [
  //     {
  //       text: "Programmer don`t need to be switched off and SW can be running during inserting/removing programming module",
  //       bold: true,
  //     },
  //     {
  //       text: "Protect the contacts of module connectors and ZIF socket from contamination. Any dirt and/or fat on contacts may cause errors during programming.",
  //       bold: true,
  //     },
  //     {
  //       text: "",
  //     },
  //     {
  //       text: "Unscrew 2 knurled thumb screws. Insert programming module into Programming Module Interface connectors, until it clicks. Due to connectors shape, only one orientation and position of programming module in Programming Module",
  //     },
  //   ],
  //   [
  //     { name: "SSOP42", image1: "Z", image2: "A" },
  //     { name: "SSOP43", image1: "B", image2: "C" },
  //   ],
  //   [
  //     { link: "D", name: "BeeHive240AP" },
  //     { link: "E", name: "BeeHive240AP-AU" },
  //     { link: "F", name: "BeeProg2AP" },
  //   ]
  // );

  let string = generateTemplateString(jsonObject);

  console.log(getTableLink(jsonObject));
  downloadFileFromString(string, jsonObject);
}

function downloadFileFromString(htmlString, jsonObject) {
  const content = htmlString;
  const blob = new Blob([content], { type: "text/html" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = jsonObject.id + ".html";
  a.click();
}

function getTableLink(jsonObject) {
  let string = `<tr data-href="${jsonObject.id}.html">
                  <td>${jsonObject.name}</td>
                  <td>${jsonObject.class}</td>
                  <td>${jsonObject.subclass}</td>
                  <td>${jsonObject.orderNumber}</td>
                </tr>`;

  return string;
}

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
  _manualObjectArray,
  _packagesObjectArray,
  _programmersObjectArray,
  _programmersNote
) {
  const _id = nameToId(_name);

  let jsonObject = {
    language: _language, // can be "en" or "de"
    id: _id, // can be "adapter", "ap1", "ap3"
    type: _type, // string
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
    manualObjectArray: _manualObjectArray,
    packagesObjectArray: _packagesObjectArray,
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
    data.price
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

  // manual
  let manual_section = "";
  if (data.manualObjectArray) {
    manual_section = generateManualSection(data.manualObjectArray);
  }

  // packages
  let packages_section = generatePackagesSection(data.packagesObjectArray);

  // table
  let table_section = "";

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

  console.log(data.language);
  if (data.language != "de") {
    languageString = `
    <img src="../../../img/icon/english.png" alt="british flag" />
    <img src="../../../img/icon/german.png" alt="german flag" />`;

    console.log(1);

    languageSwitch = "de";
  } else {
    languageString = `
    <img src="../../../img/icon/german.png" alt="german flag" />
    <img src="../../../img/icon/english.png" alt="british flag" />`;

    console.log(1);

    languageSwitch = "en";
  }

  let string = `<!DOCTYPE html>
            <html lang="${data.language}">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>${data.name}</title>

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
                      <a href="../universal-programmers/">Universal Programmers</a>
                      <a href="../production-programmers/">Production Programmers</a>
                      <a href="../programming-adapters/" ${
                        data.type === "adapter" ? 'class="active"' : ""
                      }>Adapters</a>
                      <a href="../ap1-programming-modules/" ${
                        data.type === "ap1" ? 'class="active"' : ""
                      }>AP1 Modules</a>
                      <a href="../ap3-programming-modules/" ${
                        data.type === "ap3" ? 'class="active"' : ""
                      }>AP3 Modules</a>
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

                    <div>
                      <a href="../../impressum.html">Impressum</a>
                      <a href="../../datenschutz.html">Datenschutz</a>
                      <a href="../../agb.html">AGB</a>
                      <a href="https://quicksite.me">by Quicksite</a>
                    </div>
                  </div>
                </footer>

                <script src="../../../scripts/language.js"></script>
              </body>
            </html>`;

  return string;
}

function nameToId(string) {
  return string.replace(/[/ ]/g, "_");
}

//*
//* - - - Section generation functions
//*
function generateTitleSection(name, orderNumber, price) {
  let priceString;

  if (price) {
    priceString = `Price: ${price}`;
  } else {
    priceString = `Ask for price`;
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
