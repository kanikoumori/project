export class ImageBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block p-2 rounded';

        // 画像初期値
        block.dataset.type = 'image';
        block.dataset.imageWidth = '100';
        block.dataset.src = '';

        const placeholder = document.createElement('div');

        placeholder.className = 'editor-image-placeholder';
        placeholder.textContent = '画像を選択してください';

        block.appendChild(placeholder);
        
        return block;
    }
}