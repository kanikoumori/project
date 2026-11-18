
import Sortable from 'sortablejs';

export class DragDrop {

    constructor(historyManager, editor) {
        this.historyManager = historyManager;
        this.editor = editor;
        this.sortable = null;
    }

    initialize() {

        const canvas =
            document.getElementById('canvas');

        this.sortable = Sortable.create(canvas, {

            animation: 150,

            draggable: '.block',

            handle: '.drag-handle',

            fallbackOnBody: false,

            ghostClass: 'sortable-ghost',

            chosenClass: 'sortable-chosen',

            dragClass: 'sortable-drag',

        onEnd: () => {
            this.historyManager.save();
            this.editor.markDirty();
        }
        });
    }

    // ドラッグ操作の有効・無効を切り替える
    setDisabled(disabled) {
        if (this.sortable) {
            this.sortable.option('disabled', disabled);
        }
    }
}

export class FreeDragDrop {
    constructor(historyManager, editor) {
        this.historyManager = historyManager;
        this.editor = editor;
        this.canvas = null;
    }

    initialize() {
        this.canvas = document.getElementById('canvas');

    // ドラッグ中のX・Y座標表示ラベル
    this.coordinateLabel = document.createElement('div');
    this.coordinateLabel.className = 'drag-coordinate-label';


        if (!this.canvas) return;

        // スマートガイド（縦線・横線）を生成
        this.verticalGuide = document.createElement('div');
        this.verticalGuide.className = 'smart-guide vertical';

        this.horizontalGuide = document.createElement('div');
        this.horizontalGuide.className = 'smart-guide horizontal';


        this.canvas.addEventListener('pointerdown', (event) => {
            const handle = event.target.closest('.drag-handle');
            if (!handle) return;

            const block = handle.closest('.block');
            if (!block || !this.canvas.contains(block)) return;

            // ドラッグ対象の直接の親要素を取得
            const parent = block.parentElement;
            if (!parent) return;

            if (event.button !== 0) return;

            event.preventDefault();

            const parentRect = parent.getBoundingClientRect();
            const blockRect = block.getBoundingClientRect();

            const startX = event.clientX;
            const startY = event.clientY;

            const offsetX = startX - blockRect.left;
            const offsetY = startY - blockRect.top;

            let moved = false;

            const onMove = (moveEvent) => {
                if (moveEvent.pointerId !== event.pointerId) return;

                const deltaX = moveEvent.clientX - startX;
                const deltaY = moveEvent.clientY - startY;

                if (!moved && Math.hypot(deltaX, deltaY) < 5) {
                    return;
                }

                if (!moved) {
                    moved = true;

                    // コンテナ内部の自由配置に必要な高さを維持
                    if (parent !== this.canvas) {
                    const container = parent.closest('.container-block');

                    if (container) {
                        const currentHeight = Math.min(
                            2000,
                            container.offsetHeight
                        );

                        container.style.height = `${currentHeight}px`;
                        container.dataset.blockHeight = String(currentHeight);

                        parent.style.minHeight = '';
                        parent.style.height = '100%';
                    }
                }
                // ブロック読み込み後のキャンバスに補助線を配置
                parent.appendChild(this.verticalGuide);
                parent.appendChild(this.horizontalGuide);

                // 元の配置を維持するための透明な領域
                const placeholder = document.createElement('div');

                placeholder.className = 'drag-placeholder';
                placeholder.style.height = `${blockRect.height}px`;
                placeholder.style.width = `${blockRect.width}px`;
                placeholder.style.boxSizing = 'border-box';
                placeholder.style.flexShrink = '0';

                block.before(placeholder);

                    // 自由配置に変更する前の位置を記録
                    const initialX =
                        blockRect.left - parentRect.left
                        + parent.scrollLeft;

                    const initialY =
                        blockRect.top - parentRect.top
                        + parent.scrollTop;

                    // 横幅はドラッグ開始時の大きさを維持
                    // キャンバス幅に対する割合でブロック幅を設定
                    const parentWidth = parent.clientWidth;

                    if (parentWidth > 0) {
                        const widthPercent = Math.min(
                            100,
                            Math.max(1, blockRect.width / parentWidth * 100)
                        );

                        block.style.width = `${widthPercent}%`;
                        block.dataset.blockWidth = String(widthPercent);
                    }

                    // 高さは既存の設定を維持する
                    // block.style.height は変更しない

                    block.style.left = `${initialX}px`;
                    block.style.top = `${initialY}px`;

                    block.classList.add('free-positioned');
                }
                const x = moveEvent.clientX - parentRect.left
                    - offsetX + parent.scrollLeft;

                const y = moveEvent.clientY - parentRect.top
                    - offsetY + parent.scrollTop;


                // 親要素の内側の幅を取得
                const parentStyle = window.getComputedStyle(parent);

                const paddingLeft =
                    parseFloat(parentStyle.paddingLeft) || 0;

                const paddingRight =
                    parseFloat(parentStyle.paddingRight) || 0;

                const parentWidth = parent.clientWidth;
                const blockWidth = block.offsetWidth;

                // ブロックの右端が親要素からはみ出さないようにする
                const maxX = Math.max(
                    paddingLeft,
                    parentWidth - paddingRight - blockWidth
                );
                const safeX = Math.min(
                    Math.max(paddingLeft, x),
                    maxX
                );


                // 他のブロックとの位置を比較して吸着先を取得
                const snap = this.findSnapPosition(
                    block,
                    safeX,
                    Math.max(0, y)
                );
            const finalX = Math.min(
                Math.max(paddingLeft, snap.snapX),
                maxX
            );

            const maxY = Math.max(
                0,
                parent.clientHeight - block.offsetHeight
            );

            const finalY = parent === this.canvas
                ? Math.max(0, snap.snapY)
                : Math.min(Math.max(0, snap.snapY), maxY);


            block.style.left = `${finalX}px`;
            block.style.top = `${finalY}px`;



        parent.appendChild(this.coordinateLabel);

        // ブロックの左上を基準に座標を表示
        const coordinateX = Math.round(finalX);
        const coordinateY = Math.round(parseFloat(block.style.top));

        this.coordinateLabel.textContent =
            `X: ${coordinateX}px  Y: ${coordinateY}px`;

        // ブロックの右上付近に表示
        this.coordinateLabel.style.left =
            `${finalX + block.offsetWidth + 8}px`;
        this.coordinateLabel.style.top =
            `${finalY}px`;

        this.coordinateLabel.classList.add('visible');


                // 垂直ガイドを表示
                if (snap.guideX !== null) {
                    this.verticalGuide.style.left =
                        `${snap.guideX}px`;

                    this.verticalGuide.classList.add('visible');
                } else {
                    this.verticalGuide.classList.remove('visible');
                }

                // 水平ガイドを表示
                if (snap.guideY !== null) {
                    this.horizontalGuide.style.top =
                        `${snap.guideY}px`;

                    this.horizontalGuide.classList.add('visible');
                } else {
                    this.horizontalGuide.classList.remove('visible');
                }


            };

            const onEnd = (endEvent) => {
                if (endEvent.pointerId !== event.pointerId) return;

                window.removeEventListener('pointermove', onMove);
                window.removeEventListener('pointerup', onEnd);
                window.removeEventListener('pointercancel', onEnd);

                this.coordinateLabel.classList.remove('visible');
                this.verticalGuide.classList.remove('visible');
                this.horizontalGuide.classList.remove('visible');

                // ドラッグ終了時に補助要素を取り除く
                this.coordinateLabel.remove();
                this.verticalGuide.remove();
                this.horizontalGuide.remove();


                if (moved) {
                    // ドラッグ中に確保した透明な領域を削除
                    const placeholder = parent.querySelector(
                        ':scope > .drag-placeholder'
                    );

                    if (placeholder) {
                        placeholder.remove();
                    }

                    // 変更履歴と自動保存に反映
                    this.historyManager.save();
                    this.editor.markDirty();
                }

            };

            window.addEventListener('pointermove', onMove);
            window.addEventListener('pointerup', onEnd);
            window.addEventListener('pointercancel', onEnd);
        });
    }



    findSnapPosition(block, x, y) {
        const threshold = 6;
        const width = block.offsetWidth;
        const height = block.offsetHeight;

        const movingX = [x, x + width / 2, x + width];
        const movingY = [y, y + height / 2, y + height];

        let snapX = x;
        let snapY = y;
        let guideX = null;
        let guideY = null;

        let minDiffX = threshold + 1;
        let minDiffY = threshold + 1;

        const parent = block.parentElement;

        const others = parent.querySelectorAll(':scope > .block');

        const parentRect = parent.getBoundingClientRect();

        others.forEach((other) => {
            if (other === block) return;

            const otherRect = other.getBoundingClientRect();

            const otherX =
                otherRect.left - parentRect.left + parent.scrollLeft;

            const otherY =
                otherRect.top - parentRect.top + parent.scrollTop;

            const targetX = [
                otherX,
                otherX + otherRect.width / 2,
                otherX + otherRect.width
            ];

            const targetY = [
                otherY,
                otherY + otherRect.height / 2,
                otherY + otherRect.height
            ];

            movingX.forEach((value, i) => {
                targetX.forEach((target) => {
                    const diff = Math.abs(value - target);

                    if (diff <= threshold && diff < minDiffX) {
                        minDiffX = diff;
                        snapX = x + target - value;
                        guideX = target;
                    }
                });
            });

            movingY.forEach((value) => {
                targetY.forEach((target) => {
                    const diff = Math.abs(value - target);

                    if (diff <= threshold && diff < minDiffY) {
                        minDiffY = diff;
                        snapY = y + target - value;
                        guideY = target;
                    }
                });
            });
        });

        return { snapX, snapY, guideX, guideY };
    }
    updateCanvasHeight() {
        if (!this.canvas) return;

        const blocks = this.canvas.querySelectorAll(
            ':scope > .block.free-positioned'
        );

        let maxBottom = 0;

        blocks.forEach((block) => {
            const top = parseFloat(block.style.top) || 0;
            const bottom = top + block.offsetHeight;

            maxBottom = Math.max(maxBottom, bottom);
        });

        // 最下部に余裕を持たせる
        const requiredHeight = maxBottom + 32;

        this.canvas.style.minHeight =
            `${Math.max(requiredHeight, window.innerHeight - 140)}px`;
    }
}