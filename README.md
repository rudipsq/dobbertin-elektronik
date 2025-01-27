# dobbertin-elektronik
 
## TODO

- [ ] template generator: one page html, integrated js, css erstellen
- [ ] impressum kontrollieren
- [ ] datenschutz updaten





## HTML Texte bearbeiten
bold text: <span class="bold">TEXT</span>
api text: <span data-api="beep2_devices">PLACEHOLDER</span>


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


# TODO
- use api data js path austauschen