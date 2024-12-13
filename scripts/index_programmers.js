//* link to programmer details page
document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll("#product_list > li");

  rows.forEach((row) => {
    row.addEventListener("click", () => {
      const href = row.getAttribute("data-href");

      if (href) {
        window.location.href = href;
      }
    });
  });
});
