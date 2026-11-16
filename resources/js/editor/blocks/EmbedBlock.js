export class EmbedBlock {

    static create() {

        const block = document.createElement('div');

        block.className = 'block editor-embed';
        block.dataset.type = 'embed';

        block.dataset.embedType = 'youtube';
        block.dataset.embedUrl = '';
        block.dataset.embedWidth = '100';
        block.dataset.embedHeight = '400';

        const container = document.createElement('div');
        container.className = 'editor-embed-container';

        container.style.width = '100%';
        container.style.height = '400px';
        container.style.backgroundColor = '#f3f4f6';
        container.style.border = '1px dashed #9ca3af';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.justifyContent = 'center';

        container.textContent = '埋め込みURLを設定してください';

        block.appendChild(container);

        return block;
    }

    // YouTubeのURLを埋め込み用URLに変換
    static getYouTubeEmbedUrl(value) {
        try {
            const url = new URL(value);
            const hostname = url.hostname.toLowerCase();

            let videoId = '';

            if (hostname === 'youtu.be') {
                videoId = url.pathname.split('/')[1] || '';
            } else if (
                hostname === 'youtube.com' ||
                hostname === 'www.youtube.com' ||
                hostname === 'm.youtube.com'
            ) {
                if (url.pathname === '/watch') {
                    videoId = url.searchParams.get('v') || '';
                } else {
                    const parts = url.pathname.split('/');
                    if (['shorts', 'embed', 'live'].includes(parts[1])) {
                        videoId = parts[2] || '';
                    }
                }
            }

            if (!['http:', 'https:'].includes(url.protocol)) {
                return null;
            }

            if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
                return null;
            }

            return `https://www.youtube-nocookie.com/embed/${videoId}`;

        } catch {
            return null;
        }
    }
    // Googleマップの埋め込みURLを確認
    static getGoogleMapsEmbedUrl(value) {
        try {
            let input = value.trim();

        // iframeのHTMLが貼り付けられた場合はsrcを取り出す
        if (input.startsWith('<iframe')) {
            const doc = new DOMParser().parseFromString(input, 'text/html');
            const iframe = doc.querySelector('iframe');

            if (!iframe) return null;

            input = iframe.getAttribute('src') || '';
        }

        const url = new URL(input);

            if (url.protocol !== 'https:') {
                return null;
            }

            const hostname = url.hostname.toLowerCase();

            if (
                hostname !== 'www.google.com' &&
                hostname !== 'google.com'
            ) {
                return null;
            }

            // Googleマップの正式な埋め込みURLのみ許可
            if (
                url.pathname !== '/maps/embed' &&
                url.pathname !== '/maps/embed/v1/place' &&
                url.pathname !== '/maps/embed/v1/view' &&
                url.pathname !== '/maps/embed/v1/directions' &&
                url.pathname !== '/maps/embed/v1/search' &&
                url.pathname !== '/maps/embed/v1/streetview'
            ) {
                return null;
            }

            return url.href;

        } catch {
            return null;
        }
    }
    // Instagramの投稿URLを埋め込み用URLに変換
    static getInstagramEmbedUrl(value) {
        try {
            const url = new URL(value.trim());

            if (!['https:', 'http:'].includes(url.protocol)) {
                return null;
            }

            const hostname = url.hostname.toLowerCase();

            if (
                hostname !== 'www.instagram.com' &&
                hostname !== 'instagram.com'
            ) {
                return null;
            }

            const parts = url.pathname.split('/').filter(Boolean);

            // 投稿・リールのURLのみ許可
            if (
                parts.length !== 2 ||
                !['p', 'reel', 'tv'].includes(parts[0]) ||
                !/^[a-zA-Z0-9_-]+$/.test(parts[1])
            ) {
                return null;
            }

            return `https://www.instagram.com/${parts[0]}/${parts[1]}/embed/`;

        } catch {
            return null;
        }
    }

    // X（旧Twitter）の投稿URLを確認
    static getXPostUrl(value) {
        try {
            const url = new URL(value.trim());

            if (!['https:', 'http:'].includes(url.protocol)) {
                return null;
            }

            const hostname = url.hostname.toLowerCase();

            const allowedHosts = [
                'x.com',
                'www.x.com',
                'twitter.com',
                'www.twitter.com',
                'mobile.twitter.com'
            ];

            if (!allowedHosts.includes(hostname)) {
                return null;
            }

            const parts = url.pathname.split('/').filter(Boolean);

            // ユーザー名/status/投稿ID の形式を確認
            if (
                parts.length < 3 ||
                parts[1] !== 'status' ||
                !/^[a-zA-Z0-9_]{1,15}$/.test(parts[0]) ||
                !/^\d+$/.test(parts[2])
            ) {
                return null;
            }

            // 投稿URLを安全な形式に統一
            return `https://x.com/${parts[0]}/status/${parts[2]}`;

        } catch {
            return null;
        }
    }

    // 埋め込み表示を更新
    static updatePreview(block) {

        const container = block.querySelector('.editor-embed-container');
        if (!container) return;

        const type = block.dataset.embedType;
        const url = block.dataset.embedUrl || '';

        container.replaceChildren();

        container.style.overflow = '';

        if (!url) {
            container.textContent = '埋め込みURLを設定してください';
            return;
        }

        if (type === 'youtube') {

            const embedUrl = this.getYouTubeEmbedUrl(url);

            if (!embedUrl) {
                container.textContent = '有効なYouTubeのURLを入力してください';
                return;
            }

            const iframe = document.createElement('iframe');

            iframe.src = embedUrl;
            iframe.title = 'YouTube動画';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';

            iframe.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';

            iframe.allowFullscreen = true;
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';

            container.appendChild(iframe);

        } else if (type === 'maps') {

            const embedUrl = this.getGoogleMapsEmbedUrl(url);

            if (!embedUrl) {
                container.textContent =
                    '有効なGoogleマップの埋め込みURLを入力してください';
                return;
            }

            const iframe = document.createElement('iframe');

            iframe.src = embedUrl;
            iframe.title = 'Googleマップ';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';

            iframe.loading = 'lazy';
            iframe.referrerPolicy = 'no-referrer-when-downgrade';
            iframe.allowFullscreen = true;

                        container.appendChild(iframe);

        } else if (type === 'instagram') {

            const embedUrl = this.getInstagramEmbedUrl(url);

            if (!embedUrl) {
                container.textContent =
                    '有効なInstagramの投稿URLを入力してください';
                return;
            }

            const iframe = document.createElement('iframe');

            iframe.src = embedUrl;
            iframe.title = 'Instagramの投稿';
            iframe.style.width = '100%';
            iframe.style.height = '100%';
            iframe.style.border = 'none';

            iframe.loading = 'lazy';
            iframe.referrerPolicy = 'strict-origin-when-cross-origin';

                        container.appendChild(iframe);

        } else if (type === 'x') {

            const postUrl = this.getXPostUrl(url);

            if (!postUrl) {
                container.textContent =
                    '有効なXの投稿URLを入力してください';
                return;
            }

            const link = document.createElement('a');
            link.href = postUrl;
            link.textContent = 'Xの投稿を表示';
            link.target = '_blank';
            link.rel = 'noopener noreferrer';

            const quote = document.createElement('blockquote');
            quote.className = 'twitter-tweet';
            quote.appendChild(link);

            container.appendChild(quote);

            // Xの投稿が設定した高さを超えた場合はスクロール
            container.style.overflowY = 'auto';
            container.style.overflowX = 'hidden';

            // X公式の埋め込みスクリプトを読み込む
            const renderTweet = () => {
                if (!container.contains(quote)) return;

                if (window.twttr?.widgets?.load) {
                    window.twttr.widgets.load(container);
                }
            };

            if (window.twttr?.widgets?.load) {
                renderTweet();
            } else {
                let script = document.querySelector(
                    'script[src="https://platform.x.com/widgets.js"]'
                );

                if (!script) {
                    script = document.createElement('script');
                    script.src = 'https://platform.x.com/widgets.js';
                    script.async = true;
                }

                script.addEventListener('load', () => {
                    if (window.twttr?.widgets?.load) {
                        renderTweet();
                    }
                }, {
                    once: true
                });
                script.addEventListener('error', () => {
                    if (!container.contains(quote)) return;

                    // 読み込みに失敗した場合は投稿リンクを残す
                    link.textContent =
                        'Xの投稿を開く（埋め込みを読み込めませんでした）';
                }, {
                    once: true
                });

                // 新規スクリプトの場合はイベント登録後に読み込む
                if (!script.isConnected) {
                    document.head.appendChild(script);
                }

                // スクリプトがすでに読み込まれている場合にも対応
                if (window.twttr?.widgets?.load) {
                    renderTweet();
                }
                                script.addEventListener('error', () => {
                    if (!container.contains(quote)) return;

                    // 読み込みに失敗した場合は投稿リンクを残す
                    link.textContent = 'Xの投稿を開く（埋め込みを読み込めませんでした）';
                }, {
                    once: true
                });
            }

        } else {
            container.textContent = 'この埋め込み形式は今後対応予定です';
        }
    }
}