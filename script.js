// Part 1: Number Facts
// 1.
async function favoriteNumber(number = 1) {
  let url = `http://numbersapi.com/${number}?json`;

  let promise = await axios.get(url);
  console.log(promise.data.text);
}

// 2.
async function favoriteMultipleNumberData(numbers = [1, 2, 3, 911, 30322]) {
  let promiseArray = [];
  for (let i = 0; i < numbers.length; i++) {
    promiseArray.push(
      await axios.get(`http://numbersapi.com/${numbers[i]}?json`)
    );
  }

  const div = document.querySelector("#numberfacts");
  const makeUl = document.createElement("ul");
  div.append(makeUl);
  const ul = document.querySelector("ul");

  promiseArray.forEach((promise) => {
    const li = document.createElement("li");
    li.textContent = promise.data.text;
    ul.append(li);
  });
}

// 3.
async function get4Facts(number = 4) {
  const div = document.querySelector("#numberfacts");
  const makeUl = document.createElement("ul");
  div.append(makeUl);
  const ul = document.querySelector("ul");

  let promiseArray = [];
  for (let i = 0; i < 4; i++) {
    promiseArray.push(await axios.get(`http://numbersapi.com/${number}?json`));
  }

  promiseArray.forEach((promise) => {
    const li = document.createElement("li");
    li.textContent = promise.data.text;
    ul.append(li);
  });
}

// Part 2: Deck of Cards
// 1.
async function drawCard() {
  let deckId;

  let deck = await axios.get(
    "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );

  deckId = deck.data.deck_id;

  let card = await axios.get(
    `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  console.log(`${card.data.cards[0].value} of ${card.data.cards[0].suit}`);
}

// 2.
async function draw2Cards() {
  let deckId;

  let deck = await axios.get(
    "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );

  deckId = deck.data.deck_id;

  let firstDraw = await axios.get(
    `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  let card1 = firstDraw.data.cards[0];

  let secondDraw = await axios.get(
    `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  let card2 = secondDraw.data.cards[0];

  console.log(`${card1.value} of ${card1.suit}`);
  console.log(`${card2.value} of ${card2.suit}`);
}

// 3.
let button = document.querySelector(".button");
let table = document.querySelector(".table");

async function deckInit() {
  const newDeck = await axios.get(
    "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );

  const deckId = newDeck.data.deck_id;

  button.addEventListener("click", async function () {
    const res = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    if (res.data.remaining != 0) {
      const card = res.data.cards[0];

      const image = document.createElement("img");
      image.src = res.data.cards[0].image;
      table.appendChild(image);

      console.log(`${card.value} of ${card.suit}`);
    } else {
      const warning = document.createElement("h1");
      warning.innerText = "No more cards!!";
      table.appendChild(warning);

      console.log("No more cards!");
    }
  });
}

deckInit();
