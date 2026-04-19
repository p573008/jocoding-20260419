class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    static get observedAttributes() {
        return ['number'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'number') {
            this.render();
        }
    }

    get color() {
        const number = parseInt(this.getAttribute('number'), 10);
        if (number <= 10) return '#fbc400'; // Yellow
        if (number <= 20) return '#69c8f2'; // Blue
        if (number <= 30) return '#ff7272'; // Red
        if (number <= 40) return '#aaa'; // Gray
        return '#b0d840'; // Green
    }

    render() {
        const number = this.getAttribute('number') || '';
        this.shadowRoot.innerHTML = `
            <style>
                .ball {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    background-color: ${this.color};
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.2);
                }
            </style>
            <div class="ball">${number}</div>
        `;
    }
}

customElements.define('lotto-ball', LottoBall);

const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Theme Logic
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    body.classList.add(currentTheme);
    if (currentTheme === 'dark-mode') {
        themeToggle.textContent = '🌙';
    }
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    let theme = 'light-mode';
    if (body.classList.contains('dark-mode')) {
        theme = 'dark-mode';
        themeToggle.textContent = '🌙';
    } else {
        themeToggle.textContent = '🌞';
    }
    localStorage.setItem('theme', theme);
});

function generateNumbers() {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach(number => {
        const lottoBall = document.createElement('lotto-ball');
        lottoBall.setAttribute('number', number);
        lottoNumbersContainer.appendChild(lottoBall);
    });
}

generateBtn.addEventListener('click', generateNumbers);

// Initial generation
generateNumbers();
