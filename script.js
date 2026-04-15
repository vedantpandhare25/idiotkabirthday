const grid = document.getElementById('game-grid');
const scoreDisplay = document.getElementById('score');
const startBtn = document.getElementById('start-btn');

let score = 0;
let gameInterval;
let activeHole = null;
let isPlaying = false;

// Generate 9 burrows (holes) for the mice
for (let i = 0; i < 9; i++) {
    const hole = document.createElement('div');
    hole.classList.add('hole');
    hole.addEventListener('click', () => catchMouse(hole));
    grid.appendChild(hole);
}

const holes = document.querySelectorAll('.hole');

function randomHole() {
    // Clear all holes first
    holes.forEach(hole => hole.textContent = ''); 
    
    // Pick a random hole for the mouse
    const index = Math.floor(Math.random() * holes.length);
    activeHole = holes[index];
    activeHole.textContent = '🐭'; // The mouse appears!
}

function catchMouse(hole) {
    if (!isPlaying) return;
    
    // If the clicked hole has the mouse
    if (hole === activeHole && hole.textContent === '🐭') {
        score++;
        scoreDisplay.textContent = score;
        hole.textContent = '🐾'; // Leave a paw print when caught
        activeHole = null;
    }
}

function startGame() {
    if (isPlaying) return;
    
    // Reset game state
    score = 0;
    scoreDisplay.textContent = score;
    isPlaying = true;
    startBtn.textContent = 'Meow! Catching...';
    startBtn.disabled = true;

    // Mouse pops up every 700 milliseconds
    gameInterval = setInterval(randomHole, 700);

    // End the game after 15 seconds
    setTimeout(() => {
        clearInterval(gameInterval);
        holes.forEach(hole => hole.textContent = '');
        isPlaying = false;
        startBtn.textContent = 'Play Again';
        startBtn.disabled = false;
        activeHole = null;
        
        // Show final score
        alert(`Time's up! You caught ${score} mice! Purr-fect job! 🐾`);
    }, 15000);
}

startBtn.addEventListener('click', startGame);