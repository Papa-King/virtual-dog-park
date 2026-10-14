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
const growthMeter = document.querySelector("#growth-meter");
const careMessage = document.querySelector("#care-message");
const feedButton = document.querySelector("#feed-button");
const playButton = document.querySelector("#play-button");
const nextDayButton = document.querySelector("#next-day-button");
const startOverButton = document.querySelector("#start-over-button");

const storageKey = "virtualDogParkPetV1";
const allowedBreeds = ["Beagle", "Golden Retriever", "Poodle"];

// This object remembers the current virtual dog's information.
let virtualDog = null;

// Work out the growth stage from the current day.
function getGrowthStage(day) {
  if (day === 1) {
    return "Puppy";
  }

  if (day <= 3) {
    return "Young Dog";
  }

  return "Adult Dog";
}

// Save one dog as text in this browser's localStorage.
function saveVirtualDog() {
  localStorage.setItem(storageKey, JSON.stringify(virtualDog));
}

// Show all of the current dog's values in the status card.
function displayVirtualDog() {
  const growthStage = getGrowthStage(virtualDog.day);
  let growthLevel = 3;

  if (growthStage === "Puppy") {
    growthLevel = 1;
  } else if (growthStage === "Young Dog") {
    growthLevel = 2;
  }

  // textContent displays a name as plain text, so it cannot become HTML.
  adoptedDogName.textContent = virtualDog.name;
  adoptedDogBreed.textContent = virtualDog.breed;
  dogDay.textContent = virtualDog.day;
  dogStage.textContent = growthStage;
  dogHappiness.textContent = virtualDog.happiness;
  happinessMeter.value = virtualDog.happiness;
  happinessMeter.textContent = virtualDog.happiness + "%";
  growthMeter.value = growthLevel;
  growthMeter.textContent = growthStage;
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
    happiness: 50
  };

  displayVirtualDog();
  saveVirtualDog();
  adoptionForm.hidden = true;
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
  saveVirtualDog();

  if (virtualDog.happiness === 100) {
    careMessage.textContent = virtualDog.name + " is as happy as can be!";
  } else {
    careMessage.textContent = activity + " made " + virtualDog.name + " happier!";
  }
}

// Move forward one day and lower happiness without going below zero.
function goToNextDay() {
  if (virtualDog === null) {
    return;
  }

  virtualDog.day += 1;
  virtualDog.happiness = Math.max(virtualDog.happiness - 5, 0);
  displayVirtualDog();
  saveVirtualDog();
  careMessage.textContent = "A new day has started for " + virtualDog.name + ".";
}

// Load a valid saved dog when the page opens.
function restoreVirtualDog() {
  const savedDogText = localStorage.getItem(storageKey);

  if (savedDogText === null) {
    return;
  }

  try {
    const savedDog = JSON.parse(savedDogText);
    const hasValidName =
      typeof savedDog.name === "string" &&
      savedDog.name.trim().length > 0 &&
      savedDog.name.length <= 20;
    const hasValidBreed = allowedBreeds.includes(savedDog.breed);
    const hasValidDay = Number.isInteger(savedDog.day) && savedDog.day >= 1;
    const hasValidHappiness =
      Number.isInteger(savedDog.happiness) &&
      savedDog.happiness >= 0 &&
      savedDog.happiness <= 100;

    if (!hasValidName || !hasValidBreed || !hasValidDay || !hasValidHappiness) {
      return;
    }

    virtualDog = savedDog;
    displayVirtualDog();
    adoptionForm.hidden = true;
    virtualDogCard.hidden = false;
    careMessage.textContent = "Welcome back, " + virtualDog.name + "!";
  } catch (error) {
    console.log("The saved virtual dog could not be read.");
  }
}

// Delete progress only after the visitor confirms the choice.
function startOver() {
  const shouldStartOver = window.confirm(
    "Start over? This will delete your saved virtual dog."
  );

  if (!shouldStartOver) {
    return;
  }

  localStorage.removeItem(storageKey);
  virtualDog = null;
  adoptionForm.reset();
  nameError.textContent = "";
  careMessage.textContent = "";
  virtualDogCard.hidden = true;
  adoptionForm.hidden = false;
  dogNameInput.focus();
}

adoptionForm.addEventListener("submit", adoptDog);

feedButton.addEventListener("click", function () {
  increaseHappiness("Feeding");
});

playButton.addEventListener("click", function () {
  increaseHappiness("Playing");
});

nextDayButton.addEventListener("click", goToNextDay);
startOverButton.addEventListener("click", startOver);

restoreVirtualDog();
