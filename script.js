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

  // NEW: Get modal form and success message elements
  const modalForm = document.getElementById("modal-form");
  const modalSuccess = document.getElementById("modal-success");

  const openModal = (event) => {
    event.preventDefault();
    // NEW: Ensure form is visible and success is hidden when opening
    modalForm.classList.remove("is-hidden");
    modalSuccess.classList.add("is-hidden");
    modalOverlay.classList.add("visible");
  };

  const closeModal = () => {
    modalOverlay.classList.remove("visible");
  };

  // Attach event listeners
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

  // NEW: Handle form submission
  if (modalForm) {
    modalForm.addEventListener("submit", (event) => {
      event.preventDefault(); // Stop the form from reloading the page
      modalForm.classList.add("is-hidden");
      modalSuccess.classList.remove("is-hidden");
    });
  }
});
