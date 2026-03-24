// ✨ GitHub Pages Magic Quest - Interactive Script ✨

// Section Navigation
function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // Highlight active button
    event.target.classList.add('active');

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle Hints
function toggleHint(hintId) {
    const hint = document.getElementById(hintId);
    if (hint) {
        hint.classList.toggle('hidden');
    }
}

// Set Difficulty
function setDifficulty(level) {
    const message = {
        easy: "Great choice! You've selected Easy mode. Take your time and enjoy the journey! 🌱",
        medium: "Excellent! Medium mode selected. You're up for a challenge! 🌿",
        hard: "Amazing! You've chosen Hard mode. Show us what you're made of! 🌳"
    };

    const btn = event.target;
    const buttons = document.querySelectorAll('.difficulty');
    
    // Remove previous selection style
    buttons.forEach(b => b.style.transform = 'scale(1)');
    
    // Highlight selected
    btn.style.transform = 'scale(1.15)';
    btn.style.fontWeight = 'bold';

    // Show encouraging message
    console.log(message[level]);
    
    // Could add a toast notification or modal here
    // For now, we'll just log the selection
}

// Easter Eggs and Fun Interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Mascot Click Animation
    const mascot = document.querySelector('.mascot');
    if (mascot) {
        mascot.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = 'bounce 2s ease-in-out infinite';
            }, 10);
            
            // Create floating hearts
            createFloatingEmoji('💜', this);
        });
    }

    // Keyboard Shortcuts
    document.addEventListener('keydown', function(e) {
        // Press 'q' to start quest
        if (e.key === 'q' || e.key === 'Q') {
            showSection('quest-intro');
        }
        // Press 'b' for basics
        if (e.key === 'b' || e.key === 'B') {
            showSection('basics');
        }
        // Press 's' for setup
        if (e.key === 's' || e.key === 'S') {
            showSection('setup');
        }
        // Press 'p' for practice
        if (e.key === 'p' || e.key === 'P') {
            showSection('practice');
        }
        // Press 'm' for mastery
        if (e.key === 'm' || e.key === 'M') {
            showSection('mastery');
        }
    });

    // Secret Code: Konami Code Easter Egg
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiInput = [];

    document.addEventListener('keydown', function(e) {
        konamiInput.push(e.key);
        konamiInput.splice(-konamiCode.length - 1);

        if (konamiInput.join(',').includes(konamiCode.join(','))) {
            activateKonamiMode();
            konamiInput = [];
        }
    });

    // Smooth scroll spy for navigation
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-btn');

    function updateActiveNav() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const dataSection = link.getAttribute('onclick');
            if (dataSection && dataSection.includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // Animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // Add copy to clipboard functionality for code blocks
    const codeBlocks = document.querySelectorAll('.code-block');
    codeBlocks.forEach(block => {
        block.style.cursor = 'pointer';
        block.title = 'Click to copy';
        
        block.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalBg = this.style.backgroundColor;
                this.style.backgroundColor = 'rgba(40, 167, 69, 0.3)';
                
                // Show feedback
                const originalText = this.textContent;
                this.textContent = '✓ Copied!';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.backgroundColor = originalBg;
                }, 1500);
            });
        });
    });
});

// Create floating emoji effect
function createFloatingEmoji(emoji, element) {
    const floatingEl = document.createElement('div');
    floatingEl.textContent = emoji;
    floatingEl.style.position = 'fixed';
    floatingEl.style.fontSize = '30px';
    floatingEl.style.pointerEvents = 'none';
    floatingEl.style.zIndex = '9999';
    
    const rect = element.getBoundingClientRect();
    floatingEl.style.left = rect.left + 'px';
    floatingEl.style.top = rect.top + 'px';
    
    document.body.appendChild(floatingEl);
    
    // Animate floating
    let top = rect.top;
    let opacity = 1;
    const interval = setInterval(() => {
        top -= 5;
        opacity -= 0.05;
        floatingEl.style.top = top + 'px';
        floatingEl.style.opacity = opacity;
        
        if (opacity <= 0) {
            clearInterval(interval);
            floatingEl.remove();
        }
    }, 30);
}

// Konami Code Easter Egg - Rainbow Mode!
function activateKonamiMode() {
    console.log('🌈 KONAMI CODE ACTIVATED! 🌈');
    
    // Add rainbow animation to the page
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes rainbowText {
            0% { color: #ff0000; }
            16.66% { color: #ff7f00; }
            33.33% { color: #ffff00; }
            50% { color: #00ff00; }
            66.66% { color: #0000ff; }
            83.33% { color: #4b0082; }
            100% { color: #9400d3; }
        }
        
        body {
            animation: rainbowBg 5s linear infinite !important;
        }
        
        @keyframes rainbowBg {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
        
        .mascot {
            animation: bounce 0.5s ease-in-out infinite, spin 2s linear infinite !important;
        }
    `;
    document.head.appendChild(style);

    // Create party effect
    for (let i = 0; i < 50; i++) {
        createFloatingEmoji(
            ['🎉', '✨', '🎊', '🚀', '💜'][Math.floor(Math.random() * 5)],
            document.querySelector('.mascot')
        );
    }

    // Play a sound effect (using Web Audio API)
    playVictorySound();
}

// Simple beep sound for Konami code
function playVictorySound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const notes = [262, 294, 330, 349]; // C, D, E, F (simple melody)
        
        let currentTime = audioContext.currentTime;
        
        notes.forEach((frequency, index) => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = 'sine';
            
            gainNode.gain.setValueAtTime(0.3, currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, currentTime + 0.1);
            
            oscillator.start(currentTime);
            oscillator.stop(currentTime + 0.1);
            
            currentTime += 0.1;
        });
    } catch (e) {
        // Audio not supported, that's ok!
        console.log('Audio playback not available');
    }
}

// Progress tracking (could be extended with localStorage)
let userProgress = {
    currentSection: 'quest-intro',
    difficulty: null,
    completedChallenges: [],
    totalTime: 0
};

// Track user progress
function updateProgress(sectionId, difficulty = null) {
    userProgress.currentSection = sectionId;
    if (difficulty) {
        userProgress.difficulty = difficulty;
    }
}

// Local storage for persistence (optional)
function saveProgress() {
    try {
        localStorage.setItem('githubPagesQuestProgress', JSON.stringify(userProgress));
    } catch (e) {
        // Storage not available, no problem
    }
}

function loadProgress() {
    try {
        const saved = localStorage.getItem('githubPagesQuestProgress');
        if (saved) {
            userProgress = JSON.parse(saved);
        }
    } catch (e) {
        // Storage not available, no problem
    }
}

// Load progress on page load
loadProgress();

// Save progress periodically
setInterval(saveProgress, 5000);

// Save progress before leaving
window.addEventListener('beforeunload', saveProgress);

console.log('%c🧙‍♂️ Welcome to GitHub Pages Magic Quest!', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cTry pressing keyboard shortcuts: Q (Quest), B (Basics), S (Setup), P (Practice), M (Mastery)', 'color: #e83e8c;');
console.log('%cEaster Egg: Try the Konami Code! (↑↑↓↓←→←→BA)', 'color: #ffc107; font-weight: bold;');
