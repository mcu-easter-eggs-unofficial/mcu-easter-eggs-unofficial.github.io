let easterEggs = [];
let currentCard = null;
let slideshowInterval = null;

const EPISODE_URLS = {
    "Agatha All Along_S1_E1": "https://youtu.be/WHlEO1Bphu0",
    "Agatha All Along_S1_E2": "https://youtu.be/WHlEO1Bphu0",
    "Agatha All Along_S1_E3": "https://youtu.be/y9Lrp5OszAk?si=8vuxgc7seLz-AdLO",
    "Agatha All Along_S1_E4": "https://youtu.be/BI5cJTAOINk?si=EP4eI_vYTkAZAEdd",
    "Agatha All Along_S1_E5": "https://youtu.be/Be2p7dgwbZ4",
    "Agatha All Along_S1_E6": "https://youtu.be/GjAAu60TZkU",
    "Agatha All Along_S1_E7": "https://youtu.be/jrAdKq8cm3A",
    "Agatha All Along_S1_E8": "https://youtu.be/SMkMbOhGipM",
    "Agatha All Along_S1_E9": "https://youtu.be/SMkMbOhGipM",
    "WandaVision_S1_E1": "https://www.youtube.com/watch?v=NgtLRWoH6Wo",
    "WandaVision_S1_E2": "https://www.youtube.com/watch?v=52ICM2NTtHo",
    "WandaVision_S1_E3": "https://www.youtube.com/watch?v=65EmPiJeR08",
    "WandaVision_S1_E4": "https://www.youtube.com/watch?v=0dEcPF4Kocw",
    "WandaVision_S1_E5": "https://www.youtube.com/watch?v=ti6hFaPfYY4",
    "WandaVision_S1_E6": "https://www.youtube.com/watch?v=lhkFW2dO_wM",
    "WandaVision_S1_E7": "https://www.youtube.com/watch?v=7_qsV3wUKiU",
    "WandaVision_S1_E8": "https://www.youtube.com/watch?v=vy6z5Q-PuAk",
    "WandaVision_S1_E9": "https://www.youtube.com/watch?v=4ytycEmT1uw",
    "Loki_S1_E1": "https://www.youtube.com/watch?v=UVvZwSm-ne0",
    "Loki_S1_E2": "https://www.youtube.com/watch?v=t-yVLjhKcrs",
    "Loki_S1_E3": "https://www.youtube.com/watch?v=qnyxz3T4DOc",
    "Loki_S1_E4": "https://www.youtube.com/watch?v=eZZYzTkx1a8",
    "Loki_S1_E5": "https://www.youtube.com/watch?v=cB04Re6_Fp4",
    "Loki_S1_E6": "https://www.youtube.com/watch?v=ZEdMI48kP8A",
    "Loki_S2_E1": "https://www.youtube.com/watch?v=VfrCFeyydzg",
    "Loki_S2_E2": "https://www.youtube.com/watch?v=mysJb-ZbQzA",
    "Loki_S2_E3": "https://www.youtube.com/watch?v=1E_prIdsqGg",
    "Loki_S2_E4": "https://www.youtube.com/watch?v=vA2B7Pp4O4Y",
    "Loki_S2_E5": "https://www.youtube.com/watch?v=zMIbGyDik24",
    "Loki_S2_E6": "https://www.youtube.com/watch?v=yLa7j3MMLhA",
    "Moon Knight_S1_E1": "https://www.youtube.com/watch?v=oVw24yvdRYU",
    "Moon Knight_S1_E2": "https://www.youtube.com/watch?v=Tykl0uiJ5yo",
    "Moon Knight_S1_E3": "https://www.youtube.com/watch?v=PoJLm1lHeBA",
    "Moon Knight_S1_E4": "https://www.youtube.com/watch?v=CdWxALuAosg",
    "Moon Knight_S1_E5": "https://www.youtube.com/watch?v=C2Q4We-87kM",
    "Moon Knight_S1_E6": "https://www.youtube.com/watch?v=ovttoyrgLOg",
    "Secret Invasion_S1_E1": "https://www.youtube.com/watch?v=HmJHEKbDKAY",
    "Secret Invasion_S1_E2": "https://www.youtube.com/watch?v=QjPpPBgTRcE",
    "Secret Invasion_S1_E3": "https://www.youtube.com/watch?v=za-ypCn3Uts",
    "Secret Invasion_S1_E4": "https://www.youtube.com/watch?v=_zua9qISV98",
    "Secret Invasion_S1_E5": "https://www.youtube.com/watch?v=YUG7enQ92Kc",
    "Secret Invasion_S1_E6": "https://www.youtube.com/watch?v=P3ZBt7QByos",
    "She-Hulk: Attorney at Law_S1_E1": "https://www.youtube.com/watch?v=j6JgA9_mEkQ",
    "She-Hulk: Attorney at Law_S1_E2": "https://www.youtube.com/watch?v=BPSpc95L9ys",
    "She-Hulk: Attorney at Law_S1_E3": "https://www.youtube.com/watch?v=deBozTpDr8M",
    "She-Hulk: Attorney at Law_S1_E4": "https://www.youtube.com/watch?v=vVMA63xCqGU",
    "She-Hulk: Attorney at Law_S1_E5": "https://www.youtube.com/watch?v=kQmDGyGKI48",
    "She-Hulk: Attorney at Law_S1_E6": "https://www.youtube.com/watch?v=Oznxob56dQs",
    "She-Hulk: Attorney at Law_S1_E7": "https://www.youtube.com/watch?v=PLm5fHZW-Dw",
    "She-Hulk: Attorney at Law_S1_E8": "https://www.youtube.com/watch?v=bwkkVXcyud0",
    "She-Hulk: Attorney at Law_S1_E9": "https://www.youtube.com/watch?v=K3u5W-4-YLA",
    "The Falcon and the Winter Soldier_S1_E1": "https://www.youtube.com/watch?v=5y24Mi9KZ2s",
    "The Falcon and the Winter Soldier_S1_E2": "https://www.youtube.com/watch?v=HOw_7pMbj9g",
    "The Falcon and the Winter Soldier_S1_E3": "https://www.youtube.com/watch?v=xHXhbw_EGL8",
    "The Falcon and the Winter Soldier_S1_E4": "https://www.youtube.com/watch?v=BCby7JoBRgw",
    "The Falcon and the Winter Soldier_S1_E5": "https://www.youtube.com/watch?v=Z6ARehoi_D8",
    "The Falcon and the Winter Soldier_S1_E6": "https://www.youtube.com/watch?v=z0bNL8SqzTg",
    "Hawkeye_S1_E1": "https://www.youtube.com/watch?v=kZfFJDmsVo8",
    "Hawkeye_S1_E2": "https://www.youtube.com/watch?v=_2pKf-94UVU",
    "Hawkeye_S1_E3": "https://www.youtube.com/watch?v=IC1pEvBp0V4",
    "Hawkeye_S1_E4": "https://www.youtube.com/watch?v=UcMw9CyyU9E",
    "Hawkeye_S1_E5": "https://www.youtube.com/watch?v=bAR-FD831xY",
    "Hawkeye_S1_E6": "https://www.youtube.com/watch?v=kJ0HvLZ6Ivo",
    "Ms Marvel_S1_E1": "https://www.youtube.com/watch?v=O8bZQjt0GUM",
    "Ms Marvel_S1_E2": "https://www.youtube.com/watch?v=VhpbKt0BFrw",
    "Ms Marvel_S1_E3": "https://www.youtube.com/watch?v=hxaQJWUFD2E",
    "Ms Marvel_S1_E4": "https://www.youtube.com/watch?v=paMgBWj_N1c",
    "Ms Marvel_S1_E5": "https://www.youtube.com/watch?v=bi90PY3ipcU",
    "Ms Marvel_S1_E6": "https://www.youtube.com/watch?v=grwyCsvgCXg"
};

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
    
    // Add YouTube link logic
    const epKey = `${card['Series']}_S${card['Season']}_E${card['Episode']}`;
    if (EPISODE_URLS[epKey]) {
        ctxSeasonEp.href = EPISODE_URLS[epKey];
        ctxSeasonEp.style.textDecoration = 'underline';
        ctxSeasonEp.style.textUnderlineOffset = '4px';
        ctxSeasonEp.style.cursor = 'pointer';
    } else {
        ctxSeasonEp.removeAttribute('href');
        ctxSeasonEp.style.textDecoration = 'none';
        ctxSeasonEp.style.cursor = 'default';
    }

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
    }, 7000);
}
