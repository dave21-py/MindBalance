document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Hero Animation on Page Load ---
  const heroElements = document.querySelectorAll(".hero-animate");
  heroElements.forEach((el, index) => {
    setTimeout(
      () => {
        el.classList.add("visible");
      },
      (index + 1) * 150,
    );
  });

  // --- 2. Scroll-Reveal Animation for All Other Sections ---
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  const elementsToAnimate = document.querySelectorAll(
    ".features-visual, .feature-item, .values-section h2, .values-section .section-subtitle, .value-item, .footer-branding, .link-column",
  );
  elementsToAnimate.forEach((element) => {
    scrollObserver.observe(element);
  });

  // --- 3. Modal Functionality ---
  const openModalButtons = document.querySelectorAll(".js-open-modal");
  const closeModalButton = document.getElementById("close-modal-button");
  const modalOverlay = document.getElementById("modal-overlay");
  const modalForm = document.getElementById("modal-form");
  const modalSuccess = document.getElementById("modal-success");

  const openModal = (event) => {
    event.preventDefault();
    modalForm.classList.remove("is-hidden");
    modalSuccess.classList.add("is-hidden");
    modalOverlay.classList.add("visible");
  };
  const closeModal = () => {
    modalOverlay.classList.remove("visible");
  };
  openModalButtons.forEach((button) => {
    button.addEventListener("click", openModal);
  });
  if (closeModalButton && modalOverlay) {
    closeModalButton.addEventListener("click", closeModal);
    modalOverlay.addEventListener("click", (event) => {
      if (event.target === modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modalOverlay.classList.contains("visible"))
        closeModal();
    });
  }
  if (modalForm) {
    modalForm.addEventListener("submit", (event) => {
      event.preventDefault();
      modalForm.classList.add("is-hidden");
      modalSuccess.classList.remove("is-hidden");
    });
  }

  // --- 4. NEW: Smooth Scrolling for ALL Anchor Links ---
  const allAnchorLinks = document.querySelectorAll('a[href^="#"]');
  allAnchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // Check if the link is NOT a modal trigger
      if (!this.classList.contains("js-open-modal")) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: "smooth" });
        }
      }
    });
  });

  // --- 5. NEW: Active Navigation Highlighting on Scroll ---
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === entry.target.id) {
              link.classList.add("active");
            }
          });
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" },
  ); // Activates when the section is in the middle of the screen

  sections.forEach((section) => {
    navObserver.observe(section);
  });
});
