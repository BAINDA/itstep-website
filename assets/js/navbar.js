document.addEventListener("DOMContentLoaded", function () {
  // Get the current URL path of the page
  const currentUrl = window.location.pathname;

  // Extract just the filename from the current URL (e.g., 'index.html', 'about.html', etc.)
  const currentPage = currentUrl.substring(currentUrl.lastIndexOf("/") + 1);

  // Select all the navigation links in the navbar
  const navLinks = document.querySelectorAll(".navbar .nav-link");

  // Loop through each navigation link
  navLinks.forEach((link) => {
    // Extract the filename from the href attribute of the link (e.g., 'index.html', 'about.html', etc.)
    const linkPage = link
      .getAttribute("href")
      .substring(link.getAttribute("href").lastIndexOf("/") + 1);

    // Check if the link's filename matches the current page's filename
    if (linkPage === currentPage) {
      // If it matches, add the 'active' class to this link
      link.classList.add("active");
    } else {
      // If it doesn't match, remove the 'active' class (if any)
      link.classList.remove("active");
    }
  });
});
