# Virtual Dog Park

Virtual Dog Park is a beginner-friendly website built with HTML, CSS, and plain
JavaScript. Visitors can learn about three dog breeds and adopt one virtual dog
to care for over time.

The dog images are original, project-created SVG illustrations. They are not
real dog photographs.

## Features

- A Dog Encyclopedia covering the Beagle, Golden Retriever, and Poodle
- An adoption form with breed selection and dog-name validation
- A virtual dog profile showing name, breed, day, growth stage, and happiness
- Feed and Play actions that raise happiness
- A Next Day action that advances the dog's age
- A visible growth meter and written growth-stage information
- Automatic saving and restoration of one virtual dog
- A confirmed Start Over option for deleting saved progress
- A responsive layout for phones and laptops

## Preview the website

No package manager or build step is needed. For the most consistent browser
storage behavior, preview the project through a local server instead of opening
the HTML file directly.

Using VS Code Live Server:

1. Open this project folder in VS Code.
2. Install the **Live Server** extension if it is not already installed.
3. Open `index.html`.
4. Select **Go Live** in the VS Code status bar, or right-click `index.html` and
   select **Open with Live Server**.
5. Use the local address opened by Live Server in your browser.

As another option, run this command in the project folder:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Growth and happiness rules

- A newly adopted dog starts on Day 1 as a **Puppy** with 50 happiness.
- Day 1 is the **Puppy** stage.
- Days 2 and 3 are the **Young Dog** stage.
- Day 4 onward is the **Adult Dog** stage.
- Feed adds 10 happiness.
- Play adds 10 happiness.
- Happiness cannot rise above 100.
- Next Day adds 1 to the day and removes 5 happiness.
- Happiness cannot fall below 0.

## Saved progress

The website stores one virtual dog in the browser's `localStorage` using the
key `virtualDogParkPetV1`. The saved information includes the dog's name,
breed, day, and happiness.

This progress belongs only to that browser and local website address. It is
not stored in a GitHub account, uploaded to GitHub, or automatically shared
between browsers or devices. Clearing the browser's site data or confirming
**Start Over** removes the saved dog.

## Manual testing checklist

- [ ] Confirm that all three encyclopedia illustrations appear with descriptive
      alternative text.
- [ ] Select each breed and confirm that the adopted breed is displayed.
- [ ] Try an empty or spaces-only name and confirm that a helpful message appears.
- [ ] Enter a valid name and confirm that the dog begins on Day 1 as a Puppy with
      50 happiness.
- [ ] Select Feed and Play and confirm that each adds 10 happiness without going
      above 100.
- [ ] Select Next Day and confirm that the day rises by 1 and happiness falls by
      5 without going below 0.
- [ ] Check that the stage reads Puppy on Day 1, Young Dog on Days 2–3, and Adult
      Dog from Day 4 onward.
- [ ] Refresh the page and confirm that the adopted dog and its progress return.
- [ ] Select Start Over, cancel the confirmation, and confirm that the dog remains.
- [ ] Select Start Over again, accept the confirmation, and confirm that the
      adoption form returns.
- [ ] Check the page at both phone and laptop widths.
