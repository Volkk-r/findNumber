import {
    formatTime,
    generateRandomArray,
    getRandomFromArray,
    COLORS,
    CLASSES,
} from "./utils";
import { GameState, createInitialGameState } from "./GameState";
import { GameRenderer } from "./GameRenderer";

class GameField {
    private state: GameState = createInitialGameState();
    private timer: ReturnType<typeof setInterval> | null = null;
    private renderer = new GameRenderer();
    private arrayLength!: number;
    private numbersArray!: number[];
    private startNumber!: number;

    constructor() {
        this.generateNewGame();
        this.updateTimer();
        this.updateGameField();
    }

    private updateTimer(): void {
        this.renderer.setTime(formatTime(this.state.timeLimit));
        if (this.state.timeLimit <= 0 && this.timer) {
            clearInterval(this.timer);
        }
    }

    private getArrayLengthForRound(round: number): number {
        if (round <= 3) return 6;
        if (round <= 5) return 12;
        if (round <= 7) return 16;
        return 25;
    }

    private getNumberRangeForRound(round: number): { min: number; max: number } {
        if (round === 1) return { min: 1, max: 10 };
        if (round === 2) return { min: 10, max: 100 };
        if (round === 3) return { min: 100, max: 1000 };
        if (round === 4) return { min: 100, max: 1000 };
        if (round === 5) return { min: 1000, max: 10000 };
        if (round === 6) return { min: 100, max: 1000 };
        return { min: 1000, max: 10000 };
    }

    private generateNewGame(): void {
        this.arrayLength = this.getArrayLengthForRound(this.state.round);
        const { min, max } = this.getNumberRangeForRound(this.state.round);
        this.numbersArray = generateRandomArray(this.arrayLength, min, max);
        this.startNumber = getRandomFromArray(this.numbersArray);
    }

    private updateGameField(): void {
        this.renderer.setStartNumber(this.startNumber);
        if (this.state.round > 1) {
            this.renderer.clearField();
            this.renderer.setMoveCenter();
        }

        const levelNumberElement = document.querySelector<HTMLElement>(".level-number");
        if (levelNumberElement) {
            levelNumberElement.textContent = String(this.state.round);
        }

        // Стилизация поля в зависимости от раунда
        if (this.state.round <= 3) {
            this.renderer.applyFieldStyle(3, "20px");
        } else if (this.state.round <= 5) {
            this.renderer.applyFieldStyle(4, "20px");
        } else if (this.state.round <= 7) {
            this.renderer.applyFieldStyle(4, "10px");
        } else {
            this.renderer.applyFieldStyle(5, "10px");
        }

        // Фон для .game
        const gameElement = document.querySelector<HTMLElement>(".game");
        if (gameElement) {
            gameElement.style.backgroundColor = getRandomFromArray(COLORS);
        }

        this.numbersArray.forEach((number) => {
            const gameBlock = document.createElement("div");
            gameBlock.classList.add("game-block");
            gameBlock.style.backgroundColor = getRandomFromArray(COLORS);

            const numberElement = document.createElement("span");
            numberElement.classList.add("numbers");
            numberElement.textContent = number.toString();

            numberElement.style.fontSize = this.getFontSizeForRound(this.state.round);
            numberElement.style.lineHeight = this.getLineHeightForRound(this.state.round);
            gameBlock.appendChild(numberElement);

            if (this.state.round > 2) {
                const randomClass = getRandomFromArray(CLASSES);
                if (randomClass === "rotating") {
                    numberElement.classList.add(randomClass);
                } else {
                    gameBlock.classList.add(randomClass);
                }
            }

            gameBlock.addEventListener("click", () => {
                setTimeout(() => {
                    if (number === this.startNumber) {
                        this.state.score += 42 * this.state.bonus;
                        this.state.bonus = Math.min(5, this.state.bonus + 1);
                        this.state.round++;
                        this.state.correctAnswers++;
                    } else {
                        this.state.bonus = Math.max(1, this.state.bonus - 1);

                        if (this.state.round > 1) {
                            this.state.round--;
                        }
                    }

                    this.generateNewGame();
                    this.updateGameField();
                    this.renderer.setPoints(this.state.score);
                    this.renderer.setBonus(this.state.bonus);
                    this.state.totalRounds++;
                    this.renderer.removeMoveCenter();
                }, 500);
            });

            this.renderer.appendBlock(gameBlock);
        });

        this.renderer.setPoints(this.state.score);
        this.renderer.setBonus(this.state.bonus);
    }

    private getFontSizeForRound(round: number): string {
        if (round <= 4) return "30px";
        if (round <= 6) return "24px";
        return "18px";
    }

    private getLineHeightForRound(round: number): string {
        if (round <= 3) return "80px";
        if (round <= 5) return "60px";
        if (round <= 7) return "50px";
        return "40px";
    }
    public startGame(): void {
        const preview = document.querySelector<HTMLElement>(".preview");
        const game = document.querySelector<HTMLElement>(".game");

        if (preview) preview.style.display = "none";
        if (game) game.style.display = "block";

        this.renderer = new GameRenderer(); // <-- создаём после появления DOM
        this.updateGameField();
        this.updateTimer();

        this.timer = setInterval(() => {
            this.state.timeLimit--;
            this.updateTimer();
            if (this.state.timeLimit <= 0 && this.timer) {
                clearInterval(this.timer);
                this.checkGameOver();
            }
        }, 1000);
    }

    private checkGameOver(): void {
        const gameElement = document.querySelector<HTMLElement>(".game");
        const resultModal = document.getElementById("resultModal");
        const correctAnswersElement = document.getElementById("correctAnswers");
        const totalRoundsElement = document.getElementById("totalRounds");
        const scoreResultElement = document.getElementById("scoreResult");
        const accuracyResultElement = document.getElementById("accuracyResult");

        if (!gameElement || !resultModal) return;

        gameElement.style.display = "none";
        resultModal.style.display = "block";

        correctAnswersElement!.textContent = String(this.state.correctAnswers);
        totalRoundsElement!.textContent = String(this.state.totalRounds);
        scoreResultElement!.textContent = String(this.state.score);

        const accuracy = this.state.totalRounds > 0
            ? (this.state.correctAnswers / this.state.totalRounds) * 100
            : 0;

        accuracyResultElement!.textContent = accuracy.toFixed(2) + "%";
    }

}

export default GameField;
