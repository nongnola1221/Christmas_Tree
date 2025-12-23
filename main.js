import './style.css';
import { Terminal } from './terminal.js';
import { MatrixTree } from './tree.js';
import { Snow } from './snow.js';
const terminalPhase = () => {
    const term = new Terminal('typewriter', 'logs', () => {
        // Transition to Tree Phase
        const overlay = document.getElementById('terminal');
        overlay.classList.add('fade-out');
        
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
    const treeMessage = document.getElementById('tree-message');
    // Show UI text
    setTimeout(() => {
        title.classList.remove('hidden');
        void title.offsetWidth; 
        title.classList.add('visible');

        subtitle.classList.remove('hidden');
        void subtitle.offsetWidth;
        subtitle.classList.add('visible');

        treeMessage.classList.remove('hidden');
        void treeMessage.offsetWidth;
        treeMessage.classList.add('visible');
    }, 500);
};

// Start the app
terminalPhase();
