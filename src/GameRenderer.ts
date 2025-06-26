export class GameRenderer {
    startNumberElement = document.querySelector<HTMLSpanElement>(".start-number");
    gameFieldElement = document.querySelector<HTMLDivElement>(".game-field")!;
    gameMoveElement = document.querySelector<HTMLDivElement>(".game-move")!;
    timeElement = document.querySelector<HTMLDivElement>(".time-number");
    pointsElement = document.querySelector<HTMLDivElement>(".points-number");
    bonusCounts = document.querySelectorAll<HTMLElement>(".bonus-count");
    bonusNumberElement = document.querySelector<HTMLSpanElement>(".bonus-number");

    setTime(text: string): void {
        if (this.timeElement) this.timeElement.textContent = text;
    }

    setStartNumber(num: number): void {
        if (this.startNumberElement) this.startNumberElement.textContent = String(num);
    }

    setPoints(score: number): void {
        if (this.pointsElement) this.pointsElement.textContent = String(score);
    }

    setBonus(bonus: number): void {
        this.bonusCounts.forEach((count, i) => {
            count.classList.toggle("active", i < bonus);
        });
        if (this.bonusNumberElement) this.bonusNumberElement.textContent = `x${bonus}`;
    }

    clearField(): void {
        this.gameFieldElement.innerHTML = "";
    }

    applyFieldStyle(columns: number, gap: string): void {
        this.gameFieldElement.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        this.gameFieldElement.style.gap = gap;
    }

    appendBlock(block: HTMLElement): void {
        this.gameFieldElement.appendChild(block);
    }

    setMoveCenter(): void {
        this.gameMoveElement.classList.add("center");
    }

    removeMoveCenter(): void {
        this.gameMoveElement.classList.remove("center");
    }
}
