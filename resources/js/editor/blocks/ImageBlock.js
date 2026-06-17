export class ImageBlock{
    static create(){
        const block = document.createElement('div');

        block.className = 'block p-4 rounded mb-4';

        // 画像初期値
        block.dataset.type = 'image';
        block.dataset.imageWidth = '100';
        block.dataset.src = '';

        block.innerHTML = `
            <div class="editor-image-placeholder">
                画像を選択してください
            </div>
        `;
        
        return block;
    }
}