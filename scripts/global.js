// redirects to a different language
const translations = {
  "datenschutz.html": "privacy-policy.html",
  "privacy-policy.html": "datenschutz.html",
  "impressum.html": "imprint.html",
  "imprint.html": "impressum.html",
};

function switchLanguage(targetLang = "en") {
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/").filter(Boolean);

  pathParts[0] = targetLang;

  // Check and translate specific path segments
  for (let i = 1; i < pathParts.length; i++) {
    if (translations[pathParts[i]]) {
      pathParts[i] = translations[pathParts[i]];
    }
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
}
