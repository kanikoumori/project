
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


        // 親ごとの表示順序を維持する
        const orderedBlocks = [...blocks].sort((a, b) => {
            const orderA = Number(a.sort_order ?? 0);
            const orderB = Number(b.sort_order ?? 0);
            return orderA - orderB;
        });

        const elementsById = new Map();
        const rendered = [];

        // 第1段階：すべてのブロックを生成する
        for (const block of orderedBlocks) {
            const element = BlockRenderer.create(block, {
                mode: 'preview'
            });

            // 従来どおり、未対応のブロックは表示しない
            if (!element) continue;

            const id = Number(block.id);

            if (
                !Number.isSafeInteger(id) ||
                id <= 0 ||
                elementsById.has(id)
            ) {
                throw new Error('ブロックIDが不正です');
            }

            elementsById.set(id, element);
            rendered.push({ block, element });
        }

        // 第2段階：親コンテナの内部へ配置する
        for (const { block, element } of rendered) {
            const parentId = block.parent_id;

            // 親がない場合はページ直下に配置
            if (parentId === null || parentId === undefined) {
                canvas.appendChild(element);
                continue;
            }

            const parent = elementsById.get(Number(parentId));

            if (!parent || parent.dataset.type !== 'container') {
                throw new Error('親コンテナが見つかりません');
            }

            const content = Array.from(parent.children).find(
                child => child.classList.contains('container-content')
            );

            if (!content) {
                throw new Error('コンテナの配置領域が見つかりません');
            }

            content.appendChild(element);
        }


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