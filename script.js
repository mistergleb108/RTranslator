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

const translator = new LayoutTranslator();
const inputTextarea = document.getElementById('inputText');
const outputTextarea = document.getElementById('outputText');
const quickPasteBtn = document.getElementById('quickPasteBtn');
const quickSwapBtn = document.getElementById('quickSwapBtn');
const quickClearBtn = document.getElementById('quickClearBtn');
const downloadScriptBtn = document.getElementById('downloadScriptBtn');
const pasteNotification = document.getElementById('pasteNotification');

function updateTranslation() {
    const text = inputTextarea.value;
    outputTextarea.value = translator.translate(text);
}

async function pasteFromClipboard() {
    try {
        const text = await navigator.clipboard.readText();

        if (text.trim()) {
            inputTextarea.value = text;
            updateTranslation();
            showNotification('Текст вставлен');
        }
    } catch (err) {
        console.error('Ошибка при чтении буфера обмена:', err);
        showNotification('Не удалось получить доступ к буферу обмена');
    }
}

function swapLayout() {
    const currentOutput = outputTextarea.value;
    if (currentOutput) {
        inputTextarea.value = currentOutput;
        updateTranslation();
        showNotification('Раскладка поменяна');
    }
}

function clearAll() {
    inputTextarea.value = '';
    outputTextarea.value = '';
    inputTextarea.focus();
    showNotification('Все поля очищены');
}

function downloadTampermonkeyScript() {
    const link = document.createElement('a');
    link.href = 'Переводчик раскладки.user.js';
    link.download = 'Переводчик раскладки.user.js';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('Скрипт скачивается...');
}

function showNotification(message) {
    pasteNotification.textContent = message;
    pasteNotification.style.display = 'block';

    setTimeout(() => {
        pasteNotification.style.display = 'none';
    }, 1500);
}

inputTextarea.addEventListener('input', updateTranslation);

quickPasteBtn.addEventListener('click', pasteFromClipboard);
quickSwapBtn.addEventListener('click', swapLayout);
quickClearBtn.addEventListener('click', clearAll);

downloadScriptBtn.addEventListener('click', downloadTampermonkeyScript);

document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'v' && document.activeElement !== inputTextarea) {
        e.preventDefault();
        pasteFromClipboard();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    updateTranslation();
});