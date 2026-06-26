import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import './dashboard/site-modal.js';

import { Editor } from './editor/editor.js';

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('editor-app')) {
        const editor = new Editor();
        editor.initialize();
    }
});