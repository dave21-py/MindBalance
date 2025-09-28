document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Smooth Scrolling for Navigation Links ---
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent the default jump
      let targetId = this.getAttribute("href");
      let targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // --- 2. Scroll Reveal Animation using Intersection Observer ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target); // Stop observing once it's visible
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% of the element is visible
    },
  );

  // Select all elements you want to animate on scroll
  const elementsToAnimate = document.querySelectorAll(
    ".feature-card, .about-content, .cta-section h2, .cta-section p, .cta-section .cta-button",
  );

  // Observe each element
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });
});
