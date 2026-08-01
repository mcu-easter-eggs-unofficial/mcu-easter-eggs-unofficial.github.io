let easterEggs = [];
let currentCard = null;
let slideshowInterval = null;

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
    updateSlideshows(currentCard);
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

function updateSlideshows(card) {
    const leftContainer = document.getElementById('slideshow-left');
    const rightContainer = document.getElementById('slideshow-right');
    
    leftContainer.innerHTML = '';
    rightContainer.innerHTML = '';
    clearInterval(slideshowInterval);
    
    if (!card.Serial) return;
    
    const match = card.Serial.match(/^([A-Za-z]+)(?=S\d+E\d+)/);
    if (!match) return;
    
    const abbrev = match[1];
    const basePath = `images/MCU_Easter_Eggs_Pics/${abbrev}/S${card.Season}/E${card.Episode}/`;
    
    let loadedCount = 0;
    for(let i=1; i<=5; i++) {
        const src = `${basePath}frame_${i}.jpg`;
        const imgL = document.createElement('img');
        const imgR = document.createElement('img');
        
        imgL.src = src;
        imgR.src = src;
        
        imgL.onerror = () => { imgL.remove(); imgR.remove(); };
        imgR.onerror = () => {}; 
        
        imgL.onload = () => {
            if (loadedCount === 0) {
                imgL.classList.add('active');
                imgR.classList.add('active');
            }
            loadedCount++;
        };
        
        leftContainer.appendChild(imgL);
        rightContainer.appendChild(imgR);
    }
    
    // Switch images every 4 seconds
    slideshowInterval = setInterval(() => {
        const imgsL = Array.from(leftContainer.children);
        const imgsR = Array.from(rightContainer.children);
        
        if (imgsL.length > 1) {
            let activeIdx = imgsL.findIndex(img => img.classList.contains('active'));
            if (activeIdx !== -1) {
                imgsL[activeIdx].classList.remove('active');
                imgsR[activeIdx].classList.remove('active');
                
                let nextIdx = (activeIdx + 1) % imgsL.length;
                imgsL[nextIdx].classList.add('active');
                imgsR[nextIdx].classList.add('active');
            } else if (imgsL.length > 0) {
                imgsL[0].classList.add('active');
                imgsR[0].classList.add('active');
            }
        }
    }, 4000);
}
