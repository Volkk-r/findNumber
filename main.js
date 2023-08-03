class GameField {
    constructor() {
        this.round = 1;
        this.bonus = 1;
        this.score = 0;
        this.timer = null;
        this.correctAnswers = 0;
        this.totalRounds = 0;
        this.generateNewGame();
        this.startNumberElement = document.querySelector(".start-number");
        this.gameFieldElement = document.querySelector(".game-field");
        this.gameMoveElement = document.querySelector(".game-move");
        this.timeElement = document.querySelector(".time-number");
        this.pointsElement = document.querySelector(".points-number");
        this.bonusCounts = document.querySelectorAll(".bonus-count");
        this.timeLimit = 60;
        this.updateTimer();
        this.updateGameField();
    }

    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
    }


    updateTimer() {
        if (this.timeElement) {
            this.timeElement.textContent = this.formatTime(this.timeLimit);
            if (this.timeLimit <= 0) {
                clearInterval(this.timerInterval);
                this.round = 1;
            }
        }
    }

    generateRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomArray(length, minNumber, maxNumber) {
        const randomArray = new Set();
        while (randomArray.size < length) {
            const randomNumber = this.generateRandomNumber(minNumber, maxNumber);
            randomArray.add(randomNumber);
        }
        return Array.from(randomArray);
    }

    getRandomNumberFromArray(numbersArray) {
        const randomIndex = Math.floor(Math.random() * numbersArray.length);
        return numbersArray[randomIndex];
    }

    getRandomColor() {
        const colors = ['#4db8ec', '#f28e37', '#8e3dcb', '#94c94d', '#fc73b0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    getRandomClass() {
        const classes = ["scaling", "fading", "rotating"];
        return classes[Math.floor(Math.random() * classes.length)];
    }

    getArrayLengthForRound(round) {
        switch (round) {
            case 1:
            case 2:
            case 3:
                return 6;
            case 4:
            case 5:
                return 12;
            case 6:
            case 7:
                return 16;
            default:
                return 25;
        }
    }

    getNumberRangeForRound(round) {
        switch (round) {
            case 1:
                return { min: 1, max: 10 };
            case 2:
                return { min: 10, max: 100 };
            case 3:
                return { min: 100, max: 1000 };
            case 4:
                return { min: 100, max: 1000 };
            case 5:
                return { min: 1000, max: 10000 };
            case 6:
                return { min: 100, max: 1000 };
            case 7:
                return { min: 1000, max: 10000 };
            default:
                return { min: 1000, max: 10000 };
        }
    }

    getFontSizeForRound(round) {
        switch (round) {
            case 1:
            case 2:
            case 3:
            case 4:
                return "30px";
            case 5:
            case 6:
                return "24px";
            default:
                return "18px";
        }
    }
    getLineHeightForRound(round) {
        switch (round) {
            case 1:
            case 2:
            case 3:
                return "80px";
            case 4:
            case 5:
                return "60px";
            case 6:
            case 7:
                return "50px";
            default:
                return "40px";
        }
    }
    generateNewGame() {
        this.arrayLength = this.getArrayLengthForRound(this.round);
        const numberRange = this.getNumberRangeForRound(this.round);
        this.numbersArray = this.generateRandomArray(this.arrayLength, numberRange.min, numberRange.max);
        this.startNumber = this.getRandomNumberFromArray(this.numbersArray);
    }

    updateGameField() {
        this.startNumberElement.textContent = this.startNumber;
        if (this.round > 1) {
            this.gameFieldElement.innerHTML = "";
            this.gameMoveElement.classList.add("center");
        }

        const levelNumberElement = document.querySelector(".level-number");
        if (levelNumberElement) {
            levelNumberElement.textContent = this.round;
        }

        switch (this.round) {
            case 1:
            case 2:
            case 3:
                this.gameFieldElement.style.gridTemplateColumns = "repeat(3, 1fr)";
                this.gameFieldElement.style.gap = "20px";
                break;
            case 4:
            case 5:
                this.gameFieldElement.style.gridTemplateColumns = "repeat(4, 1fr)";
                this.gameFieldElement.style.gap = "20px";
                break;
            case 6:
            case 7:
                this.gameFieldElement.style.gridTemplateColumns = "repeat(4, 1fr)";
                this.gameFieldElement.style.gap = "10px";
                break;
            default:
                this.gameFieldElement.style.gridTemplateColumns = "repeat(5, 1fr)";
                this.gameFieldElement.style.gap = "10px";
        }

        // Изменение цвета фона .game при переходе на новый раунд
        const gameElement = document.querySelector(".game");
        if (gameElement) {
            gameElement.style.backgroundColor = this.getRandomColor();
        }

        // Обновление числовых элементов и классов для каждого блока
        this.numbersArray.forEach((number, index) => {
            const gameBlock = document.createElement("div");
            gameBlock.classList.add("game-block");
            gameBlock.style.backgroundColor = this.getRandomColor(); // Применяем случайный фон к каждому блоку

            const numberElement = document.createElement("span");
            numberElement.classList.add('numbers')
            numberElement.textContent = number;
            numberElement.style.fontSize = this.getFontSizeForRound(this.round);
            numberElement.style.lineHeight = this.getLineHeightForRound(this.round);
            gameBlock.appendChild(numberElement); // Добавляем числовой элемент внутрь блока

            if (this.round > 2) {
                const randomClass = this.getRandomClass();
                if (randomClass === 'rotating') {
                    numberElement.classList.add(randomClass); // Добавляем класс rotating к числовому элементу (если раунд > 2 и класс rotating)
                } else {
                    gameBlock.classList.add(randomClass); // Добавляем остальные случайные классы к блоку (если раунд > 2 и класс не rotating)
                }
            }

            gameBlock.addEventListener("click", () => {
                setTimeout(() => {
                    if (number === this.startNumber) {
                        this.score += 42 * this.bonus; // Правильный ответ - добавляем очки с учетом бонуса
                        this.bonus = Math.min(5, this.bonus + 1); // Увеличиваем бонус (максимум 5)
                        this.round++;
                        this.correctAnswers++;
                        this.generateNewGame();
                        this.updateGameField();
                    } else {
                        this.bonus--;
                        if (this.round == 1) {
                            this.generateNewGame();
                        } else {
                            this.round--;
                            this.generateNewGame();
                        }
                        this.updateGameField();
                    }
                    this.updatePoints();
                    this.totalRounds++;
                    this.checkGameOver();
                }, 500);
                this.gameMoveElement.classList.remove("center");
            });
            this.gameFieldElement.appendChild(gameBlock);
        });
        this.updateBonusCounts();
    }

    checkGameOver() {
        if (this.timeLimit <= 0) {
            // Останавливаем таймер и игру
            clearInterval(this.timer);
            const gameElement = document.querySelector(".game");
            gameElement.style.display = "none";

            // Отображаем модальное окно с результатами
            const resultModal = document.getElementById("resultModal");
            resultModal.style.display = "block";

            // Выводим результаты в модальном окне
            const correctAnswersElement = document.getElementById("correctAnswers");
            correctAnswersElement.textContent = this.correctAnswers;
            const totalRoundsElement = document.getElementById("totalRounds");
            totalRoundsElement.textContent = this.totalRounds;
            const scoreResultElement = document.getElementById("scoreResult");
            scoreResultElement.textContent = this.score;

            // Вычисляем точность правильных ответов в процентах
            const accuracyResultElement = document.getElementById("accuracyResult");
            const accuracy = (this.correctAnswers / this.totalRounds) * 100;
            accuracyResultElement.textContent = accuracy.toFixed(2) + "%";
        }
    }
    updatePoints() {
        if (this.pointsElement) {
            this.pointsElement.textContent = this.score;
        }
    }

    updateBonusCounts() {
        this.bonusCounts.forEach((count, index) => {
            count.classList.toggle("active", index < this.bonus);
        });

        const bonusNumberElement = document.querySelector(".bonus-number");
        if (bonusNumberElement) {
            bonusNumberElement.textContent = `x${this.bonus}`;
        }
    }

    startGame() {
        const previewElement = document.querySelector(".preview");
        const countdownElement = document.querySelector(".countdown");
        const gameElement = document.querySelector(".game");

        if (previewElement) {
            previewElement.style.display = "none";
        }

        if (countdownElement) {
            countdownElement.style.display = "none";
        }

        if (gameElement) {
            gameElement.style.display = "block";
            setTimeout(() => {
                this.gameMoveElement.classList.add("center");
            }, 100);
        }

        this.updateTimer();
        this.timer = setInterval(() => {
            this.timeLimit -= 1;
            this.updateTimer();
            if (this.timeLimit <= 0) {
                clearInterval(this.timer);
            }
            this.checkGameOver();
        }, 1000);
    }
}

function startCountdown(callback, count) {
    const previewElement = document.querySelector(".preview");
    const countdownElement = document.querySelector(".countdown");
    const countdown = document.querySelector(".timer");

    if (previewElement) {
        previewElement.style.display = "none";
    }

    if (!countdownElement) return;

    let currentCount = count;
    countdown.textContent = currentCount;
    countdownElement.style.display = "flex";

    const countdownInterval = setInterval(() => {
        currentCount--;
        countdown.textContent = currentCount;
        if (currentCount <= 0) {
            clearInterval(countdownInterval);
            countdownElement.style.display = "none";
            callback();
        }
    }, 1000);
}

const gameField = new GameField();
const previewElement = document.querySelector(".preview");
if (previewElement) {
    previewElement.addEventListener("click", () => {
        startCountdown(() => {
            gameField.startGame();
        }, 3);
    });
}
