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
    "Ms Marvel_S1_E6": "https://www.youtube.com/watch?v=grwyCsvgCXg",
    "Echo_S1_E1": "https://www.youtube.com/watch?v=YRtFBv7Ta8U",
    "Echo_S1_E2": "https://www.youtube.com/watch?v=F3VdPN4PmgA",
    "Echo_S1_E3": "https://www.youtube.com/watch?v=6wtHBPvEyWg",
    "Echo_S1_E4": "https://www.youtube.com/watch?v=YnCyQQYSRKo",
    "Echo_S1_E5": "https://www.youtube.com/watch?v=QGZIEnfoE0I"
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
const vfxOverlay = document.getElementById('vfx-overlay');

const newCardBtn = document.getElementById('new-card-btn');
const revealBtn = document.getElementById('reveal-btn');
const showQBtn = document.getElementById('show-q-btn');
const challengeBtnFront = document.getElementById('challenge-btn-front');
const challengeBtnBack = document.getElementById('challenge-btn-back');

let isTransitioning = false;

const ALL_POWER_CLASSES = [
    'power-wandavision', 'power-agatha', 'power-loki', 'power-shehulk',
    'power-hawkeye', 'power-moonknight', 'power-falcon', 'power-msmarvel',
    'power-secretinvasion', 'power-echo', 'power-arrival'
];

// Map series/serial to signature MCU hero power
function getHeroPower(seriesName, serial) {
    if (!seriesName && !serial) return { type: 'wandavision', class: 'power-wandavision', vfx: 'vfx-chaos-ring' };
    
    const name = (seriesName || '').toLowerCase();
    const ser = (serial || '').toUpperCase();
    
    if (name.includes('wanda') || ser.startsWith('WV')) {
        return { type: 'wandavision', class: 'power-wandavision', vfx: 'vfx-chaos-ring' };
    }
    if (name.includes('agatha') || ser.startsWith('AAA')) {
        return { type: 'agatha', class: 'power-agatha', vfx: 'vfx-coven-aura' };
    }
    if (name.includes('loki') || ser.startsWith('LOKI')) {
        return { type: 'loki', class: 'power-loki', vfx: 'vfx-tva-grid' };
    }
    if (name.includes('hulk') || ser.startsWith('SH')) {
        return { type: 'shehulk', class: 'power-shehulk', vfx: 'vfx-gamma-crack' };
    }
    if (name.includes('hawkeye') || ser.startsWith('HK')) {
        return { type: 'hawkeye', class: 'power-hawkeye', vfx: 'vfx-arrow-streak' };
    }
    if (name.includes('moon') || ser.startsWith('MK')) {
        return { type: 'moonknight', class: 'power-moonknight', vfx: 'vfx-crescent-blade' };
    }
    if (name.includes('falcon') || name.includes('winter') || ser.startsWith('TFATWS')) {
        return { type: 'falcon', class: 'power-falcon', vfx: 'vfx-shield-disc' };
    }
    if (name.includes('ms marvel') || ser.startsWith('MM')) {
        return { type: 'msmarvel', class: 'power-msmarvel', vfx: 'vfx-noor-crystals' };
    }
    if (name.includes('secret') || name.includes('invasion') || ser.startsWith('SI')) {
        return { type: 'secretinvasion', class: 'power-secretinvasion', vfx: 'vfx-skrull-bars' };
    }
    if (name.includes('echo') || ser.startsWith('ECHO')) {
        return { type: 'echo', class: 'power-echo', vfx: 'vfx-echo-rings' };
    }
    
    return { type: 'wandavision', class: 'power-wandavision', vfx: 'vfx-chaos-ring' };
}

// Zero-dependency browser-native Web Audio SFX synthesizer
let audioCtx = null;

function playHeroSfx(heroType) {
    try {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (AudioContext) audioCtx = new AudioContext();
        }
        if (!audioCtx) return;
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        const now = audioCtx.currentTime;
        const masterGain = audioCtx.createGain();
        masterGain.gain.setValueAtTime(0.18, now);
        masterGain.connect(audioCtx.destination);

        switch (heroType) {
            case 'wandavision': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(320, now);
                osc.frequency.exponentialRampToValueAtTime(80, now + 0.42);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.42);
                break;
            }
            case 'agatha': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(440, now + 0.2);
                osc.frequency.exponentialRampToValueAtTime(55, now + 0.45);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.45);
                break;
            }
            case 'shehulk': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(160, now);
                osc.frequency.exponentialRampToValueAtTime(30, now + 0.38);
                gain.gain.setValueAtTime(0.35, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.38);
                break;
            }
            case 'hawkeye': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(800, now);
                osc.frequency.exponentialRampToValueAtTime(120, now + 0.25);
                gain.gain.setValueAtTime(0.22, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.25);
                break;
            }
            case 'loki': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(220, now);
                osc.frequency.linearRampToValueAtTime(660, now + 0.15);
                osc.frequency.exponentialRampToValueAtTime(110, now + 0.4);
                gain.gain.setValueAtTime(0.12, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.4);
                break;
            }
            case 'moonknight': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(700, now);
                osc.frequency.linearRampToValueAtTime(1400, now + 0.1);
                osc.frequency.exponentialRampToValueAtTime(200, now + 0.35);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            }
            case 'falcon': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, now);
                osc.frequency.linearRampToValueAtTime(880, now + 0.08);
                osc.frequency.exponentialRampToValueAtTime(220, now + 0.35);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.35);
                break;
            }
            case 'msmarvel': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now);
                osc.frequency.linearRampToValueAtTime(1046.5, now + 0.18);
                osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.45);
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.45);
                break;
            }
            case 'secretinvasion': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(180, now);
                osc.frequency.setValueAtTime(360, now + 0.1);
                osc.frequency.setValueAtTime(90, now + 0.22);
                osc.frequency.exponentialRampToValueAtTime(40, now + 0.42);
                gain.gain.setValueAtTime(0.18, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.42);
                break;
            }
            case 'echo': {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(140, now);
                osc.frequency.linearRampToValueAtTime(280, now + 0.12);
                osc.frequency.exponentialRampToValueAtTime(45, now + 0.42);
                gain.gain.setValueAtTime(0.28, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
                osc.connect(gain);
                gain.connect(masterGain);
                osc.start(now);
                osc.stop(now + 0.42);
                break;
            }
            default:
                break;
        }
    } catch (e) {
        // AudioContext error fail-safe
    }
}

// Clean URL query parameters so subsequent reloads are always random
function clearUrlQuery() {
    try {
        if (window.location.search || window.location.hash) {
            const cleanUrl = window.location.pathname;
            window.history.replaceState({}, '', cleanUrl);
        }
    } catch (e) {
        // Safe fallback
    }
}

// Display a specific card directly (used when opening a friend's challenge link)
function displayDirectCard(card) {
    currentCard = card;
    flashcard.classList.remove('flipped');
    flashcard.classList.remove(...ALL_POWER_CLASSES);
    if (vfxOverlay) vfxOverlay.innerHTML = '';
    
    flashcardWrapper.classList.remove('fly-in');
    void flashcardWrapper.offsetWidth; // Reflow
    flashcardWrapper.classList.add('fly-in');

    populateCard(currentCard);
    updateSlideshows(currentCard);
}

// Load CSV Data
Papa.parse('easter-eggs.csv', {
    download: true,
    header: true,
    complete: function(results) {
        // Filter out empty rows just in case
        easterEggs = results.data.filter(row => row.Series && row.Question);
        if (easterEggs.length > 0) {
            // Check for direct card link in URL query (?card=SERIAL) or hash (#SERIAL)
            const urlParams = new URLSearchParams(window.location.search);
            const requestedSerial = urlParams.get('card') || (window.location.hash ? window.location.hash.replace(/^#/, '') : null);
            
            let targetCard = null;
            if (requestedSerial) {
                const cleanRequested = requestedSerial.trim().toUpperCase();
                targetCard = easterEggs.find(c => (c.Serial || '').trim().toUpperCase() === cleanRequested);
            }

            if (targetCard) {
                displayDirectCard(targetCard);
            } else {
                loadRandomCard(true);
            }
            flashcardWrapper.classList.remove('hidden');
        }
    }
});

// Initial load (or refresh): Purely random card
function loadRandomCard(isInitial = false) {
    if (easterEggs.length === 0) return;
    
    // Pick random index
    const randomIndex = Math.floor(Math.random() * easterEggs.length);
    currentCard = easterEggs[randomIndex];
    
    // Reset flip state & any active power classes
    flashcard.classList.remove('flipped');
    flashcard.classList.remove(...ALL_POWER_CLASSES);
    if (vfxOverlay) vfxOverlay.innerHTML = '';
    
    // Re-trigger fly-in animation for initial load
    flashcardWrapper.classList.remove('fly-in');
    void flashcardWrapper.offsetWidth; // Trigger reflow
    flashcardWrapper.classList.add('fly-in');

    populateCard(currentCard);
    updateSlideshows(currentCard);
}

// "New Flashcard" button transition: Hero power destruction VFX
function transitionToNextCard() {
    if (isTransitioning || easterEggs.length === 0) return;
    isTransitioning = true;
    newCardBtn.disabled = true;
    clearUrlQuery(); // Reset URL query so any future reload is fully random

    // Pick next card (avoid immediate repeat if more than 1 item)
    let nextIndex = Math.floor(Math.random() * easterEggs.length);
    if (easterEggs.length > 1 && easterEggs[nextIndex] === currentCard) {
        nextIndex = (nextIndex + 1) % easterEggs.length;
    }
    const nextCard = easterEggs[nextIndex];

    // Determine the signature power of the incoming series
    const power = getHeroPower(nextCard.Series, nextCard.Serial);

    // Play synthesized Hero SFX
    playHeroSfx(power.type);

    // Clean up previous power classes and VFX
    flashcard.classList.remove(...ALL_POWER_CLASSES);
    if (vfxOverlay) vfxOverlay.innerHTML = '';

    // Apply hero destruction animation to the current card
    flashcard.classList.add(power.class);

    // Render hero-specific VFX overlay element
    if (vfxOverlay && power.vfx) {
        const vfxEl = document.createElement('div');
        vfxEl.className = power.vfx;
        vfxOverlay.appendChild(vfxEl);
    }

    // Midpoint: Swap card content, reset flip state, and trigger arrival animation
    setTimeout(() => {
        currentCard = nextCard;
        flashcard.classList.remove('flipped');
        flashcard.classList.remove(power.class);
        if (vfxOverlay) vfxOverlay.innerHTML = '';

        populateCard(currentCard);
        updateSlideshows(currentCard);

        // Card Arrival
        flashcard.classList.add('power-arrival');

        setTimeout(() => {
            flashcard.classList.remove('power-arrival');
            isTransitioning = false;
            newCardBtn.disabled = false;
        }, 350);
    }, 420);
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

// Toast Notification Manager
let toastTimeout = null;
function showToast(message) {
    const toast = document.getElementById('marvel-toast');
    if (!toast) return;
    const toastMsg = toast.querySelector('.toast-message');
    if (toastMsg) toastMsg.textContent = message;
    
    toast.classList.remove('hidden');
    toast.classList.remove('toast-hide');
    toast.classList.add('toast-show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('toast-show');
        toast.classList.add('toast-hide');
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 300);
    }, 2800);
}

// Build Share Payload
function getShareSnippet(card) {
    if (!card) return null;
    const cardId = card.Serial || '';
    const shareUrl = `${window.location.origin}${window.location.pathname}?card=${encodeURIComponent(cardId)}`;
    const series = card.Series || 'MCU';
    const seasonEp = card.Season && card.Episode ? ` (S${card.Season}E${card.Episode})` : '';
    const question = card.Question || '';
    
    const bodyText = `🎯 MCU Easter Egg Challenge!\n📺 ${series}${seasonEp}\n\n"${question}"\n\nThink you know the answer? Test your Marvel knowledge here:`;

    return {
        title: `MCU Easter Egg Challenge: ${series}`,
        text: bodyText,
        fullText: `${bodyText}\n👉 ${shareUrl}`,
        url: shareUrl
    };
}

// Handle "Challenge a Friend" click
async function handleChallengeShare(e) {
    if (e) e.stopPropagation();
    if (!currentCard) return;

    const shareData = getShareSnippet(currentCard);
    if (!shareData) return;

    // Use Web Share API on mobile devices if supported
    const isMobile = /mobile|android|iphone|ipad|ipod/i.test(navigator.userAgent.toLowerCase());
    if (isMobile && navigator.share) {
        try {
            await navigator.share({
                text: shareData.fullText
            });
            showToast('⚔️ Challenge Shared!');
            return;
        } catch (err) {
            if (err.name === 'AbortError') return; // User closed share modal
        }
    }

    // Desktop or clipboard copy
    const copyText = shareData.fullText;
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(copyText).then(() => {
            showToast('⚔️ Challenge Copied to Clipboard!');
        }).catch(() => {
            fallbackClipboardCopy(copyText);
        });
    } else {
        fallbackClipboardCopy(copyText);
    }
}

// Fallback clipboard copy for non-HTTPS / older browsers
function fallbackClipboardCopy(text) {
    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.top = '0';
        textarea.style.left = '0';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('⚔️ Challenge Copied to Clipboard!');
    } catch (err) {
        showToast('👉 Challenge link ready in address bar!');
    }
}

// Browser navigation popstate handler
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.serial && easterEggs.length > 0) {
        const card = easterEggs.find(c => c.Serial === e.state.serial);
        if (card) {
            currentCard = card;
            flashcard.classList.remove('flipped');
            flashcard.classList.remove(...ALL_POWER_CLASSES);
            if (vfxOverlay) vfxOverlay.innerHTML = '';
            populateCard(currentCard);
            updateSlideshows(currentCard);
        }
    }
});

// Event Listeners
newCardBtn.addEventListener('click', transitionToNextCard);

revealBtn.addEventListener('click', () => {
    flashcard.classList.add('flipped');
});

showQBtn.addEventListener('click', () => {
    flashcard.classList.remove('flipped');
});

if (challengeBtnFront) challengeBtnFront.addEventListener('click', handleChallengeShare);
if (challengeBtnBack) challengeBtnBack.addEventListener('click', handleChallengeShare);

// Touch swipe to flip card (mobile/tablet)
(function initSwipeToFlip() {
    let touchStartX = 0;
    let touchStartY = 0;
    const SWIPE_THRESHOLD = 50;

    flashcardWrapper.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].clientX;
        touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });

    flashcardWrapper.addEventListener('touchend', function(e) {
        const dx = e.changedTouches[0].clientX - touchStartX;
        const dy = e.changedTouches[0].clientY - touchStartY;

        // Only count horizontal swipes (ignore vertical scrolls)
        if (Math.abs(dx) > SWIPE_THRESHOLD && Math.abs(dx) > Math.abs(dy)) {
            flashcard.classList.toggle('flipped');
        }
    }, { passive: true });
})();

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
    
    // Update Show Posters
    const posterLeft = document.getElementById('poster-left');
    const posterRight = document.getElementById('poster-right');
    const posterSrc = `images/show_posters/${abbrev}.jpeg`;
    const flashcardEl = document.getElementById('flashcard');
    
    if (posterLeft) {
        posterLeft.src = posterSrc;
        posterLeft.onerror = () => { 
            posterLeft.parentElement.classList.add('poster-hidden'); 
            if (flashcardEl) flashcardEl.style.setProperty('--card-poster-bg', 'none');
        };
        posterLeft.onload = () => { 
            posterLeft.parentElement.classList.remove('poster-hidden'); 
            if (flashcardEl) flashcardEl.style.setProperty('--card-poster-bg', `url('${posterSrc}')`);
        };
    }
    if (posterRight) {
        posterRight.src = posterSrc;
        posterRight.onerror = () => { posterRight.parentElement.classList.add('poster-hidden'); };
        posterRight.onload = () => { posterRight.parentElement.classList.remove('poster-hidden'); };
    }

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

// Fetch and update visitor counter
function initVisitorCounter() {
    const counterEl = document.getElementById('visitor-count');
    if (!counterEl) return;

    fetch('https://api.counterapi.dev/v1/mcu-easter-eggs-unofficial-github-io/visits/up')
        .then(response => response.json())
        .then(data => {
            if (data && typeof data.count === 'number') {
                counterEl.textContent = Number(data.count).toLocaleString();
            } else {
                counterEl.textContent = '1,000+';
            }
        })
        .catch(err => {
            console.error('Error fetching visitor count:', err);
            counterEl.textContent = '1,000+';
        });
}

initVisitorCounter();

