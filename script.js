// Part 1: Number Facts
axios
    .get("http://numbersapi.com/16/trivia?json")
    .then((response) => {
        console.log(response.data);
        return axios.get(`http://numbersapi.com/16,12,10,98/trivia?json`);
    })
    .then((response) => {
        const numberFacts = response.data;
        for (let key in numberFacts) {
            const numberFact = numberFacts[key];
            $("#number-facts").append(`<p>${numberFact}</p>`);
        }
    })
    .catch((error) => {
        console.log(error);
    });

// Part 2: Deck of Cards

const listOfCards = [];

axios
    .get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
    .then((response) => {
        const card = response.data.cards[0];
        console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
        );

        return axios.get(
            `https://deckofcardsapi.com/api/deck/new/draw/?count=1`
        );
    })
    .then((response) => {
        const deck_id = response.data.deck_id;
        const card = response.data.cards[0];
        listOfCards.push(displayCard(card.value, card.suit));
        return axios.get(
            `https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
        );
    })
    .then((response) => {
        const card = response.data.cards[0];
        listOfCards.push(displayCard(card.value, card.suit));
        console.log(listOfCards[0], ",", listOfCards[1]);
    });

// Part 2.3: Deck of Cards
$(() => {
    let deck_id;
    axios
        .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then((response) => {
            deck_id = response.data.deck_id;
        });

    $("#draw-btn").on("click", () => {
        const $cardsDiv = $("#cards");
        axios
            .get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            .then((response) => {
                const card = response.data.cards[0];
                $cardsDiv.html(`<img src="${card.images.png}" alt="${displayCard(card.value, card.suit)}" srcset="">`);
            });
    });
});

function displayCard(value, suit) {
    return `${value.toLowerCase()} of ${suit.toLowerCase()}`;
}
