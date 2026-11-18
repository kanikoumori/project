export class ContainerBlock {

    static create() {

        const block = document.createElement('div');

        block.className = 'block container-block';

        block.dataset.type = 'container';

        // 配置設定の初期値
        block.dataset.direction = 'column';
        block.dataset.justifyContent = 'flex-start';
        block.dataset.alignItems = 'stretch';
        block.dataset.gap = '16';
        block.dataset.wrap = 'nowrap';

        // 子要素を格納する領域
        const content = document.createElement('div');

        content.className = 'container-content';

        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.justifyContent = 'flex-start';
        content.style.alignItems = 'stretch';
        content.style.gap = '16px';
        content.style.flexWrap = 'nowrap';

        block.appendChild(content);

        return block;
    }
}