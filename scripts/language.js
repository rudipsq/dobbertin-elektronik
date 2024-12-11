// redirects to a differnet language
function switchLanguage(languageKey = "en") {
  const currentLocation = window.location.pathname
    .split("/")
    .slice(2)
    .join("/");

  window.location.href = "/" + languageKey + "/" + currentLocation;
}

// returns the current displayed language key
function getLanguage() {
  return window.location.href.split("/")[3];
}
