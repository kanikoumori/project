import './bootstrap';

import Alpine from 'alpinejs';
import './dashboard/site-modal';

window.Alpine = Alpine;

Alpine.start();

import { Editor } from './editor/editor.js';

document.addEventListener('DOMContentLoaded', () => {

    const editorRoot = document.getElementById('editor-app');

    if (!editorRoot) {
        return;
    }

    const editor = new Editor();
    editor.initialize();
});