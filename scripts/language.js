// // redirects to a differnet language
// function switchLanguage(languageKey = "en") {
//   const currentLocation = window.location.pathname
//     .split("/")
//     .slice(2)
//     .join("/");

//   window.location.href = "/" + languageKey + "/" + currentLocation;
// }

// // returns the current displayed language key
// function getLanguage() {
//   return window.location.href.split("/")[3];
// }

// Redirects to a different language
function switchLanguage(languageKey = "en") {
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);
  const currentLang = getLanguage();

  if (currentLang) {
    const langIndex = pathParts.indexOf(currentLang);
    pathParts[langIndex] = languageKey;
  } else {
    pathParts.unshift(languageKey);
  }

  window.location.href = "/" + pathParts.join("/");
}

// Returns the current displayed language key
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
