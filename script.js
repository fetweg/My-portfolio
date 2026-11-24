// Filter the project cards when a category button is clicked.
const filterButtons = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterButtons.forEach(function(button) {
  button.addEventListener("click", function() {
    const selectedCategory = button.getAttribute("data-filter");

    filterButtons.forEach(function(item) {
      item.classList.remove("active");
    });
    button.classList.add("active");

    projectCards.forEach(function(card) {
      const cardCategory = card.getAttribute("data-category");

      if (selectedCategory === "all" || selectedCategory === cardCategory) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
});

// Check that the contact form has valid information.
const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const feedback = document.getElementById("formFeedback");
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || message === "") {
      feedback.textContent = "Please fill in all the fields.";
      feedback.style.color = "red";
    } else if (!emailPattern.test(email)) {
      feedback.textContent = "Please enter a valid email address.";
      feedback.style.color = "red";
    } else {
      feedback.textContent = "Thank you, " + name + ". Your form has passed validation!";
      feedback.style.color = "green";
      contactForm.reset();
    }
  });
}
