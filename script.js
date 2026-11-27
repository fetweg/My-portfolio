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
// GitHub API Integration

const githubContainer = document.getElementById("githubRepos");

if (githubContainer) {

    fetch("https://api.github.com/users/fetweg/repos?sort=updated")
        .then(response => {
            if (!response.ok) {
                throw new Error("Unable to load repositories");
            }
            return response.json();
        })
        .then(repositories => {

            githubContainer.textContent = "";

            if (repositories.length === 0) {
                githubContainer.textContent = "No repositories found.";
                return;
            }

            repositories.forEach(repo => {

                const card = document.createElement("article");
                card.className = "project-card";

                const title = document.createElement("h3");
                title.textContent = repo.name;

                const description = document.createElement("p");
                description.textContent =
                    repo.description || "No description available.";

                const language = document.createElement("p");
                language.textContent =
                    "Language: " + (repo.language || "Not specified");

                const link = document.createElement("a");
                link.textContent = "View Repository";
                link.href = repo.html_url;
                link.target = "_blank";
                link.rel = "noopener noreferrer";

                card.appendChild(title);
                card.appendChild(description);
                card.appendChild(language);
                card.appendChild(link);

                githubContainer.appendChild(card);

            });
        })
        .catch(error => {
            githubContainer.textContent =
                "Sorry, GitHub repositories could not be loaded. Please try again later.";
            console.error(error);
        });
}
