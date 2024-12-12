//* enable link to product details page
document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("tbody tr");

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const href = row.getAttribute("data-href");
      if (href) {
        window.location.href = href;
      }
    });
  });
});

//* enaable search bar

const rows = document.querySelectorAll("#product_list tr");
let searchInput = document.getElementById("search_input");

searchInput.addEventListener("input", function () {
  let searchString = this.value;
  filterRows(searchString);
});

function filterRows(searchString) {
  const lowerSearchString = searchString.toLowerCase();

  // Loop through each row
  rows.forEach((row) => {
    // Get the text content of the row and convert to lowercase
    const rowText = row.textContent.toLowerCase();

    // Check if the row contains the search string
    if (rowText.includes(lowerSearchString)) {
      // If it does, make sure it's visible
      row.style.display = "";
    } else {
      // If it doesn't, hide the row
      row.style.display = "none";
    }
  });
}
