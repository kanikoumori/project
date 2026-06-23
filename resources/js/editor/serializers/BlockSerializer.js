export class BlockSerializer {
    serialize() {
        const canvas = document.getElementById('canvas');

        const blocks = canvas.querySelectorAll('.block');
        const blocksData = [];

        blocks.forEach((block, index) => {
            const type = block.dataset.type;

            let data = {
                type,
                sortOrder: index,
                data: {}
            };

            if (type === 'heading') {
                const el = block.querySelector('.editor-heading');
                const content = el?.textContent?.trim();

                data.data = {
                    content: content || '',
                    tag: block.dataset.tag || 'h1',
                    style: {
                        color: block.dataset.color,
                        bold: block.dataset.bold === 'true',
                        italic: block.dataset.italic === 'true',
                        underline: block.dataset.underline === 'true',
                        strike: block.dataset.strike === 'true',
                        align: block.dataset.align || 'left'
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'text') {
                const el = block.querySelector('.editor-text');
                const content = el?.textContent?.trim();

                data.data = {
                    content: content || '',
                    style: {
                        color: block.dataset.color,
                        fontSize: block.dataset.fontSize,
                        bold: block.dataset.bold === 'true',
                        italic: block.dataset.italic === 'true',
                        underline: block.dataset.underline === 'true',
                        strike: block.dataset.strike === 'true',
                        align: block.dataset.align || 'left'
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'list') {
                 const items = [...block.querySelectorAll('li')]
                    .map(li => li.textContent.trim())
                    .filter(text => text);

                data.data = {
                    items,
                    style: {
                        listStyle: block.dataset.listStyle || 'disc'
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'button') {
                const el = block.querySelector('.editor-button');
                const content = el?.textContent?.trim();

                data.data = {
                    label: content || '',
                    url: block.dataset.url || '',
                    style: {
                        buttonColor: block.dataset.buttonColor,
                        buttonTextColor: block.dataset.buttonTextColor,
                        buttonRadius: block.dataset.buttonRadius
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'image') {
                if (!block.dataset.src) {
                    return;
                }

                data.data = {
                    src: block.dataset.src,
                    style: {
                        imageWidth: block.dataset.imageWidth,
                    }
                };

                blocksData.push(data);
                return;
            }

            if (type === 'form') {
                
                data.data = {
                    style: {
                        placeholder:
                            block.dataset.placeholder || '入力してください',

                        inputType:
                        block.dataset.inputType || 'text'
                    }
                };

                blocksData.push(data);
                return;
            }
        });

        return blocksData;
    }
}