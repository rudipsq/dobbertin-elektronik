# dobbertin-elektronik
 


## HTML Texte bearbeiten
bold text: <span class="bold">TEXT</span>
api text: <span data-api="beep2_devices">PLACEHOLDER</span>



## Farben ändern
./stylesheets/global.css

--c-primary: #daf4ff; kann angepasst werden



## Struktur

structure
├── data
│   ├── fetch_elnec_api.php: server side PHP script to regularly update device data from elnec
│   └── results_elnec_api.json: stores results from the PHP api call
├── scripts: client side javascript files
├── stylesheets: css files
├── font: font variants
├── img
│   ├── icon: small symbols or icons
│   ├── logo: logo image
│   ├── pic: images with no specific category
│   ├── packages: images for packages of adapters, AP1 modules and AP3 modules
│   └── products: images of products
│       ├── universal-programmers
│       ├── production-programmers
│       ├── programming-adapters
│       ├── ap1-programming-modules
│       └── ap3-programming-modules
├── de: german HTML files
│   ├── agb.html: AGB
│   ├── datenschutz.html
│   ├── impressum.html
│   ├── index.html: Home Page
│   ├── template_generator.html
│   └── products: every subfolder contains an index.html file to list its products and a HTML file for each product in that list
│       ├── universal-programmers
│       ├── production-programmers
│       ├── programming-adapters
│       ├── ap1-programming-modules
│       └── ap3-programming-modules
└── en: same structure as "de" folder



## Template Genetator
1. kompletten HTML Code der Elnec Seite kopieren
2. falls vorhanden: "Hover Image" hinzufügen
3. für "Short description" und "Manual": 1. Copy EN -> mit deepl übersetzen -> Paste DE
4. "Programmers" und "Note" kontrollieren
5. "generate english template" oder "generate german template" klicken
6. HTML Datei speichern
7. Bilder von der Elnec Seite downloaden (+packages Bilder)



## ToDo
- testen ob API daten angezeigt werden (falls nicht: falscher pfad in /scripts/use_api_data.js)