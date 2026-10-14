// Find the button and the encyclopedia section on the page.
const meetDogsButton = document.querySelector("#meet-dogs-button");
const encyclopedia = document.querySelector("#encyclopedia");

// Move to the dog cards when the visitor clicks the button.
meetDogsButton.addEventListener("click", function () {
  encyclopedia.scrollIntoView({ behavior: "smooth" });
});
