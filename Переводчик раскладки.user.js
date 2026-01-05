// ==UserScript==
// @name         Переводчик раскладки ENG ↔ RUS
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  Перевод текста между английской и русской раскладками клавиатуры
// @author
// @match        *://*/*
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAU8SURBVHhe7ZvPb9tkGMe/tuMkTvOjaxFrN3WFDgnaiZTDTmwFunaVmIBurNPgsHGGG+yAxB+AuKBxQdpxGpoqrUwdaBoTdOXHNsFhF1KNDrQOrag/dujWNGkcx7HNoXWI3ziOX9u0TdyP9Ert94mV9/nmfZ/3TfyagQV7ug9opFaPzE7fZkhNxzTQKImTmBlRITRq8jqkCYZ/Gj15nXITSn/4JXkd3QSWDPgNBj789HVmp28zvh8BvjeA8evw1/H9CGBVpUhqvkFViu6nQLC1G01dQwjEO8En9oALJciXeIoipSGnZ1FMP8Tq39+jsDRNvoQKxwYwbBCx5GnEnx8Bw3Jk2JSB9t/BQcEvj/Yhr4YMsTAr4ZW2uyiqHCYXew2xamiqgsy9MaSnzgOqQoZt4agG8M1d2Pn6OSS6T9pOHgB4RkFrOIvBXSkInFTSBU7C4K4UWkNZ8KxquMYKhuUQ73kHO4e+BN/cRYZt4ciASGc/+HgHKdfkp8V9yMgCYryIgfYUwqyEMCthoD2FGC8iIwv4ebGHvKwmwR17EensJ2VbUE+B4FM9eHrwLBiHeyiBk3CoPYU4LyIjhwEAMT6PFVnA5EISomKcGnbRNBWPrr8PefkBGbKEOoumZw47Th4ARCWEyYUkVmQBMT7vSfIAwDAsos+9Sco1oc6E37GXlKjRTUgXIkgXIq6T1wkk6KcltQEBB3PfDFEJ4drcflyb2+9J8gAQiNH3jdoALhglpS1DQGghpZpQG9BoUK8CHe/+QEr49sMwYkLFz4umZEQNb53NkzIA4Kvf3kO0mCVlqGBR4ILIBGJY5hP4+KXPoFX+nAkA+Gf0MClZ4tqAq2fCaI6Yd6YayzkNb3xuNOHir6eQkNMGrRoyyyOgFnH84BgKbNAQozXA9RRoCtElDwCcybtGlBwpVYVXZQDA5VsnwGr2d45mmHTFHbJi3XKShqNVpkA5MsuXmsJwVYd8OQyoBjPgxRT48RMB/PrXAVkB+j8VDXG7jN86XvpkZZbHsYOXyZcAAL65eQycppQMGe4bh1q2MdvwKbDRDPeNk5Ir6s4Ar6kbAxhtbaZeufk2GXKFpzUA63XAimr7gPIagPU6oMNqKlhNNRS5LVsDeM66tUQZXD2z9jXYCl6VS43TFEcV3g6eG2AHrvaKZonCrA25kQOXDJ++E9xdbQK57pMtJ2k4+kXlFCDR9wAamIp28uVRDPeNQ+Lcf4v0tAZsxD6gFpteA+qNbQNIwW94WgPg0T6grmsAue6TrSXKYPSD2vuAjcJzA+zAbsq7muO6Kx9dlCrWequWkzScPlc5BcY6Rkpr/1jHCBn+33BdA7Yam14D6g1qA4riY1JyhMBJOLL7Do7svmO4U+wGJ32jNkB+MkNK1Og3SBPBHBLBHA61G2+XO8VJ3+gNWKZ/k3LIu8MZOYw4L3pigpO+URuwOnMdmvLfDxc06GcB1pIXMDHfi4n5XmRkAfGyMwNOUGURqzPfkXJNqA0oZuewPHWBlG3xatsfpYMQNxaSyKsh5NUQbiwkSwcnXmu7S15mi/TUeRSz86RcE2oDACB77xIKj++Tck1klcWSFMXEvPF2uKiEMDGfxFI+Clmzf+RGp/DkPrJ/XSFlW1DvA3QYNoj4i6cQe+EE1TkhL9FUBSt/fo1M6gI0tUCGbeHYAJ1gazeanh1CILHBx+RWHmL1wSYek2sEVKXorAY0CiwX8LcBcLoKNArbD0z4fQQAPn5maPupsXV8+dyg6YOT8IkJlo/OosFNIJOHmQE6jWSEWeI6/wKWaT73dQ98ZAAAAABJRU5ErkJggg==
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    GM_addStyle(`
        .layout-translator-container {
            position: fixed;
            top: 20px;
            left: 20px;
            width: 800px;
            min-width: 600px;
            max-width: 95vw;
            background: #1e293b;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            z-index: 999999;
            font-family: 'Segoe UI',system-ui,-apple-system,sans-serif;
            color: #e2e8f0;
            resize: horizontal;
            overflow: hidden;
        }
        .layout-translator-header {
            padding: 10px 15px;
            border-bottom: 1px solid #334155;
            text-align: center;
            cursor: move;
            user-select: none;
            background: #0f172a;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 40px;
        }
        .layout-translator-header h1 {
            font-size: 1.2rem;
            font-weight: 600;
            color: #f8fafc;
            margin: 0;
            flex: 1;
            text-align: center;
        }
        .layout-translator-header.minimized-header {
            padding: 10px 15px;
            justify-content: center;
        }
        .layout-translator-header.minimized-header h1 {
            display: none;
        }
        .translator-container {
            display: flex;
            flex-direction: row;
            padding: 0;
            min-height: 350px;
            background-color: #334155;
            overflow: hidden;
        }
        .input-box,.output-box {
            flex: 1;
            padding: 15px;
            display: flex;
            flex-direction: column;
            min-width: 0;
            overflow: hidden;
        }
        .input-box {
            border-right: 2px solid #4a5568;
        }
        .language-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 2px solid;
        }
        .input-box .language-header {
            border-color: #3b82f6;
        }
        .output-box .language-header {
            border-color: #ef4444;
        }
        .flag {
            width: 30px;
            height: 30px;
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            font-size: 0.8rem;
            color: white;
        }
        .input-box .flag {
            background: #3b82f6;
        }
        .output-box .flag {
            background: #ef4444;
        }
        .language-title {
            font-size: 1rem;
            font-weight: 500;
            color: #f1f5f9;
        }
        .layout-info {
            font-size: 0.75rem;
            color: #94a3b8;
        }
        .layout-translator-textarea {
            width: 94%;
            flex: 1;
            min-height: 200px;
            padding: 12px;
            margin: 0 auto;
            background: #0f172a;
            border: 1px solid #334155;
            border-radius: 8px;
            color: #f8fafc;
            font-size: 14px;
            line-height: 1.5;
            resize: none;
            font-family: 'Consolas','Monaco',monospace;
            transition: border-color 0.2s;
            overflow: auto;
        }
        .layout-translator-textarea:focus {
            outline: none;
            border-color: #8b5cf6;
        }
        .input-box .layout-translator-textarea:focus {
            border-color: #3b82f6;
        }
        .output-box .layout-translator-textarea:focus {
            border-color: #ef4444;
        }
        #layoutOutputText {
            background: #1a2536;
            cursor: default;
        }
        .layout-translator-controls {
            display: flex;
            gap: 10px;
            padding: 15px;
            border-top: 1px solid #334155;
            justify-content: center;
            flex-wrap: wrap;
            background: #0f172a;
        }
        .layout-translator-btn {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 5px;
            min-width: 100px;
            justify-content: center;
        }
        .layout-translator-btn-primary {
            background: #8b5cf6;
            color: white;
        }
        .layout-translator-btn-primary:hover {
            background: #7c3aed;
        }
        .layout-translator-btn-secondary {
            background: #475569;
            color: #e2e8f0;
        }
        .layout-translator-btn-secondary:hover {
            background: #64748b;
        }
        .layout-translator-btn-paste {
            background: #10b981;
            color: white;
        }
        .layout-translator-btn-paste:hover {
            background: #059669;
        }
        .layout-translator-btn:active {
            transform: translateY(1px);
        }
        .layout-translator-minimize {
            background: none;
            border: none;
            color: #94a3b8;
            font-size: 1.5rem;
            cursor: pointer;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            margin-right: auto;
            order: -1;
        }
        .layout-translator-minimize:hover {
            background: rgba(59,130,246,0.1);
            color: #3b82f6;
        }
        .layout-translator-container.minimized {
            height: auto;
            min-height: auto;
            width: 60px !important;
            min-width: 60px !important;
            max-width: 60px !important;
            resize: none;
            top: 20px;
            left: 20px;
        }
        .layout-translator-container.minimized .translator-container,
        .layout-translator-container.minimized .layout-translator-controls,
        .layout-translator-container.minimized .resize-handle {
            display: none;
        }
        .resize-handle {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 15px;
            height: 15px;
            cursor: se-resize;
            background: linear-gradient(135deg,transparent 50%,#64748b 50%);
        }
        @media (max-width: 900px) {
            .translator-container {
                flex-direction: column;
            }
            .input-box {
                border-right: none;
                border-bottom: 2px solid #4a5568;
            }
            .layout-translator-container {
                width: 95vw;
                min-width: 300px;
                resize: none;
            }
        }
        @media (max-width: 600px) {
            .layout-translator-container {
                width: 98vw;
            }
            .layout-translator-btn {
                min-width: 80px;
                padding: 6px 12px;
                font-size: 0.8rem;
            }
        }
    `);

    class LayoutTranslator {
        constructor() {
            this.engToRus = {
                'q': 'й',
                'w': 'ц',
                'e': 'у',
                'r': 'к',
                't': 'е',
                'y': 'н',
                'u': 'г',
                'i': 'ш',
                'o': 'щ',
                'p': 'з',
                '[': 'х',
                ']': 'ъ',
                'a': 'ф',
                's': 'ы',
                'd': 'в',
                'f': 'а',
                'g': 'п',
                'h': 'р',
                'j': 'о',
                'k': 'л',
                'l': 'д',
                ';': 'ж',
                "'": 'э',
                'z': 'я',
                'x': 'ч',
                'c': 'с',
                'v': 'м',
                'b': 'и',
                'n': 'т',
                'm': 'ь',
                ',': 'б',
                '.': 'ю',
                '/': '.',
                '`': 'ё',
                'Q': 'Й',
                'W': 'Ц',
                'E': 'У',
                'R': 'К',
                'T': 'Е',
                'Y': 'Н',
                'U': 'Г',
                'I': 'Ш',
                'O': 'Щ',
                'P': 'З',
                '{': 'Х',
                '}': 'Ъ',
                'A': 'Ф',
                'S': 'Ы',
                'D': 'В',
                'F': 'А',
                'G': 'П',
                'H': 'Р',
                'J': 'О',
                'K': 'Л',
                'L': 'Д',
                ':': 'Ж',
                '"': 'Э',
                'Z': 'Я',
                'X': 'Ч',
                'C': 'С',
                'V': 'М',
                'B': 'И',
                'N': 'Т',
                'M': 'Ь',
                '<': 'Б',
                '>': 'Ю',
                '?': ',',
                '@': '"',
                '#': '№',
                '$': ';',
                '^': ':',
                '&': '?'
            };
            this.rusToEng = {};
            for (const [eng, rus] of Object.entries(this.engToRus)) {
                this.rusToEng[rus] = eng;
            }
        }
        detectLayout(text) {
            if (!text) return 'unknown';
            let engCount = 0;
            let rusCount = 0;
            for (let char of text) {
                if (this.engToRus[char] !== undefined) engCount++;
                if (this.rusToEng[char] !== undefined) rusCount++;
            }
            if (engCount > rusCount) return 'eng';
            if (rusCount > engCount) return 'rus';
            return 'mixed';
        }
        translate(text) {
            if (!text) return '';
            const layout = this.detectLayout(text);
            let result = '';
            for (let char of text) {
                if (layout === 'eng' && this.engToRus[char] !== undefined) {
                    result += this.engToRus[char];
                } else if (layout === 'rus' && this.rusToEng[char] !== undefined) {
                    result += this.rusToEng[char];
                } else {
                    if (this.engToRus[char] !== undefined) {
                        result += this.engToRus[char];
                    } else if (this.rusToEng[char] !== undefined) {
                        result += this.rusToEng[char];
                    } else {
                        result += char;
                    }
                }
            }
            return result;
        }
        swap(text) {
            if (!text) return '';
            let result = '';
            for (let char of text) {
                if (this.engToRus[char] !== undefined) {
                    result += this.engToRus[char];
                } else if (this.rusToEng[char] !== undefined) {
                    result += this.rusToEng[char];
                } else {
                    result += char;
                }
            }
            return result;
        }
    }

    class TranslatorUI {
        constructor() {
            this.translator = new LayoutTranslator();
            this.container = null;
            this.isDragging = false;
            this.dragOffset = { x: 0, y: 0 };
            this.isMinimized = true;
            this.isResizing = false;
            this.resizeStart = { x: 0, y: 0, width: 0, height: 0 };
            this.normalWidth = 800;
            this.init();
        }
        init() {
            this.createContainer();
            this.bindEvents();
        }
        createContainer() {
            this.container = document.createElement('div');
            this.container.className = 'layout-translator-container minimized';
            this.container.style.display = 'block';
            this.container.innerHTML = `
                <div class="layout-translator-header minimized-header">
                    <button class="layout-translator-minimize" title="Развернуть">+</button>
                </div>
                <div class="translator-container">
                    <div class="input-box">
                        <div class="language-header">
                            <div class="flag">ВОД</div>
                            <div>
                                <div class="language-title">Исходный текст</div>
                                <div class="layout-info">Введите текст в любой раскладке</div>
                            </div>
                        </div>
                        <textarea class="layout-translator-textarea" id="layoutInputText" placeholder="Введите текст или вставьте из буфера..." autofocus></textarea>
                    </div>
                    <div class="output-box">
                        <div class="language-header">
                            <div class="flag">ВЫД</div>
                            <div>
                                <div class="language-title">Результат перевода</div>
                                <div class="layout-info">Автоматический перевод раскладки</div>
                            </div>
                        </div>
                        <textarea class="layout-translator-textarea" id="layoutOutputText" placeholder="Здесь появится результат..." readonly></textarea>
                    </div>
                </div>
                <div class="layout-translator-controls">
                    <button class="layout-translator-btn layout-translator-btn-paste" id="layoutPasteBtn">📋 Вставить</button>
                    <button class="layout-translator-btn layout-translator-btn-primary" id="layoutSwapBtn">↔ Поменять</button>
                    <button class="layout-translator-btn layout-translator-btn-secondary" id="layoutClearBtn">× Очистить</button>
                </div>
                <div class="resize-handle"></div>
            `;
            document.body.appendChild(this.container);
            this.container.style.top = '20px';
            this.container.style.left = '20px';
            this.container.style.right = 'auto';
        }
        bindEvents() {
            const minimizeBtn = this.container.querySelector('.layout-translator-minimize');
            const pasteBtn = this.container.querySelector('#layoutPasteBtn');
            const swapBtn = this.container.querySelector('#layoutSwapBtn');
            const clearBtn = this.container.querySelector('#layoutClearBtn');
            const inputTextarea = this.container.querySelector('#layoutInputText');
            const header = this.container.querySelector('.layout-translator-header');
            const resizeHandle = this.container.querySelector('.resize-handle');

            minimizeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleMinimize();
            });
            pasteBtn.addEventListener('click', async() => await this.pasteFromClipboard());
            swapBtn.addEventListener('click', () => this.swapLayout());
            clearBtn.addEventListener('click', () => this.clearAll());
            inputTextarea.addEventListener('input', () => this.updateTranslation());

            header.addEventListener('mousedown', (e) => {
                if (e.target === header || e.target.tagName === 'H1') {
                    this.startDragging(e);
                }
            });
            resizeHandle.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.startResizing(e);
            });
            document.addEventListener('mousemove', (e) => {
                this.drag(e);
                this.resize(e);
            });
            document.addEventListener('mouseup', () => {
                this.stopDragging();
                this.stopResizing();
            });
        }
        startDragging(e) {
            this.isDragging = true;
            const rect = this.container.getBoundingClientRect();
            this.dragOffset.x = e.clientX - rect.left;
            this.dragOffset.y = e.clientY - rect.top;
            this.container.style.cursor = 'grabbing';
        }
        drag(e) {
            if (!this.isDragging) return;
            const x = e.clientX - this.dragOffset.x;
            const y = e.clientY - this.dragOffset.y;
            const maxX = window.innerWidth - this.container.offsetWidth;
            const maxY = window.innerHeight - this.container.offsetHeight;
            this.container.style.left = Math.max(0, Math.min(x, maxX)) + 'px';
            this.container.style.top = Math.max(0, Math.min(y, maxY)) + 'px';
            this.container.style.right = 'auto';
        }
        stopDragging() {
            this.isDragging = false;
            this.container.style.cursor = '';
        }
        startResizing(e) {
            this.isResizing = true;
            const rect = this.container.getBoundingClientRect();
            this.resizeStart.x = e.clientX;
            this.resizeStart.y = e.clientY;
            this.resizeStart.width = rect.width;
            this.resizeStart.height = rect.height;
            this.container.style.cursor = 'se-resize';
        }
        resize(e) {
            if (!this.isResizing || this.isMinimized) return;
            const deltaX = e.clientX - this.resizeStart.x;
            let newWidth = Math.max(600, Math.min(this.resizeStart.width + deltaX, window.innerWidth * 0.95));
            this.container.style.width = newWidth + 'px';
            this.container.style.height = 'auto';
            const maxLeft = window.innerWidth - newWidth;
            const currentLeft = parseInt(this.container.style.left) || 0;
            if (currentLeft > maxLeft) {
                this.container.style.left = Math.max(0, maxLeft) + 'px';
            }
        }
        stopResizing() {
            this.isResizing = false;
            this.container.style.cursor = '';
        }
        toggleMinimize() {
            const minimizeBtn = this.container.querySelector('.layout-translator-minimize');
            const header = this.container.querySelector('.layout-translator-header');
            if (this.isMinimized) {
                this.container.classList.remove('minimized');
                header.classList.remove('minimized-header');
                minimizeBtn.textContent = '−';
                minimizeBtn.title = 'Свернуть';
                this.container.style.width = this.normalWidth + 'px';
                this.container.style.minWidth = '600px';
                this.container.style.maxWidth = '95vw';
                if (!this.container.querySelector('h1')) {
                    const h1 = document.createElement('h1');
                    h1.textContent = '⌨️ Переводчик раскладки ENG ↔ RUS';
                    minimizeBtn.insertAdjacentElement('afterend', h1);
                }
                const inputTextarea = this.container.querySelector('#layoutInputText');
                setTimeout(() => inputTextarea.focus(), 100);
            } else {
                this.normalWidth = this.container.offsetWidth;
                this.container.classList.add('minimized');
                header.classList.add('minimized-header');
                minimizeBtn.textContent = '+';
                minimizeBtn.title = 'Развернуть';
                this.container.style.width = '60px';
                this.container.style.minWidth = '60px';
                this.container.style.maxWidth = '60px';
                const h1 = this.container.querySelector('h1');
                if (h1) h1.remove();
                this.clearAll();
            }
            this.isMinimized = !this.isMinimized;
        }
        async pasteFromClipboard() {
            try {
                const text = await navigator.clipboard.readText();
                if (text && text.trim()) {
                    const inputTextarea = this.container.querySelector('#layoutInputText');
                    inputTextarea.value = text;
                    this.updateTranslation();
                }
            } catch (err) {
                try {
                    const tempTextarea = document.createElement('textarea');
                    tempTextarea.style.position = 'fixed';
                    tempTextarea.style.opacity = '0';
                    document.body.appendChild(tempTextarea);
                    tempTextarea.focus();
                    if (document.execCommand('paste')) {
                        const text = tempTextarea.value;
                        if (text && text.trim()) {
                            const inputTextarea = this.container.querySelector('#layoutInputText');
                            inputTextarea.value = text;
                            this.updateTranslation();
                        }
                    }
                    document.body.removeChild(tempTextarea);
                } catch (err2) {}
            }
        }
        swapLayout() {
            const outputTextarea = this.container.querySelector('#layoutOutputText');
            const currentOutput = outputTextarea.value;
            if (currentOutput) {
                const inputTextarea = this.container.querySelector('#layoutInputText');
                inputTextarea.value = currentOutput;
                this.updateTranslation();
            }
        }
        clearAll() {
            const inputTextarea = this.container.querySelector('#layoutInputText');
            const outputTextarea = this.container.querySelector('#layoutOutputText');
            if (inputTextarea) inputTextarea.value = '';
            if (outputTextarea) outputTextarea.value = '';
            if (inputTextarea && !this.isMinimized) inputTextarea.focus();
        }
        updateTranslation() {
            const inputTextarea = this.container.querySelector('#layoutInputText');
            const outputTextarea = this.container.querySelector('#layoutOutputText');
            const text = inputTextarea.value;
            outputTextarea.value = this.translator.translate(text);
        }
    }

    window.addEventListener('load', () => {
        setTimeout(() => {
            new TranslatorUI();
        }, 1000);
    });
})();