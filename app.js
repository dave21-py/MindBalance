document.addEventListener("DOMContentLoaded", () => {
  // --- 1. PAGE NAVIGATION ---
  const navLinks = document.querySelectorAll(".sidebar-nav a");
  const pages = document.querySelectorAll(".page");
  const sidebarLinks = document.querySelectorAll(".sidebar-nav li");

  const showPage = (pageId) => {
    pages.forEach((page) => {
      if (page.id === pageId) {
        page.classList.remove("is-hidden");
      } else {
        page.classList.add("is-hidden");
      }
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const pageId = link.getAttribute("data-page");

      if (pageId) {
        // Handle page switching
        showPage(pageId);

        // Handle active state in sidebar
        sidebarLinks.forEach((li) => li.classList.remove("active"));
        link.parentElement.classList.add("active");
      }
    });
  });

  // --- 2. CHECK-IN MODAL LOGIC ---
  const startButton = document.getElementById("start-check-in-button");
  const checkinOverlay = document.getElementById("check-in-overlay");
  const closeButton = document.getElementById("close-check-in");

  const steps = document.querySelectorAll(".check-in-step");
  const moodOptions = document.querySelectorAll(".mood-option");
  const actionButtons = document.querySelectorAll("[data-action]");

  const goToStep = (stepNumber) => {
    steps.forEach((step) => {
      if (step.getAttribute("data-step") === stepNumber.toString()) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  };
  const openCheckin = () => {
    checkinOverlay.classList.add("visible");
    goToStep(1);
  };
  const closeCheckin = () => {
    checkinOverlay.classList.remove("visible");
  };
  if (startButton) {
    startButton.addEventListener("click", (e) => {
      e.preventDefault();
      openCheckin();
    });
  }
  moodOptions.forEach((option) => {
    option.addEventListener("click", () => {
      goToStep(2);
    });
  });
  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      if (action === "finish" || action === "skip") {
        goToStep(3);
      } else if (action === "close") {
        closeCheckin();
      }
    });
  });
  if (closeButton) {
    closeButton.addEventListener("click", closeCheckin);
  }

  // --- 3. LIBRARY FILTERING LOGIC ---
  const filterButtons = document.querySelectorAll(".filter-button");
  const contentCards = document.querySelectorAll(
    ".content-card[data-category]",
  );

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Set active state on buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      // Show/hide content cards based on filter
      contentCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || filter === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});
