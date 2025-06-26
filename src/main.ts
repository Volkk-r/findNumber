import GameField from './GameField';

const gameField = new GameField();

function startCountdown(callback: () => void, count: number) {
    const previewElement = document.querySelector(".preview") as HTMLElement | null;
    const countdownElement = document.querySelector(".countdown") as HTMLElement | null;
    const countdown = document.querySelector(".timer") as HTMLElement | null;

    if (previewElement) previewElement.style.display = "none";
    if (!countdownElement || !countdown) return;

    let currentCount = count;
    countdown.textContent = String(currentCount);
    countdownElement.style.display = "flex";

    const countdownInterval = setInterval(() => {
        currentCount--;
        countdown.textContent = String(currentCount);
        if (currentCount <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = "none";
            callback(); // ← ВАЖНО: запуск игры
        }
    }, 1000);
}

document.querySelector(".preview")?.addEventListener("click", () => {
    startCountdown(() => {
        gameField.startGame(); // ← Запуск раундов
    }, 3);
});
