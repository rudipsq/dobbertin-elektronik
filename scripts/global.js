// redirects to a different language
const translations = {
  "datenschutz.html": "privacy-policy.html",
  "privacy-policy.html": "datenschutz.html",
  "impressum.html": "imprint.html",
  "imprint.html": "impressum.html",
};

// function switchLanguage(targetLang = "en") {
//   const currentPath = window.location.pathname;
//   const pathParts = currentPath.split("/").filter(Boolean);

//   pathParts[0] = targetLang;

//   // Check and translate specific path segments
//   for (let i = 1; i < pathParts.length; i++) {
//     if (translations[pathParts[i]]) {
//       pathParts[i] = translations[pathParts[i]];
//     }
//   }

//   window.location.href = "/" + pathParts.join("/");
// }

// returns the current displayed language key

function switchLanguage(targetLang = "en") {
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);

  const languageCodes = ["en", "de"];
  let langIndex = -1;

  for (let i = 0; i < pathParts.length; i++) {
    if (languageCodes.includes(pathParts[i])) {
      langIndex = i;
      break;
    }
  }

  if (langIndex === -1) {
    console.error("No language code found in the URL.");
    return;
  }

  pathParts[langIndex] = targetLang;

  for (let i = langIndex + 1; i < pathParts.length; i++) {
    if (translations[pathParts[i]]) {
      pathParts[i] = translations[pathParts[i]];
    }
  }

  window.location.href = "/" + pathParts.join("/");
}

// function getLanguage() {
//   const pathParts = window.location.pathname.split("/").filter(Boolean);
//   const languageCodes = ["en", "de"];

//   for (const part of pathParts) {
//     if (languageCodes.includes(part)) {
//       return part;
//     }
//   }

//   return null;
// }

// updates the header height

function getLanguage() {
  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const languageCodes = ["en", "de"];

  for (const part of pathParts) {
    if (languageCodes.includes(part)) {
      return part;
    }
  }

  return null;
}

document.addEventListener("DOMContentLoaded", () => {
  updateHeaderHeight();
});

window.addEventListener("resize", updateHeaderHeight);

function updateHeaderHeight() {
  const header = document.querySelector("header");
  const headerHeight = header.offsetHeight;
  document.documentElement.style.setProperty(
    "--e-header-height",
    `${headerHeight - 19}px`
  );
}
