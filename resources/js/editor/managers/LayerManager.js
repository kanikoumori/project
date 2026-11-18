export class LayerManager {

    constructor(editor) {
        this.editor = editor;
        this.canvas = document.getElementById('canvas');
        this.layersMenu = document.getElementById('layers-menu');
        // 閉じているコンテナを管理
        this.collapsedContainers = new WeakSet();

        // ブロックの種類と表示名
        this.layerNames = {
            heading: '見出し',
            text: 'テキスト',
            list: 'リスト',
            button: 'ボタン',
            image: '画像',
            form: '入力欄',
            divider: '水平線',
            table: 'テーブル',
            embed: '埋め込み',
            container: 'コンテナ'
        };
    }

    initialize() {

        if (!this.canvas || !this.layersMenu) return;

        // レイヤー一覧を初期表示
        this.refresh();

        // ブロックの追加・削除・選択状態を監視
        this.observer = new MutationObserver(() => {
            this.refresh();
        });

        this.observer.observe(this.canvas, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class']
        });
    }

    // レイヤー一覧を更新
    refresh() {

        if (!this.layersMenu) return;

        this.layersMenu.replaceChildren();

        // キャンバス直下のブロックを取得
        const blocks = Array.from(this.canvas.children)
            .filter(element =>
                element.classList.contains('block')
            );

        // ブロックが存在しない場合
        if (blocks.length === 0) {

            const empty = document.createElement('p');

            empty.className = 'layers-empty';
            empty.textContent = '要素がありません';

            this.layersMenu.appendChild(empty);

            return;
        }

        // レイヤーを生成
        blocks.forEach(block => {

            const layer = this.createLayer(block);

            this.layersMenu.appendChild(layer);
        });
    }

    // レイヤーを作成
    createLayer(block, depth = 0) {

        const wrapper = document.createElement('div');
        wrapper.className = 'layer-wrapper';

        const type = block.dataset.type;
        const isContainer = type === 'container';

        // 直接の子ブロックを取得
        const children = Array.from(
            block.querySelectorAll('.block')
        ).filter(child =>
            child.parentElement?.closest('.block') === block
        );

        // 開閉状態を取得
        const isCollapsed =
            this.collapsedContainers.has(block);

        // レイヤーの横並び部分
        const layerRow = document.createElement('div');
        layerRow.className = 'layer-row';
        layerRow.style.paddingLeft = `${depth * 16}px`;

        // コンテナの開閉ボタン
        if (isContainer) {

            const toggle = document.createElement('button');

            toggle.type = 'button';
            toggle.className = 'layer-toggle';
            toggle.textContent = isCollapsed ? '▶' : '▼';

            toggle.setAttribute(
                'aria-expanded',
                String(!isCollapsed)
            );

            toggle.setAttribute(
                'aria-label',
                isCollapsed ? 'コンテナを開く' : 'コンテナを閉じる'
            );

            toggle.addEventListener('click', event => {

                event.stopPropagation();

                if (this.collapsedContainers.has(block)) {
                    this.collapsedContainers.delete(block);
                } else {
                    this.collapsedContainers.add(block);
                }

                this.refresh();
            });

            layerRow.appendChild(toggle);

        } else {

            // 矢印がない要素の位置を揃える
            const spacer = document.createElement('span');
            spacer.className = 'layer-toggle-spacer';

            layerRow.appendChild(spacer);
        }

        // ブロック選択ボタン
        const row = document.createElement('button');

        row.type = 'button';
        row.className = 'layer-item';

        const name = document.createElement('span');

        name.textContent =
            block.dataset.layerName ||
            this.layerNames[type] ||
            '要素';

        row.appendChild(name);

        // コンテナ内部の要素数
        if (isContainer) {

            const count = document.createElement('span');

            count.className = 'layer-count';
            count.textContent = `${children.length}`;

            row.appendChild(count);
        }

        // 選択状態を反映
        if (block.classList.contains('selected')) {
            row.classList.add('selected');
        }

        // レイヤーからブロックを選択
        row.addEventListener('click', () => {

            this.editor.selectionManager.select(block);

            this.editor.propertyManager.show(block);

            block.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'nearest'
            });
        });

        layerRow.appendChild(row);
        wrapper.appendChild(layerRow);

        // 開いている場合だけ子ブロックを表示
        if (!isCollapsed) {

            children.forEach(child => {

                wrapper.appendChild(
                    this.createLayer(child, depth + 1)
                );
            });
        }

        return wrapper;
    }
}