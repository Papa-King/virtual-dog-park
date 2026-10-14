// Find the button and the encyclopedia section on the page.
const meetDogsButton = document.querySelector("#meet-dogs-button");
const encyclopedia = document.querySelector("#encyclopedia");

// Move to the dog cards when the visitor clicks the button.
meetDogsButton.addEventListener("click", function () {
  encyclopedia.scrollIntoView({ behavior: "smooth" });
});

const adoptionForm = document.querySelector("#adoption-form");
const dogNameInput = document.querySelector("#dog-name");
const dogBreedSelect = document.querySelector("#dog-breed");
const nameError = document.querySelector("#name-error");
const virtualDogCard = document.querySelector("#virtual-dog-card");
const adoptedDogName = document.querySelector("#adopted-dog-name");
const adoptedDogBreed = document.querySelector("#adopted-dog-breed");
const dogDay = document.querySelector("#dog-day");
const dogStage = document.querySelector("#dog-stage");
const dogHappiness = document.querySelector("#dog-happiness");
const happinessMeter = document.querySelector("#happiness-meter");
const careMessage = document.querySelector("#care-message");
const feedButton = document.querySelector("#feed-button");
const playButton = document.querySelector("#play-button");

// This object remembers the current virtual dog's information.
let virtualDog = null;

// Show all of the current dog's values in the status card.
function displayVirtualDog() {
  // textContent displays a name as plain text, so it cannot become HTML.
  adoptedDogName.textContent = virtualDog.name;
  adoptedDogBreed.textContent = virtualDog.breed;
  dogDay.textContent = virtualDog.day;
  dogStage.textContent = virtualDog.stage;
  dogHappiness.textContent = virtualDog.happiness;
  happinessMeter.value = virtualDog.happiness;
  happinessMeter.textContent = virtualDog.happiness + "%";
}

// Check the name, then create a new puppy with its starting values.
function adoptDog(event) {
  event.preventDefault();

  const trimmedName = dogNameInput.value.trim();

  if (trimmedName.length === 0) {
    nameError.textContent = "Please enter a name for your dog.";
    dogNameInput.focus();
    return;
  }

  if (trimmedName.length > 20) {
    nameError.textContent = "Please use no more than 20 characters.";
    dogNameInput.focus();
    return;
  }

  nameError.textContent = "";
  virtualDog = {
    name: trimmedName,
    breed: dogBreedSelect.value,
    day: 1,
    stage: "Puppy",
    happiness: 50
  };

  displayVirtualDog();
  virtualDogCard.hidden = false;
  careMessage.textContent = trimmedName + " is ready for a happy day at the park!";
}

// Add 10 happiness points while keeping the total at 100 or below.
function increaseHappiness(activity) {
  if (virtualDog === null) {
    return;
  }

  virtualDog.happiness = Math.min(virtualDog.happiness + 10, 100);
  displayVirtualDog();

  if (virtualDog.happiness === 100) {
    careMessage.textContent = virtualDog.name + " is as happy as can be!";
  } else {
    careMessage.textContent = activity + " made " + virtualDog.name + " happier!";
  }
}

adoptionForm.addEventListener("submit", adoptDog);

feedButton.addEventListener("click", function () {
  increaseHappiness("Feeding");
});

playButton.addEventListener("click", function () {
  increaseHappiness("Playing");
});
