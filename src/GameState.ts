export interface GameState {
    round: number;
    bonus: number;
    score: number;
    correctAnswers: number;
    totalRounds: number;
    timeLimit: number;
}

export const createInitialGameState = (): GameState => ({
    round: 1,
    bonus: 1,
    score: 0,
    correctAnswers: 0,
    totalRounds: 0,
    timeLimit: 60,
});