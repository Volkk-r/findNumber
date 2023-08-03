class GameField {
    constructor() {
        // Конструктор класса GameField
        // Инициализирует начальные значения и элементы игрового поля
        this.round = 1; // Текущий раунд игры
        this.bonus = 1; // Бонусные очки, увеличиваются при правильных ответах
        this.score = 0; // Общее количество набранных очков
        this.timer = null; // Идентификатор таймера
        this.correctAnswers = 0; // Количество правильных ответов
        this.totalRounds = 0; // Общее количество раундов
        this.generateNewGame(); // Генерация новой игры согласно текущему раунду
        this.startNumberElement = document.querySelector(".start-number"); // Элемент для отображения стартового числа
        this.gameFieldElement = document.querySelector(".game-field"); // Элемент игрового поля
        this.gameMoveElement = document.querySelector(".game-move"); // Элемент игрового хода
        this.timeElement = document.querySelector(".time-number"); // Элемент для отображения времени
        this.pointsElement = document.querySelector(".points-number"); // Элемент для отображения набранных очков
        this.bonusCounts = document.querySelectorAll(".bonus-count"); // Элементы для отображения бонусных очков
        this.timeLimit = 60; // Время ограничения на раунд в секундах
        this.updateTimer(); // Обновление таймера для отображения времени
        this.updateGameField(); // Обновление игрового поля после генерации новой игры
    }

    formatTime(seconds) {
        // Форматирует время из секунд в формат 'мм:сс'
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedMinutes = String(minutes).padStart(2, "0");
        const formattedSeconds = String(remainingSeconds).padStart(2, "0");
        return `${formattedMinutes}:${formattedSeconds}`;
    }

    updateTimer() {
        // Обновляет таймер на игровом поле
        if (this.timeElement) {
            this.timeElement.textContent = this.formatTime(this.timeLimit);
            if (this.timeLimit <= 0) {
                clearInterval(this.timerInterval);
                this.round = 1; // Сброс текущего раунда при окончании времени
            }
        }
    }

    generateRandomNumber(min, max) {
        // Генерирует случайное целое число в заданном диапазоне [min, max]
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateRandomArray(length, minNumber, maxNumber) {
        // Генерирует массив случайных уникальных чисел заданной длины в заданном диапазоне
        const randomArray = new Set();
        while (randomArray.size < length) {
            const randomNumber = this.generateRandomNumber(minNumber, maxNumber);
            randomArray.add(randomNumber);
        }
        return Array.from(randomArray);
    }

    getRandomNumberFromArray(numbersArray) {
        // Возвращает случайное число из заданного массива чисел
        const randomIndex = Math.floor(Math.random() * numbersArray.length);
        return numbersArray[randomIndex];
    }

    getRandomColor() {
        // Возвращает случайный цвет из предопределенного массива цветов
        const colors = ['#4db8ec', '#f28e37', '#8e3dcb', '#94c94d', '#fc73b0'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    getRandomClass() {
        // Возвращает случайный класс из предопределенного массива классов
        const classes = ["scaling", "fading", "rotating"];
        return classes[Math.floor(Math.random() * classes.length)];
    }

    getArrayLengthForRound(round) {
        // Возвращает длину массива чисел для заданного раунда
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
        // Возвращает диапазон чисел для заданного раунда
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
        // Возвращает размер шрифта для чисел в зависимости от раунда
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
        // Возвращает высоту строки для чисел в зависимости от раунда
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
        // Генерирует новую игру: массив чисел, длина массива и начальное число для нового раунда
        this.arrayLength = this.getArrayLengthForRound(this.round);
        const numberRange = this.getNumberRangeForRound(this.round);
        this.numbersArray = this.generateRandomArray(this.arrayLength, numberRange.min, numberRange.max);
        this.startNumber = this.getRandomNumberFromArray(this.numbersArray);
    }

    updateGameField() {
        // Обновляет игровое поле с учетом текущего раунда и сгенерированных чисел
        this.startNumberElement.textContent = this.startNumber;
        if (this.round > 1) {
            this.gameFieldElement.innerHTML = "";
            this.gameMoveElement.classList.add("center");
        }

        const levelNumberElement = document.querySelector(".level-number");
        if (levelNumberElement) {
            levelNumberElement.textContent = this.round;
        }

        // Задаем разметку и отступы в зависимости от текущего раунда
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

            // Обработчик события клика по блоку числа
            gameBlock.addEventListener("click", () => {
                setTimeout(() => {
                    if (number === this.startNumber) {
                        // Правильный ответ - добавляем очки с учетом бонуса
                        this.score += 42 * this.bonus;
                        this.bonus = Math.min(5, this.bonus + 1); // Увеличиваем бонус (максимум 5)
                        this.round++; // Переходим на следующий раунд
                        this.correctAnswers++; // Увеличиваем количество правильных ответов
                        this.generateNewGame(); // Генерируем новую игру для следующего раунда
                        this.updateGameField(); // Обновляем игровое поле
                    } else {
                        this.bonus--; // Уменьшаем бонус за неправильный ответ
                        if (this.round == 1) {
                            this.generateNewGame(); // Генерируем новую игру снова, если раунд был первым
                        } else {
                            this.round--; // Возвращаемся на предыдущий раунд
                            this.generateNewGame(); // Генерируем новую игру для предыдущего раунда
                        }
                        this.updateGameField(); // Обновляем игровое поле
                    }
                    this.updatePoints(); // Обновляем отображение набранных очков
                    this.totalRounds++; // Увеличиваем общее количество раундов
                    this.checkGameOver(); // Проверяем, завершена ли игра
                }, 500); // Задержка после клика, чтобы показать результат перед обновлением
                this.gameMoveElement.classList.remove("center"); // Удаляем класс "center" у элемента игрового хода
            });
            this.gameFieldElement.appendChild(gameBlock); // Добавляем блок числа на игровое поле
        });
        this.updateBonusCounts(); // Обновляем отображение бонусных очков
    }

    checkGameOver() {
        // Проверяет, завершена ли игра, и выводит результаты
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
        // Обновляет отображение набранных очков
        if (this.pointsElement) {
            this.pointsElement.textContent = this.score;
        }
    }

    updateBonusCounts() {
        // Обновляет отображение бонусных очков
        this.bonusCounts.forEach((count, index) => {
            count.classList.toggle("active", index < this.bonus);
        });

        const bonusNumberElement = document.querySelector(".bonus-number");
        if (bonusNumberElement) {
            bonusNumberElement.textContent = `x${this.bonus}`;
        }
    }

    startGame() {
        // Начинает игру
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
                this.gameMoveElement.classList.add("center"); // Показываем ход с задержкой для игрового ощущения
            }, 100);
        }

        this.updateTimer(); // Обновляем таймер
        this.timer = setInterval(() => {
            this.timeLimit -= 1; // Уменьшаем оставшееся время на 1 секунду
            this.updateTimer(); // Обновляем таймер
            if (this.timeLimit <= 0) {
                clearInterval(this.timer); // Останавливаем таймер при окончании времени
            }
            this.checkGameOver(); // Проверяем, завершена ли игра
        }, 1000); // Обновляем таймер каждую секунду
    }
}

function startCountdown(callback, count) {
    // Запускает обратный отсчет перед началом игры
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
            callback(); // Запускаем функцию обратного вызова после завершения обратного отсчета
        }
    }, 1000); // Обновляем отсчет каждую секунду
}

const gameField = new GameField(); // Создаем экземпляр класса GameField
const previewElement = document.querySelector(".preview");
if (previewElement) {
    previewElement.addEventListener("click", () => {
        startCountdown(() => {
            gameField.startGame(); // Запускаем обратный отсчет и начинаем игру после него
        }, 3); // Обратный отсчет в три секунды
    });
}
