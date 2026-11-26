
export class ContainerBlock {
    static create(block = {}, { mode = 'editor' } = {}) {
        const isEditor = mode === 'editor';
        const settings = block.settings || {};

        // コンテナ本体
        const wrapper = document.createElement('div');

        wrapper.className = isEditor
            ? 'block container-block'
            : 'preview-block container-block';

        wrapper.dataset.type = 'container';

        // 配置方向（横・縦）
        const direction =
            settings.direction === 'row' ? 'row' : 'column';

        // ブロック間隔
        const gapValue = Number(settings.gap);
        const gap = Number.isFinite(gapValue) &&
            gapValue >= 0 && gapValue <= 200
                ? gapValue
                : 16;

        wrapper.dataset.direction = direction;
        wrapper.dataset.gap = String(gap);

        // 子ブロックの配置領域
        const content = document.createElement('div');

        content.className = 'container-content';

        content.style.display = 'flex';
        content.style.flexDirection = direction;
        content.style.gap = `${gap}px`;
        content.style.width = '100%';
        content.style.minHeight = '64px';
        content.style.boxSizing = 'border-box';

        // 編集画面だけコンテナの境界を表示
        if (isEditor) {
            content.style.outline = '1px dashed #94a3b8';
            content.style.outlineOffset = '-1px';
        }

        wrapper.appendChild(content);

        return wrapper;
    }
}
