function downloadFileFromString(htmlString) {
  const content = htmlString;
  const blob = new Blob([content], { type: "text/html" });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "output.html";
  a.click();
}

function generateNewJsonObject(_id, _name) {
  let jsonObject = {
    id: _id,
    name: _name,
    orderNumber: _orderNumber,
    manualObjectArray: [],
    packagesObjectArray: [],
    programmersObjectArray: [],
  };

  return jsonObject;
}

function generateTemplateString(jsonObject) {
  const data = jsonObject;

  const string = ``;

  // title
  let title_section = generateTitleSection(data.name, data.orderNumber);

  // description
  let description_section;

  // image
  let image_section;

  // manual
  let manual_section = "";
  if (data.manualArray) {
    manual_section = generateManualSection(data.manualObjectArray);
  }

  // packages
  let packages_section = generatePackagesSection(data.packagesObjectArray);

  // table
  let table_section;

  // programmers
  let programmers_section = "";
  if (data.programmersObjectArray) {
    programmers_section = generateProgrammersSection(
      data.programmersObjectArray
    );
  }

  return string;
}

function generateTitleSection(name, orderNumber) {
  let string = `<section id="title_section">
                  <h1>${name}</h1>
                  <p>${orderNumber}</p>
                </section>;`;

  return string;
}

function generateManualSection(manualObjectArray) {
  let string;
  let liTagString;

  for (const liString of manualObjectArray) {
    if (liString.isBold) {
      liTagString += `<li class="bold">${liString.text}</li>`;
      // } else if (liString.isEmpty) {
      //   liTagString += `<li class="empty">${liString.text}</li>`;
    } else {
      liTagString += `<li>${liString.text}</li>`;
    }
  }

  string = `<section id="manual_section">
              <h2>adapter manual</h2>
              <ul>
                ${liTagString}
              </ul>
            </section>`;

  return string;
}

function generatePackagesSection(packagesObjectArray) {
  let string;
  let packagesString;

  for (const packageObject of packagesObjectArray) {
    packagesString += `<div>
                        <div>
                          <h3>${packageObject.name}</h3>
                          <div>
                            <img src="${packageObject.image1}" alt="${packageObject.name} image small" />
                          </div>
                        </div>
                        <div>
                          <img src="${packageObject.image1}" alt="${packageObject.name} image big" />
                        </div>
                      </div>`;
  }

  string = `<section id="packages_section">
              <h2>accepted packages</h2>
                ${packagesString}
            </section>`;

  return string;
}

function generateProgrammersSection(programmersObjectArray) {
  let string;
  let aTagString;

  for (const programmerObject of programmersObjectArray) {
    aTagString += `<div><a href="${programmerObject.link}">${programmerObject.name}</a></div>`;
  }

  string = `<section id="programmers_section">
              <h2>useable for programmers</h2>
              <div id="programmer_list">
                ${aTagString}
              </div>
              <p>Note: This programming adapter / module may not support all devices in the package(s) mentioned above on your programmer. Please, verify situation for particular device(s) you are going to work with using actual Device list of your programmer..</p>
            </section>`;

  return string;
}
