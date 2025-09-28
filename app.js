document.addEventListener("DOMContentLoaded", () => {
  // Get all the necessary elements from the DOM
  const startButton = document.getElementById("start-check-in-button");
  const checkinOverlay = document.getElementById("check-in-overlay");
  const closeButton = document.getElementById("close-check-in");

  const steps = document.querySelectorAll(".check-in-step");
  const moodOptions = document.querySelectorAll(".mood-option");
  const actionButtons = document.querySelectorAll("[data-action]");

  // Function to navigate between steps
  const goToStep = (stepNumber) => {
    steps.forEach((step) => {
      if (step.getAttribute("data-step") === stepNumber.toString()) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  };

  // Function to open the check-in flow
  const openCheckin = () => {
    checkinOverlay.classList.add("visible");
    goToStep(1); // Always start at step 1
  };

  // Function to close the check-in flow
  const closeCheckin = () => {
    checkinOverlay.classList.remove("visible");
  };

  // --- EVENT LISTENERS ---

  // Listen for click on the main "Start Check-in" button
  if (startButton) {
    startButton.addEventListener("click", (e) => {
      e.preventDefault();
      openCheckin();
    });
  }

  // Listen for clicks on any of the mood options
  moodOptions.forEach((option) => {
    option.addEventListener("click", () => {
      // When a mood is selected, go to the next step
      goToStep(2);
    });
  });

  // Listen for clicks on the action buttons (Skip, Finish, Close)
  actionButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const action = button.getAttribute("data-action");
      if (action === "finish" || action === "skip") {
        goToStep(3); // Go to completion step
      } else if (action === "close") {
        closeCheckin();
      }
    });
  });

  // Listen for click on the main close button (the 'X')
  if (closeButton) {
    closeButton.addEventListener("click", closeCheckin);
  }
});
