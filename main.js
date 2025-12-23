import './style.css';
import { Terminal } from './terminal.js';
import { MatrixTree } from './tree.js';
import { Snow } from './snow.js';
import { incrementGlobalInstalls, getGlobalInstalls } from './api.js';

const terminalPhase = () => {
    getGlobalInstalls().then(count => {
        document.getElementById('install-count').textContent = count.toLocaleString();
    });

    const term = new Terminal('typewriter', 'logs', () => {
        // Transition to Tree Phase
        const overlay = document.getElementById('terminal');
        overlay.classList.add('fade-out');
        
        // Trigger global install increment in background
        incrementGlobalInstalls().then(count => {
            document.getElementById('install-count').textContent = count.toLocaleString();
        });

        setTimeout(() => {
            startScene();
        }, 1000); // Wait for fade out
    });
    term.start();
};

const startScene = () => {
    const tree = new MatrixTree('tree-canvas');
    tree.animate();

    const snow = new Snow('snow-canvas');
    snow.animate();

    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const resetBtn = document.getElementById('reset-btn');
    const shareBtn = document.getElementById('share-btn');
    const footer = document.getElementById('footer');
    const stats = document.getElementById('stats');
    
    // Show UI text
    setTimeout(() => {
        title.classList.remove('hidden');
        void title.offsetWidth; 
        title.classList.add('visible');

        subtitle.classList.remove('hidden');
        void subtitle.offsetWidth;
        subtitle.classList.add('visible');
    }, 500);

    setTimeout(() => {
        stats.classList.remove('hidden');
        void stats.offsetWidth;
        stats.classList.add('visible');
        
        resetBtn.classList.remove('hidden');
        shareBtn.classList.remove('hidden');
        footer.classList.remove('hidden');
        
        void resetBtn.offsetWidth;
        
        resetBtn.classList.add('visible');
        shareBtn.classList.add('visible');
        footer.classList.add('visible');
    }, 2000);
};

// Share handler
document.getElementById('share-btn').addEventListener('click', async () => {
    const shareData = {
        title: 'npm install christmas-tree',
        text: 'Installs the most advanced Christmas tree directly to your browser. #coding #christmas #javascript',
        url: window.location.href
    };

    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (err) {
            console.log('Share canceled');
        }
    } else {
        // Fallback
        navigator.clipboard.writeText(window.location.href);
        const originalText = document.getElementById('share-btn').textContent;
        document.getElementById('share-btn').textContent = "Copied!";
        setTimeout(() => {
             document.getElementById('share-btn').textContent = originalText;
        }, 2000);
    }
});

// Reset handler
document.getElementById('reset-btn').addEventListener('click', () => {
    location.reload();
});

// Start the app
terminalPhase();
