// Wait for the entire HTML document to be loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  const moodButtons = document.querySelectorAll(".mood-btn");
  const stressorButtons = document.querySelectorAll(".stressor-btn");
  // Select the stressor section
  const stressorSection = document.querySelector(".stressor-section");
  // Select the submit button
  const submitButton = document.getElementById("submit-btn");

  // --- 2. ADDING EVENT LISTENERS ---

  // Add a click event listener to each mood button
  moodButtons.forEach((button) => {
    button.addEventListener("click", () => {
      handleMoodSelection(button);
    });
  });

  // Add a click event listener to each stressor button
  stressorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // The 'toggle' function adds the class if it's not there,
      // and removes it if it is. This is perfect for multi-select.
      button.classList.toggle("selected");
    });
  });

  // --- 3. DEFINING THE HANDLER FUNCTION ---

  function handleMoodSelection(selectedButton) {
    // First, remove the 'selected' class from all mood buttons
    moodButtons.forEach((btn) => {
      btn.classList.remove("selected");
    });

    // Then, add the 'selected' class to the one that was just clicked
    selectedButton.classList.add("selected");

    // Finally, reveal the hidden sections
    stressorSection.classList.remove("hidden");
    submitButton.classList.remove("hidden");
  }
});
