# dobbertin-elektronik
 
## TODO

- [x] links: remove country code (if possible)

### Default Seite erstellen
- [x] navbar: logo, links zu produkt seiten
- [x] navbar: language switcher
- [x] navbar: Language switch kleiner + eckig
- [x] footer
- [ ] index product liste, arrow button switcher


### Programmer Template
- [x] description section abaendern (css und html von adapter template)
- [x] text sections hinzufuegen (basierend auf adapter manual)
- [x] api schnittstelle


### Adapter Template
- [x] templates erstellen
- [x] template generator: downloadable template file, kopierbare inhaltsverzeichnis zeile
- [x] template generator: html template als string, placeholder fuer werte und texte
- [ ] template generator: one page html, integrated js, css erstellen ()
- [x] template generator: 2 languages


### Legal
- [x] agb kopieren
- [ ] impressum kontrollieren
- [ ] datenschutz updaten


### SEO
- [ ] Meta Tags 
- [ ] aria labels


### Structure
- [ ] html datein in richtige struktur kopieren
- [ ] links (stylesheet, script, ...) anpassen
- [ ] englische version




## HTML Texte bearbeiten
bold text: <span class="bold">TEXT</span>
api text: <span data-api="beep2_devices">TEXT</span>


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