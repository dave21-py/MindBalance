document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Robust Hero Animation on Page Load ---
  // Select all the elements in the hero section that need to animate
  const heroElements = document.querySelectorAll(".hero-animate");

  // Loop through each element and apply the 'visible' class with a staggered delay
  heroElements.forEach((el, index) => {
    // The delay is index * 100ms. So the first is 100ms, second is 200ms, etc.
    setTimeout(
      () => {
        el.classList.add("visible");
      },
      (index + 1) * 150,
    );
  });

  // --- 2. Scroll-Reveal Animation for Sections Below the Fold ---
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1, // Animate when 10% of the element is visible
    },
  );

  // We select EVERYTHING EXCEPT the hero elements, which are now handled by the load animation.
  const elementsToAnimateOnScroll = document.querySelectorAll(
    ".features-text h2, .features-text .section-subtitle, .feature-item, .features-visual, " +
      ".values-section h2, .values-section .section-subtitle, .value-item, " +
      ".footer-branding, .link-column",
  );

  elementsToAnimateOnScroll.forEach((element) => {
    observer.observe(element);
  });
});
