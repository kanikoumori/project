
import Sortable from 'sortablejs';

export class DragDrop {
    constructor(historyManager, editor) {
        this.historyManager = historyManager;
        this.editor = editor;

        // ページ直下のSortable
        this.sortable = null;

        // コンテナ内部のSortable
        this.containerSortables = new Map();

        this.disabled = false;
    }

    // ページ直下とコンテナ内で共通の設定
    createSortable(target) {
        return Sortable.create(target, {
            group: 'saiton-blocks',

            animation: 150,

            draggable: '.block',
            handle: '.drag-handle',

            fallbackOnBody: false,

            ghostClass: 'sortable-ghost',
            chosenClass: 'sortable-chosen',
            dragClass: 'sortable-drag',

            disabled: this.disabled,

            // コンテナを自分自身や子孫の中へ移動させない
            onMove: (event) => {
                if (event.dragged.contains(event.to)) {
                    return false;
                }

                return true;
            },

            onEnd: (event) => {
                // 配置が変わっていない場合は履歴を追加しない
                if (
                    event.from === event.to &&
                    event.oldIndex === event.newIndex
                ) {
                    return;
                }

                this.historyManager.save();
                this.editor.markDirty();
            }
        });
    }

    initialize() {
        const canvas = document.getElementById('canvas');

        if (!canvas) return;

        // 既存のページ直下の並べ替え
        this.sortable = this.createSortable(canvas);
    }

    // 現在存在するコンテナ内にSortableを設定
    refreshContainers() {
        const canvas = document.getElementById('canvas');

        if (!canvas) return;

        const contents = new Set(
            canvas.querySelectorAll('.container-content')
        );

        // 削除済みコンテナのSortableを破棄
        for (const [content, sortable] of this.containerSortables) {
            if (!contents.has(content)) {
                sortable.destroy();
                this.containerSortables.delete(content);
            }
        }

        // 新しいコンテナにSortableを登録
        for (const content of contents) {
            if (this.containerSortables.has(content)) {
                continue;
            }

            const sortable = this.createSortable(content);

            this.containerSortables.set(content, sortable);
        }
    }

    // ドラッグ操作の有効・無効を切り替える
    setDisabled(disabled) {
        this.disabled = disabled;

        if (this.sortable) {
            this.sortable.option('disabled', disabled);
        }

        for (const sortable of this.containerSortables.values()) {
            sortable.option('disabled', disabled);
        }
    }
}
