//yea this part idont even know whats happening maybe some God
// could explain it jumbles words for what i beleive is right

const letters = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя0123456789";
const textElement = document.querySelector(".scramble-text");

const lines = textElement.innerHTML.split("<br>").map(line => line.trim());
textElement.innerHTML = lines.map(line => `<span class="scramble-line">${line}</span>`).join("<br>");
const lineElements = document.querySelectorAll(".scramble-line");

const maxLength = Math.max(...Array.from(lineElements).map(el => el.textContent.length));

function scrambleLine(el, original, totalSteps) {
    return new Promise((resolve) => {
        clearInterval(el.scrambleInterval);
        let iterations = 0;
        const speed = 100;
        el.scrambleInterval = setInterval(() => {
            const progress = iterations / totalSteps;
            const revealCount = Math.floor(progress * original.length);
            el.textContent = original
                .split("")
                .map((char, i) =>
                    i < revealCount ? original[i] : letters[Math.floor(Math.random() * letters.length)]
                )
                .join("");

            if (iterations >= totalSteps) {
                clearInterval(el.scrambleInterval);
                el.textContent = original;
                resolve();
            }
            iterations++;
        }, speed);
    });
}


function scrambleAll() {
    const totalSteps = maxLength * 2; 
    lineElements.forEach(el => {
        const original = el.dataset.original || el.textContent;
        el.dataset.original = original;
        scrambleLine(el, original, totalSteps);
    });
}

textElement.addEventListener("mouseenter", scrambleAll);
textElement.addEventListener("click", scrambleAll);

