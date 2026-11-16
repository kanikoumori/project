
import '../css/blocks.css';
import '../css/preview.css';

import { BlockRenderer } from './editor/renderers/BlockRenderer.js';

document.addEventListener('DOMContentLoaded', async () => {
    const canvas = document.getElementById('preview-canvas');

    if (!canvas) return;

    const pageId = canvas.dataset.pageId;

    try {
        const response = await fetch(`/pages/${pageId}/blocks`, {
            headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
            throw new Error('ブロックデータを取得できませんでした。');
        }

        const blocks = await response.json();

        if (blocks.length === 0) {
            const message = document.createElement('p');
            message.textContent = 'このページにはまだブロックがありません。';
            message.style.textAlign = 'center';
            message.style.color = '#6b7280';
            message.style.padding = '40px 16px';

            canvas.appendChild(message);
            return;
        }

        blocks.forEach(block => {
            const element = BlockRenderer.create(block, {
                mode: 'preview'
            });

            if (element) {
                canvas.appendChild(element);
            }
        });

    } catch (error) {
        console.error(error);

        const errorContainer = document.createElement('div');
        errorContainer.className = 'preview-error';
        errorContainer.setAttribute('role', 'alert');

        const title = document.createElement('h2');
        title.textContent = 'プレビューを表示できませんでした';

        const message = document.createElement('p');
        message.textContent =
            'ページの読み込み中に問題が発生しました。時間をおいて再度お試しください。';

        const retryButton = document.createElement('button');
        retryButton.type = 'button';
        retryButton.className = 'preview-retry-button';
        retryButton.textContent = '再読み込み';
        retryButton.addEventListener('click', () => {
            window.location.reload();
        });

        errorContainer.appendChild(title);
        errorContainer.appendChild(message);
        errorContainer.appendChild(retryButton);

        canvas.replaceChildren(errorContainer);
        }
});