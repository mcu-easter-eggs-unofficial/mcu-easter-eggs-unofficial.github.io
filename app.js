let easterEggs = [];
let currentCard = null;

const flashcardWrapper = document.getElementById('flashcard-wrapper');
const flashcard = document.getElementById('flashcard');
const ctxSeries = document.getElementById('ctx-series');
const ctxSeasonEp = document.getElementById('ctx-season-ep');
const questionEl = document.getElementById('card-question');
const answerEl = document.getElementById('card-answer');
const referenceEl = document.getElementById('card-reference');
const refText = document.getElementById('ref-text');
const cautionEl = document.getElementById('card-caution');

const newCardBtn = document.getElementById('new-card-btn');
const revealBtn = document.getElementById('reveal-btn');
const showQBtn = document.getElementById('show-q-btn');

// Load CSV Data
Papa.parse('easter-eggs.csv', {
    download: true,
    header: true,
    complete: function(results) {
        // Filter out empty rows just in case
        easterEggs = results.data.filter(row => row.Series && row.Question);
        if(easterEggs.length > 0) {
            loadRandomCard();
            flashcardWrapper.classList.remove('hidden');
        }
    }
});

function loadRandomCard() {
    if (easterEggs.length === 0) return;
    
    // Pick random index
    const randomIndex = Math.floor(Math.random() * easterEggs.length);
    currentCard = easterEggs[randomIndex];
    
    // Reset flip state
    flashcard.classList.remove('flipped');
    
    // Re-trigger fly-in animation
    flashcardWrapper.classList.remove('fly-in');
    void flashcardWrapper.offsetWidth; // Trigger reflow
    flashcardWrapper.classList.add('fly-in');

    populateCard(currentCard);
}

function populateCard(card) {
    // Front
    ctxSeries.textContent = card['Series'];
    ctxSeasonEp.textContent = `SEASON ${card['Season']}, EP ${card['Episode']}`;
    questionEl.textContent = card['Question'];
    
    // Back
    answerEl.textContent = card['Answer'];
    
    // Handle "Other Series" reference
    if (card['Other Series'] && card['Other Series'].trim() !== '') {
        refText.textContent = card['Other Series'];
        referenceEl.classList.remove('hidden');
    } else {
        referenceEl.classList.add('hidden');
    }
    
    // Handle "Speculative" caution
    if (card['Speculative'] && card['Speculative'].toUpperCase().trim() === 'Y') {
        cautionEl.classList.remove('hidden');
    } else {
        cautionEl.classList.add('hidden');
    }
}

// Event Listeners
newCardBtn.addEventListener('click', loadRandomCard);

revealBtn.addEventListener('click', () => {
    flashcard.classList.add('flipped');
});

showQBtn.addEventListener('click', () => {
    flashcard.classList.remove('flipped');
});
