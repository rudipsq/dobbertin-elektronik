// redirects to a different language
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

// returns the current displayed language key
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

// updates the header height
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

  console.log(headerHeight);
}
